import { FC } from "react";

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
          width: "70%",
          zIndex: 10,
          margin: "12px",
          borderRadius: 8,
          backgroundColor: "white",
          padding: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <button
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "gray",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <button onClick={() => setIsOpen(false)}>キャンセル</button>
          <button
            onClick={() => {
              onOk();
              setIsOpen(false);
            }}
          >
            OK
          </button>
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
