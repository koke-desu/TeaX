import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Modal: FC<Props> = ({ children, isOpen, setIsOpen }) => {
  if (!isOpen) return <></>;
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => {
        setIsOpen(false);
        console.log("pressed");
      }}
    >
      <div
        style={{
          width: "90%",
          height: "90%",
          zIndex: 1000,
          margin: "12px",
          borderRadius: 8,
          backgroundColor: "white",
          padding: "12px",
          pointerEvents: "none",
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
              borderRadius: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
