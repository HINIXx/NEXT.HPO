import * as THREE from 'three';

/**
 * Animated face drawn by one fragment shader on a UV-mapped patch (no textures, crisp at any size).
 * Every feature is driven by uniforms so expressions blend smoothly instead of swapping images.
 * Two looks: a black glowing LED screen (robots) or features "printed" straight on the body (transparent background).
 * Coordinates are character-local units measured from the patch centre.
 */
export interface FaceState {
  /** Eye closure for blinking, 0 open → 1 closed. */
  blinkL: number; blinkR: number;
  /** 0 = round glossy eye, 1 = happy "^" arc (also used for the wink). */
  arcL: number; arcR: number;
  /** Mouth opening 0 → 1, half-width multiplier and corner lift (−1 frown … 1 big smile). */
  mouthOpen: number; mouthWidth: number; mouthCurve: number; mouthShift: number;
  /** Pink blush strength. */
  cheek: number;
  /** Eyebrow lift per side. */
  browL: number; browR: number;
  /** Overall LED brightness (pulses a little when greeting). */
  glow: number;
}

export const FACE_DEFAULT: FaceState = {
  blinkL: 0, blinkR: 0, arcL: 0, arcR: 0,
  mouthOpen: .55, mouthWidth: 1, mouthCurve: .6, mouthShift: 0,
  cheek: .6, browL: 0, browR: 0, glow: 1,
};

/** Where the features sit and how the face looks. Defaults match the reference robot (screen .99 × .62 half size). */
export interface FaceLayout {
  halfWidth: number; halfHeight: number;
  eyeX?: number; eyeY?: number; eyeR?: number;
  browY?: number; mouthY?: number; mouthScale?: number;
  cheekX?: number; cheekY?: number;
  /** true = black LED screen; false = features printed on the body (transparent elsewhere). */
  screen?: boolean;
  /** LED colour for eye rims, brows and happy arcs (screen) — printed faces use `ink`. */
  led?: string;
  /** Glow colour for halos and the screen's inner edge. */
  glowColor?: string;
  /** Line colour for printed faces. */
  ink?: string;
  /** Iris colours: bright bottom, mid, dark top. */
  iris?: [string, string, string];
  /** LED-panel look (option C): thick glowing eye rings, glowing blue smile, yellow LED dash cheeks. */
  ledStyle?: boolean;
  /** Cheek colour in ledStyle (dashes). */
  cheekColor?: string;
}

const vec3 = (hex: string) => new THREE.Color(hex);

