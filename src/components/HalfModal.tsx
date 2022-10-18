import { css, cx } from "@emotion/css";
import { FC, ReactNode } from "react";
import CloseButton from "../html&cssComps/CloseButton";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
};

const styles = {
  backDrop: css`
    transition: background-color 0.3s ease-in-out;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0);
    width: 100vw;
    height: 100vh;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  `,
  backDropIsOpen: css`
    pointer-events: auto;
    background-color: rgba(0, 0, 0, 0.6);
  `,
  modal: css`
    transition: all 0.4s ease-in-out;
    transform: translateY(0);
    background-color: white;
    z-index: 10;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 16px;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  `,
  modalClose: css`
    transform: translateY(100vh);
  `,
  back: css`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
  `,
};

const HalfModal: FC<Props> = ({ children, isOpen, setIsOpen, title }) => {
  return (
    <div className={cx(styles.backDrop, { [styles.backDropIsOpen]: isOpen })}>
      <div className={cx(styles.modal, { [styles.modalClose]: !isOpen })}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "relative",
            marginBottom: "8px",
          }}
        >
          <CloseButton onClick={() => setIsOpen(false)} />
          <h2
            style={{
              width: "100%",
              position: "absolute",
              top: 0,
              textAlign: "center",
              margin: 0,
              zIndex: -1,
            }}
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
        }}
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default HalfModal;
