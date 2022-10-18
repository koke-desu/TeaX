import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { useWindowSize } from "../../src/hooks/useWindowSize";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pushPageQuizAtom, quizzesAtom } from "../../src/database/atom";

const QRCodeScanner: React.VFC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrData, setQrData] = useState<string>("");

  const { width, height } = useWindowSize();
  const router = useRouter();

  const setQuizId = useSetRecoilState(pushPageQuizAtom);
  const quizzes = useRecoilValue(quizzesAtom);

  // カメラで撮影し、プレビューを表示
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          video.srcObject = stream;
        });
    }
  }, []);

  // QRコードを読み取り
  useEffect(() => {
    const decodeQRCode = () => {
      const context = canvasRef?.current?.getContext("2d");
      const video = videoRef?.current;

      if (!context || !video) {
        return;
      }

      context.drawImage(video, 0, 0, width, height);
      const imageData = context.getImageData(0, 0, width, height);
      const code = jsQR(imageData.data, width, height);

      return code?.data;
    };

    intervalRef.current = window.setInterval(() => {
      const decodedValue = decodeQRCode();

      decodedValue && setQrData(decodedValue);
    }, 100);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [width, height]);

  // 正しいQRコードが読み込まれたら別ページに遷移
  useEffect(() => {
    const quiz = quizzes.find((q) => q.id === qrData);

    if (quiz !== undefined) {
      setQuizId(quiz.id);
      router.push(`answer`);
    }
  }, [qrData, quizzes, router, setQuizId]);

  return (
    <div>
      <div style={{ position: "fixed", top: 0 }}>
        <video
          autoPlay
          playsInline={true}
          ref={videoRef}
          style={{ width: "100vw", height: "100vh" }}
        >
          <canvas width={width} height={height} ref={canvasRef} />
        </video>
        {/* 無理やり中央の枠線を付けてる */}
        <div
          style={{
            position: "fixed",
            top: height / 2 - 32, // 位置の微調整
            left: width / 2,
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>QRコードをスキャン</p>
          <div
            style={{
              marginTop: 20,
              width: 150,
              height: 150,
              backgroundColor: "rgba(0, 0, 0, 0)",
              borderWidth: "8px",
              borderColor: "gray",
              borderStyle: "solid",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
