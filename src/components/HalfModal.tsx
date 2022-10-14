import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const HalfModal: FC<Props> = ({ children, isOpen, setIsOpen }) => {
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
          zIndex: 2,
          position: "fixed",
          bottom: 0,
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          backgroundColor: "white",
          width: "100vw",
          padding: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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

export default HalfModal;
