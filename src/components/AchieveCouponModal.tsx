import { css, cx } from "@emotion/css";
import { FC } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  achieveCouponModalAtom,
  couponListModalAtom,
  couponsAtom,
} from "../database/atom";
import CouponCard from "../html&cssComps/CouponCard";
import LargeButton from "../html&cssComps/LargeButton";
import SmallButton from "../html&cssComps/SmallButton";

const AchieveCouponModal: FC = () => {
  const [isOpen, setIsOpen] = useRecoilState(achieveCouponModalAtom);
  console.log(isOpen);
  const coupons = useRecoilValue(couponsAtom);
  const couponData = coupons.find((data) => data.achieveType === isOpen);
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
        <h3>クーポンを獲得しました！</h3>
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
          {couponData && (
            <CouponCard
              title={couponData.title}
              description={couponData.description}
              onClick={() => {}}
              state={"useable"}
              isUseMode={false}
              width={"100%"}
            />
          )}
          <div style={{ display: "flex", alignSelf: "flex-end" }}>
            <SmallButton
              title="閉じる"
              onClick={() => {
                setIsOpen(null);
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
    padding: 20px;
    width: 90vw;
    border-radius: 8px;
    color: black;
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

export default AchieveCouponModal;
