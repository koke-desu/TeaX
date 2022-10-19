import { css, cx } from "@emotion/css";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { achieveCouponModalAtom } from "../database/atom";
import LargeButton from "../html&cssComps/LargeButton";

type Props = {
  title: string;
  description: string;
};
const Infomation: FC<Props> = ({ title, description }) => {
  const [isOpen, setIsOpen] = useRecoilState(achieveCouponModalAtom);
  console.log(isOpen);
  return (
    <div
      className={cx(styles.backDrop, {
        [styles.backDropIsOpen]: isOpen !== null ? true : false,
      })}
    >
      <div
        className={cx(styles.modal, {
          [styles.modalOpen]: isOpen !== null ? true : false,
        })}
      >
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "100%",
            gap: "8px",
          }}
        >
          <p>{isOpen}を獲得しました</p>
          <LargeButton
            title="OK"
            onClick={() => {
              setIsOpen(null);
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
          setIsOpen(null);
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

export default Infomation;
