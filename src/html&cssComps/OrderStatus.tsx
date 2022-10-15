/* eslint-disable jsx-a11y/alt-text */

import { css } from "@emotion/css";
import { FC } from "react";

type Props = {
  onClick: () => void;
};

/* eslint-disable @next/next/no-img-element */
const OrderStatus: FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.box} onClick={onClick}>
      <img
        className={styles.app_icon}
        src="/tea.png"
        width="29px"
        height="50px"
      />
      {/* <div className={styles.text}>
        <p className={styles.line_1}>現在</p>
        <p className={styles.line_2}>作成中です</p>
      </div> */}
    </button>
  );
};

const styles = {
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

  app_icon: css`
    margin: 0;
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
