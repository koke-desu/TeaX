import { css, cx } from "@emotion/css";
import { FC } from "react";

type Props = {
  isCouponUsed: boolean;
  onClick: () => void;
};

const CouponIcon: FC<Props> = ({ isCouponUsed, onClick }) => {
  return (
    <a onClick={onClick}>
      <div
        className={cx(styles.couponExsists, {
          [styles.disableCoupon(isCouponUsed)]: isCouponUsed,
        })}
      >
        <img src="/couponUsed.png" width="100px" height="auto" />
      </div>
      <div
        className={cx(styles.couponNotExsists, {
          [styles.disableCoupon(!isCouponUsed)]: !isCouponUsed,
        })}
      >
        <img src="/couponNotUsed.png" width="100px" height="auto" />
      </div>
    </a>
  );
};

const styles = {
  couponExsists: css`
    opacity: 1;
    z-index: 100;
    width: "100px";
    height: "100px";
    transition: opacity 0.3s ease-in-out;
    position: absolute;
  `,
  couponNotExsists: css`
    opacity: 1;
    z-index: 100;
    width: "100px";
    height: "100px";
    transition: opacity 0.3s ease-in-out;
    position: absolute;
  `,
  disableCoupon: (isExsists: boolean) => css`
    opacity: 0;
  `,
};

export default CouponIcon;
