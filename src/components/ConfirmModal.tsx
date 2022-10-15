import { css, cx } from "@emotion/css";
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
  return (
    <div
      // style={{
      //   width: "100vw",
      //   height: "100vh",
      //   zIndex: 1,
      //   position: "fixed",
      //   bottom: 0,
      //   left: 0,
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      className={cx(styles.backDrop, { [styles.backDropIsOpen]: isOpen })}
    >
      <div
        // style={{
        //   zIndex: 10,
        //   margin: "12px",
        //   maxWidth: "600px",
        //   borderRadius: 8,
        //   backgroundColor: "white",
        //   padding: "24px",
        // }}
        className={cx(styles.modal, { [styles.modalOpen]: isOpen })}
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

const styles = {
  backDrop: css`
    transition: background-color 0.3s ease-in-out;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0);
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
    /* width: 90%;
    height: 90%; */
    padding: 16px;
    margin: 12px;
    border-radius: 8px;
  `,
  modalOpen: css`
    transform: translateY(0);
  `,
  back: css`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
  `,
};

export default ConfirmModal;
