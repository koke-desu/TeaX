import { css, cx } from "@emotion/css";
import { FC, ReactNode } from "react";
import CloseButton from "../html&cssComps/CloseButton";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose?: () => void;
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
    transition: all 0.3s ease-in-out;
    transform: translateY(100vh);
    background-color: white;
    z-index: 10;
    display: flex;
    flex-direction: column;
    width: 90%;

    padding: 16px;
    margin: 12px;
    border-radius: 8px;
  `,
  modalOpen: css`
    transform: translateY(0%);
  `,
  back: css`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
  `,
};

const Modal: FC<Props> = ({
  children,
  isOpen,
  setIsOpen,
  onClose = () => {},
  title,
}) => {
  return (
    <>
      <div className={cx(styles.backDrop, { [styles.backDropIsOpen]: isOpen })}>
        <div className={cx(styles.modal, { [styles.modalOpen]: isOpen })}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              position: "relative",
              marginBottom: "8px",
            }}
          >
            <CloseButton
              onClick={() => {
                setIsOpen(false);
                onClose();
              }}
            />
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
          <div
            style={{
              maxHeight: "80vh",
              overflowY: "scroll",
              overflowX: "hidden",
              padding: "12px 0",
            }}
          >
            {children}
          </div>
        </div>
        <div
          className={styles.back}
          onClick={() => {
            onClose();
            setIsOpen(false);
            console.log("pressed");
          }}
        />
      </div>
    </>
  );
};

export default Modal;
