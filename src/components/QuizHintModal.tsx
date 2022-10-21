import { css, cx } from "@emotion/css";
import { FC } from "react";
import SmallButton from "../html&cssComps/SmallButton";

type Props = {
  isOpen: string;
  setIsOpen: (a: string) => void;
};

const QuizHintModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  console.log(isOpen);
  return (
    <div
      className={cx(styles.backDrop, {
        [styles.backDropIsOpen]: isOpen !== "" ? true : false,
      })}
    >
      <div
        className={cx(styles.modal, {
          [styles.modalOpen]: isOpen !== "" ? true : false,
        })}
      >
        <h3>ヒント</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "100%",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: "bold" }}>{isOpen}</p>
          <div style={{ display: "flex", alignSelf: "flex-end" }}>
            <SmallButton
              title="ヒントを閉じる"
              onClick={() => {
                setIsOpen("");
              }}
            />
          </div>
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
          setIsOpen("");
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
    z-index: 100;
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
    padding: 20px;
    width: 90vw;
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

export default QuizHintModal;
