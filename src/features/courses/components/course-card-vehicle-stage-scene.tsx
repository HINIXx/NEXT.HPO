/* eslint-disable @next/next/no-img-element -- ảnh xe/mâm là lớp đồ họa chồng nhau theo %, không cần next/image */
import type { CSSProperties } from "react";
import {
  vehiclePhotoConfigs,
  type VehiclePhotoKey,
} from "../data/course-vehicle-photo-configs";
import scene from "./courses-animated-scene.module.css";

type CssVars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Sân khấu xe chạy trong thẻ khóa học (V2 `courses-demo-stage-renderer.js` → `photoVehicle`):
 * trời + skyline trôi · mặt đường 3D chéo theo hướng xe · bóng gầm/lốp · thân xe nhún + mâm quay · lớp sáng.
 * Dựng sẵn lúc build (V2 dựng bằng JS lúc tải) → không cần JS, không nhảy bố cục. Trang trí → aria-hidden.
 */
export function CourseCardVehicleStageScene({
  vehicle,
}: {
  vehicle: VehiclePhotoKey;
}) {
  const config = vehiclePhotoConfigs[vehicle];
  const [rear, front] = config.tyres;
  // Bóng gầm: tâm giữa 2 điểm chạm, dài 1,5 × khoảng cách 2 bánh (theo % chiều rộng ảnh).
  const wheelSpan =
    Math.hypot(
      (front.x - rear.x) * config.width,
      (front.y - rear.y) * config.height,
    ) / config.width;

  return (
    <div
      className={scene.stage}
      style={{ "--road-yaw": `${config.roadYaw}deg` } as CssVars}
      aria-hidden="true"
    >
      <div className={scene.stageSky}>
        <div className={scene.stageSkyline} />
      </div>
      <div className={scene.road}>
        <div className={scene.roadPlane}>
          <div className={scene.roadYaw}>
            <div className={scene.roadSurface} />
            <div className={scene.roadStrip} />
          </div>
        </div>
      </div>
      <div
        className={scene.vehicle}
        style={
          {
            "--vehicle-ratio": `${config.width} / ${config.height}`,
            "--photo-spin": config.spin,
            "--photo-scale": config.scale,
          } as CssVars
        }
      >
        <span
          className={scene.vehicleShadow}
          style={
            {
              left: `${(rear.x + front.x) / 2}%`,
              top: `${(rear.y + front.y) / 2}%`,
              width: `${wheelSpan * 1.5}%`,
              "--shadow-rot": `${config.yaw}deg`,
            } as CssVars
          }
        />
        {config.tyres.map((tyre) => (
          <span
            key={`${tyre.x}-${tyre.y}`}
            className={scene.tyreShadow}
            style={{ left: `${tyre.x}%`, top: `${tyre.y}%` }}
          />
        ))}
        <div className={scene.vehicleBody}>
          <img
            className={scene.vehicleImage}
            src={config.body}
            alt=""
            decoding="async"
            loading="lazy"
          />
          <img
            className={`${scene.vehicleImage} ${scene.vehicleShine}`}
            src={config.body}
            alt=""
            decoding="async"
            loading="lazy"
          />
          {config.wheels.map((wheel) => (
            <span
              key={wheel.src}
              className={scene.rim}
              style={
                {
                  left: `${wheel.x}%`,
                  top: `${wheel.y}%`,
                  width: `${wheel.d}%`,
                  "--rim-matrix": `matrix(${wheel.matrix.join(",")},0,0)`,
                } as CssVars
              }
            >
              <img
                className={scene.rimSpin}
                src={wheel.src}
                alt=""
                decoding="async"
                loading="lazy"
              />
            </span>
          ))}
        </div>
      </div>
      <div className={scene.glare} />
    </div>
  );
}
