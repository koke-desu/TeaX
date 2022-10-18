import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const videoWidth: number = 500;
const videoHeight: number = 500;
const videoFrameRate: number = 5;

const constraints: MediaStreamConstraints = { video: { facingMode: "environment" } };

const QRCodeScanner: React.VFC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrData, setQrData] = useState<string>("");

  // カメラで撮影し、プレビューを表示
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
      });
    }
  }, []);

  //
  useEffect(() => {
    const decodeQRCode = () => {
      const context = canvasRef?.current?.getContext("2d");
      const video = videoRef?.current;

      if (!context || !video) {
        return;
      }

      context.drawImage(video, 0, 0, videoWidth, videoHeight);
      const imageData = context.getImageData(0, 0, videoWidth, videoHeight);
      const code = jsQR(imageData.data, videoWidth, videoHeight);

      return code?.data;
    };

    intervalRef.current = window.setInterval(() => {
      const decodedValue = decodeQRCode();

      decodedValue && setQrData(decodedValue);
    }, 1_000 / videoFrameRate);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <div style={{ display: "grid" }}>
        <div>
          <video autoPlay playsInline={true} ref={videoRef} style={{ width: "100%" }}>
            <canvas width={videoWidth} height={videoHeight} ref={canvasRef} />
          </video>
        </div>
        <div>
          <p>{qrData}</p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
