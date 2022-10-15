import { FC } from "react";
import LargeButton from "../html&cssComps/LargeButton";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
  onOk: () => void;
};

const ConfirmModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  onOk,
  description,
  title,
}) => {
  if (!isOpen) return <></>;
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        position: "fixed",
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          zIndex: 10,
          margin: "12px",
          maxWidth: "600px",
          borderRadius: 8,
          backgroundColor: "white",
          padding: "24px",
        }}
      >
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            gap: "8px",
          }}
        >
          {/* <button onClick={() => setIsOpen(false)}>キャンセル</button> */}
          <LargeButton
            title="キャンセル"
            onClick={() => setIsOpen(false)}
            isOutlined
          />
          {/* <button
            onClick={() => {
              onOk();
              setIsOpen(false);
            }}
          >
            OK
          </button> */}
          <LargeButton
            title="OK"
            onClick={() => {
              onOk();
              setIsOpen(false);
            }}
          />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "absolute",
          zIndex: 1,
        }}
        onClick={() => {
          setIsOpen(false);
          console.log("pressed");
        }}
      />
    </div>
  );
};

export default ConfirmModal;
