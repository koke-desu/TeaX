import { css, cx } from "@emotion/css";
import { FC, ReactNode } from "react";
import CloseButton from "../html&cssComps/CloseButton";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose?: () => void;
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
}) => {
  return (
    <>
      <div className={cx(styles.backDrop, { [styles.backDropIsOpen]: isOpen })}>
        <div className={cx(styles.modal, { [styles.modalOpen]: isOpen })}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <CloseButton
              onClick={() => {
                setIsOpen(false);
                onClose();
              }}
            />
          </div>
          {children}
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
