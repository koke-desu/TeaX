/* eslint-disable jsx-a11y/alt-text */

import { css } from "@emotion/css";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { isContext } from "vm";
import { orderedDataAtom } from "../database/atom";

type Props = {
  onClick: () => void;
};

/* eslint-disable @next/next/no-img-element */
const OrderStatus: FC<Props> = ({ onClick }) => {
  const orderData = useRecoilValue(orderedDataAtom);
  const isVisible = orderData ? true : false;
  return (
    <div className={styles.visible(isVisible)}>
      <button className={styles.box} onClick={onClick} disabled={!isVisible}>
        {orderData && (
          <>
            <img
              src="/checkIcon.png"
              className={styles.checkIcon(orderData.isCompleted)}
              height="50px"
              width="50px"
            />
            <img
              className={styles.app_icon(orderData.isCompleted)}
              src="/tea.png"
              width="29px"
              height="50px"
            />
          </>
        )}
      </button>
    </div>
  );
};

const styles = {
  visible: (isVisible: boolean) => css`
    opacity: ${isVisible ? 1 : 0};
  `,
  box: css`
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: 0.3s;
    background-color: #e4c76f;
    display: flex;
    flex-direction: column;
    padding: 15px;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: fixed;
    bottom: 80px;
    right: 20px;
    &:active {
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    }
  `,

  app_icon: (isComplete: boolean) => css`
    transition: all 0.3s ease-in-out;
    margin: 0;
    opacity: ${isComplete ? 0 : 1};
  `,

  checkIcon: (isComplete: boolean) => css`
    transition: all 0.3s ease-in-out;
    position: absolute;
    opacity: ${isComplete ? 1 : 0};
  `,

  text: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  line_1: css`
    color: black;
    font-size: 16px;
    font-weight: 700;
    margin: 5px 0 0 0;
  `,

  line_2: css`
    color: black;
    font-size: 16px;
    font-weight: 700;
    margin: -5px 0 0 0;
  `,
};

export default OrderStatus;
