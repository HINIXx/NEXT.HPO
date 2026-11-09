import Image from "next/image";
import type { CSSProperties } from "react";
import {
  admissionPhotoFanLayers,
  type AdmissionDocumentIllustration as Illustration,
} from "../data/admission-required-documents";
import styles from "./admission-document-illustrations.module.css";

/** Độ lệch pha nhấp nhô theo thứ tự thẻ (V2 `.admission-card:nth-child(8n+k)`). */
const floatTimings = [
  ["0s", "4s"],
  ["0.5s", "4.2s"],
  ["1s", "3.8s"],
  ["1.5s", "4.5s"],
  ["2s", "3.9s"],
  ["2.5s", "4.3s"],
  ["3s", "4.1s"],
] as const;

function HangUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="white"
      aria-hidden="true"
    >
      <path d="M12 9c-2.2 0-4.3.4-6.2 1.1-.5.2-.9.7-.9 1.2v2.7c0 .6.4 1.1 1 1.2 1.9.5 3.9.8 6.1.8 2.2 0 4.2-.3 6.1-.8.6-.1 1-.6 1-1.2v-2.7c0-.6-.4-1.1-.9-1.2C16.3 9.4 14.2 9 12 9z" />
    </svg>
  );
}

function AcceptCallIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="white"
      aria-hidden="true"
    >
      <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
    </svg>
  );
}

/**
 * Hình minh họa đầu thẻ giấy tờ Bước 1 (khung tỉ lệ 1 : 0,82 như V2 `.process-illustration`).
 * Trang trí thuần → `aria-hidden`; nội dung chữ nằm ở thân thẻ.
 */
export function AdmissionDocumentIllustration({
  illustration,
  position,
}: {
  illustration: Illustration;
  /** Thứ tự thẻ (0–6) để lệch pha hiệu ứng nhấp nhô. */
  position: number;
}) {
  const [delay, duration] = floatTimings[position % floatTimings.length];

  let content: React.ReactNode;
  switch (illustration.kind) {
    case "flip-card":
      content = (
        <div className={styles.documentStack}>
          <div className={styles.flipCard}>
            <div className={styles.flipInner}>
              {[illustration.frontSrc, illustration.backSrc].map(
                (src, faceIndex) => (
                  <div
                    key={src}
                    className={`${styles.flipFace} ${faceIndex === 1 ? styles.flipBack : ""}`}
                  >
                    <Image
                      src={src}
                      alt=""
                      width={illustration.width}
                      height={illustration.height}
                      loading="lazy"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      );
      break;
    case "vneid-phone":
      content = (
        <Image
          src={illustration.src}
          alt=""
          width={366}
          height={682}
          loading="lazy"
          className={styles.vneidPhone}
        />
      );
      break;
    case "calling-phone":
      content = (
        <div className={styles.callingPhone}>
          <Image
            src={illustration.src}
            alt=""
            width={1254}
            height={1254}
            loading="lazy"
          />
          <div className={styles.callingOverlay}>
            <div className={styles.callingPulse} />
            <div
              className={styles.callingPulse}
              style={{ "--pulse-delay": "0.8s" } as CSSProperties}
            />
            <div className={styles.callingAvatar}>HPO</div>
            <div className={styles.callingTitle}>ĐANG GỌI...</div>
            <div className={styles.callingSub}>Trung tâm HPO</div>
            <div className={styles.callingActions}>
              <span className={`${styles.callingButton} bg-[#ef4444]`}>
                <HangUpIcon />
              </span>
              <span className={`${styles.callingButton} bg-[#10b981]`}>
                <AcceptCallIcon />
              </span>
            </div>
          </div>
        </div>
      );
      break;
    case "photo-fan":
      content = (
        <div className={styles.photoFan}>
          {admissionPhotoFanLayers.map((layer, layerIndex) => (
            <Image
              key={layerIndex}
              src={illustration.src}
              alt=""
              width={515}
              height={692}
              loading="lazy"
              className={styles.photoCopy}
              style={
                {
                  zIndex: layer.zIndex,
                  "--stack-transform": layer.stack,
                  "--fan-transform": layer.fan,
                } as CSSProperties
              }
            />
          ))}
        </div>
      );
      break;
    case "floating-image":
      content = (
        <Image
          src={illustration.src}
          alt=""
          width={1254}
          height={1254}
          loading="lazy"
          className={styles.floatingImage}
          style={
            {
              "--float-delay": delay,
              "--float-duration": duration,
            } as CSSProperties
          }
        />
      );
      break;
  }

  const clips =
    illustration.kind === "vneid-phone" || illustration.kind === "photo-fan";
  return (
    <figure
      aria-hidden="true"
      className={`relative m-0 flex aspect-[1/0.82] items-center justify-center ${
        illustration.kind === "photo-fan" ? "p-0" : "px-2.5 pt-2"
      } ${clips ? "overflow-hidden" : ""}`}
    >
      {content}
    </figure>
  );
}