export function createFaceMaterial(layout: FaceLayout) {
  const L = {
    eyeX: .47, eyeY: -.06, eyeR: .255, browY: .39, mouthY: -.335, mouthScale: 1, cheekX: .68, cheekY: -.34,
    screen: true, led: '#8ce6ff', glowColor: '#0b6eff', ink: '#13205a', iris: ['#52bdff', '#0f5cf5', '#051a6b'] as [string, string, string], ledStyle: false, cheekColor: '#ffd23a',
    ...layout,
  };
  const uniforms = {
    halfSize: { value: new THREE.Vector2(L.halfWidth, L.halfHeight) },
    eyeLayout: { value: new THREE.Vector4(L.eyeX, L.eyeY, L.eyeR, L.browY) },
    lowerLayout: { value: new THREE.Vector4(L.mouthY, L.mouthScale, L.cheekX, L.cheekY) },
    screen: { value: L.screen ? 1 : 0 },
    ledStyle: { value: L.ledStyle ? 1 : 0 }, cheekColor: { value: vec3(L.cheekColor) },
    led: { value: vec3(L.led) }, glowColor: { value: vec3(L.glowColor) }, ink: { value: vec3(L.ink) },
    irisLight: { value: vec3(L.iris[0]) }, irisMid: { value: vec3(L.iris[1]) }, irisDark: { value: vec3(L.iris[2]) },
    gaze: { value: new THREE.Vector2() },
    eyes: { value: new THREE.Vector4() },      // blinkL, blinkR, arcL, arcR
    mouth: { value: new THREE.Vector4() },     // open, width, curve, shift
    extra: { value: new THREE.Vector4(0, 0, 0, 1) }, // cheek, browL, browR, glow
    time: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    toneMapped: false,
    transparent: !L.screen,
    depthWrite: L.screen,
    // Printed faces sit a hair above the body surface; offset avoids z-fighting at grazing angles.
    polygonOffset: !L.screen, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
    vertexShader: /* glsl */`
      varying vec2 faceUv;
      void main(){ faceUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: /* glsl */`
      varying vec2 faceUv;
      uniform vec2 halfSize, gaze;
      uniform vec4 eyeLayout, lowerLayout, eyes, mouth, extra;
      uniform float screen, time, ledStyle;
      uniform vec3 led, glowColor, ink, irisLight, irisMid, irisDark, cheekColor;

      float fill(float d){ float w=max(fwidth(d),.0015); return 1.0-smoothstep(-w,w,d); }
      // Arc with round caps (after Inigo Quilez): centred on +y, half-aperture sc=(sin,cos), radius ra, half-thickness rb.
      float sdArc(vec2 p, vec2 sc, float ra, float rb){
        p.x=abs(p.x);
        return ((sc.y*p.x>sc.x*p.y)?length(p-sc*ra):abs(length(p)-ra))-rb;
      }
      vec2 rot(vec2 p, float a){ float c=cos(a), s=sin(a); return vec2(c*p.x-s*p.y, s*p.x+c*p.y); }
      // Feature colour: glowing LED on a screen, ink when printed.
      vec3 lineColor(float glow){ return mix(ink, led*glow, screen); }

      // One glossy eye composited onto col/alpha. c is the eye centre, R the radius.
      void eye(inout vec3 col, inout float alpha, vec2 p, vec2 c, float R, float blink, float arc, float glow){
        vec2 q=p-c-gaze*R*vec2(.4,.34);
        // Round eye squashes vertically when blinking and while morphing into the arc.
        float squash=mix(1.0,.06,max(blink,arc*.95));
        float r=length(vec2(q.x,q.y/squash))/R;
        // Happy "^" arc (also the winking eye): round-capped, slightly above the eye centre.
        float arcD=sdArc(q+vec2(0.0,R*.42),vec2(.88,.47),R*.8,R*.1);
        // Thin glow around the eye and the arc (cheap "bloom"), screens only.
        float outside=max(0.0,r-1.0);
        float halo=exp(-outside*outside/mix(.012,.02,ledStyle))*mix(.32,.55,ledStyle)*(1.0-arc)*(1.0-blink*.8);
        float arcHalo=exp(-pow(max(0.0,arcD)/(R*.22),2.0))*.4*arc;
        col+=glowColor*(halo+arcHalo)*glow*screen;
        // Iris: dark top -> saturated mid -> light crescent at the bottom (lit from inside).
        vec2 iq=(q-gaze*R*vec2(.12,.1))/R;           // inner layer moves further: parallax depth
        vec2 ie=vec2(iq.x,iq.y/squash);
        float ir=length(ie);
        vec3 iris=mix(irisMid,irisDark,smoothstep(-.35,.7,ie.y));
        iris=mix(iris,irisLight,smoothstep(-.35,-.8,ie.y)*.85);
        iris+=irisMid*(1.0-smoothstep(0.0,.08,abs(ir-.66)))*.25;   // faint inner ring
        // Depth: fine radial fibres, a darker limbal edge and a lit bottom rim around the pupil.
        float ang=atan(ie.y,ie.x);
        iris*=1.0+.1*sin(ang*26.0+sin(ang*7.0)*1.5)*smoothstep(.46,.6,ir)*(1.0-smoothstep(.62,.7,ir));
        iris*=1.0-.4*smoothstep(.52,.7,ir);
        iris+=irisLight*.35*(1.0-smoothstep(0.0,.06,abs(ir-.53)))*(1.0-smoothstep(-.5,.1,ie.y));
        // Pupil: not flat black — deep navy well, darker towards the rim, faint glow low inside.
        vec3 pupil=mix(vec3(.02,.06,.2),vec3(.004,.01,.035),smoothstep(.0,.42,length(ie-vec2(.04,-.1))));
        iris=mix(iris,pupil,1.0-smoothstep(.43,.5,ir));
        iris=mix(iris,iris*.6,ledStyle);                                // LED panel: darker inside the glowing ring
        // Rim: bright LED ring on screens, dark ink outline when printed.
        float rim=smoothstep(mix(.82,.68,ledStyle),mix(.9,.76,ledStyle),r)*(1.0-smoothstep(.98,1.01,r));
        vec3 c3=mix(iris,mix(ink,mix(led,vec3(1.0),.3),screen),rim);
        // Reflections: big soft top-right, small bottom-left, tiny sparkle. Fixed to the eye, not the iris.
        vec2 h=q/R; h.y/=squash;
        float hl=fill(length(rot(h-vec2(.28,.32),.5)*vec2(1.0,1.25))-.2);
        float hs=fill(length(h-vec2(-.3,-.36))-.08);
        float ht=fill(length(h-vec2(.5,-.1))-.04);
        // Window reflection inside the pupil plus a soft curved sheen across the top of the eyeball.
        float hp=fill(length((h-vec2(-.13,.16))*vec2(1.0,1.4))-.07);
        float sheen=(1.0-smoothstep(.55,.95,length(h-vec2(-.05,-.35))))*smoothstep(.2,.75,h.y)*.18;
        c3+=vec3(.75,.88,1.0)*sheen*(1.0-max(blink,arc));
        float shine=max(hl,max(hs*.95,max(ht*.85,hp*.6)))*(1.0-max(blink,arc));
        c3=mix(c3,vec3(1.0),shine);
        float body=fill(r-1.0)*(1.0-arc);
        col=mix(col,c3*mix(1.0,glow,screen),body); alpha=max(alpha,body);
        // Closed lid line at the bottom of a blink keeps the eye readable.
        float lid=fill(abs(q.y)-R*.07)*fill(abs(q.x)-R*.95)*smoothstep(.75,1.0,blink)*(1.0-arc);
        col=mix(col,lineColor(glow),lid); alpha=max(alpha,lid);
        float a=fill(arcD)*arc;
        col=mix(col,mix(ink,mix(led,vec3(1.0),.3)*glow,screen),a); alpha=max(alpha,a);
      }

      void main(){
        vec2 p=(faceUv-.5)*2.0*halfSize;
        vec2 n=p/halfSize;
        float s=pow(abs(n.x),4.0)+pow(abs(n.y),4.0);  // matches the patch outline
        float glow=extra.w;
        float eyeX=eyeLayout.x, eyeY=eyeLayout.y, R=eyeLayout.z, browY=eyeLayout.w;
        float mouthY=lowerLayout.x, ms=lowerLayout.y;

        // Screen: near-black glass, faint navy centre, thin inner edge glow and a soft painted reflection.
        vec3 col=mix(vec3(.03,.05,.1),vec3(.008,.011,.022),smoothstep(.0,.85,length(n*vec2(.75,1.0))));
        col+=glowColor*smoothstep(.8,1.0,s)*.4*glow;
        col+=mix(glowColor,led,.6)*smoothstep(.965,1.0,s)*.35*glow;
        col+=vec3(.55,.7,.95)*.06*smoothstep(.5,.92,n.y)*(1.0-smoothstep(.55,.95,abs(n.x)));
        vec2 g=rot(n-vec2(-.72,.58),.75)*vec2(1.0,3.2);
        col+=vec3(.7,.82,1.0)*.07*exp(-dot(g,g)/.03);
        float alpha=screen;

        // Eyebrows: thin round-capped arcs, tilted slightly outwards.
        for(int i=0;i<2;i++){
          float sd=i==0?-1.0:1.0;
          float lift=i==0?extra.y:extra.z;
          vec2 bp=rot(p-vec2(sd*eyeX,browY+lift),sd*.1)/(R/.255);
          float bd=sdArc(bp+vec2(0.0,.3),vec2(.42,.91),.3,.016);
          col+=glowColor*exp(-pow(max(0.0,bd)/.03,2.0))*.25*glow*screen;
          float b=fill(bd);
          col=mix(col,lineColor(glow),b); alpha=max(alpha,b);
        }

        eye(col,alpha,p,vec2(-eyeX,eyeY),R,eyes.x,eyes.z,glow);
        eye(col,alpha,p,vec2(eyeX,eyeY),R,eyes.y,eyes.w,glow);

        // Cheeks: soft pink blush, or two short yellow LED dashes in ledStyle.
        for(int i=0;i<2;i++){
          float sd=i==0?-1.0:1.0;
          vec2 cp=p-vec2(sd*lowerLayout.z,lowerLayout.w);
          if(ledStyle>.5){
            for(int j=0;j<2;j++){
              vec2 d=rot(cp-vec2(sd*float(j)*.025,(float(j)-.5)*.065)*ms,sd*.18);
              float dd=length(vec2(max(abs(d.x)-.045*ms,0.0),d.y))-.013*ms;
              col+=cheekColor*exp(-pow(max(0.0,dd)/(.03*ms),2.0))*.3*glow;
              float b=fill(dd)*mix(.6,1.0,extra.x);
              col=mix(col,mix(cheekColor,vec3(1.0),.2)*glow,b); alpha=max(alpha,b);
            }
          } else {
            vec2 cq=cp/(vec2(.11,.06)*ms);
            float b=exp(-dot(cq,cq)*1.3)*extra.x*.8;
            col=mix(col,vec3(1.0,.45,.6),b); alpha=max(alpha,b);
          }
        }

        // Mouth: open "D" smile (top lifted at the corners, round bottom) or a smile line when nearly closed.
        float open=mouth.x, w=.115*mouth.y*ms, curve=mouth.z;
        vec2 m=p-vec2(mouth.w*ms,mouthY);
        float xn=clamp(m.x/w,-1.0,1.0);
        float top=(.018+curve*.035*xn*xn)*ms;
        float depth=mix(.012,.15,open)*ms;
        float bottom=top-depth*sqrt(max(0.0,1.0-xn*xn))-.004*ms;
        float mouthBox=max(abs(m.x)-w,max(m.y-top,bottom-m.y));
        col+=glowColor*exp(-pow(max(0.0,mouthBox)/(.035*ms),2.0))*.4*ledStyle*glow;
        float inside=fill(abs(m.x)-w)*fill(m.y-top)*fill(bottom-m.y);
        float t=clamp((top-m.y)/max(depth,.001),0.0,1.0);
        vec3 mc=mix(vec3(.62,.13,.28),vec3(1.0,.42,.52),smoothstep(.1,.75,t));
        float tongue=fill(length((m-vec2(0.0,top-depth*.82))/vec2(w*.62,depth*.42))-1.0)*step(.35,open);
        mc=mix(mc,vec3(1.0,.62,.70),tongue*.85);
        mc=mix(mc,vec3(1.0,.88,.9),fill(length((m-vec2(-w*.35,top-depth*.18))/vec2(w*.22,depth*.08))-1.0)*.35*step(.3,open));
        mc=mix(mc,mix(vec3(.8,.95,1.0),led,smoothstep(.2,1.0,t))*glow,ledStyle);  // glowing LED smile
        col=mix(col,mc,inside); alpha=max(alpha,inside);
        // Lip edge keeps the mouth readable: bright pink on a screen, ink outline when printed.
        float lip=fill(abs(m.y-top)-.007*ms)*fill(abs(m.x)-w*1.02)*(1.0-smoothstep(.0,.25,open)*.6*screen);
        col=mix(col,mix(ink,mix(vec3(1.0,.55,.65),vec3(.85,.96,1.0)*glow,ledStyle),screen),lip*.9); alpha=max(alpha,lip*.9);
        float outline=(1.0-screen)*fill(abs(max(max(abs(m.x)-w,m.y-top),bottom-m.y))-.006*ms)*step(.05,open);
        col=mix(col,ink,outline); alpha=max(alpha,outline);

        if(alpha<.01) discard;
        gl_FragColor=vec4(col,alpha);
        #include <colorspace_fragment>
      }`,
  });
  const apply = (state: FaceState, gaze: THREE.Vector2, time: number) => {
    uniforms.gaze.value.copy(gaze);
    uniforms.eyes.value.set(state.blinkL, state.blinkR, state.arcL, state.arcR);
    uniforms.mouth.value.set(state.mouthOpen, state.mouthWidth, state.mouthCurve, state.mouthShift);
    uniforms.extra.value.set(state.cheek, state.browL, state.browR, state.glow);
    uniforms.time.value = time;
  };
  return { material, uniforms, apply };
}
