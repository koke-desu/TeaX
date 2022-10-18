/* eslint-disable jsx-a11y/alt-text */

import { css } from "@emotion/css";
import { NextRouter } from "next/router";
import { FC } from "react";
import { useSetRecoilState } from "recoil";
import { pushPageQuizAtom } from "../database/atom";

type Props = {
  onClickCart: () => void;
  cartNum: number;
  isHome: boolean;
  onClose: () => void;
};
/* eslint-disable @next/next/no-img-element */
const HeaderNav: FC<Props> = ({ onClickCart, cartNum, isHome, onClose }) => {
  return (
    <div className={styles.box}>
      {isHome ? (
        <>
          <img src="/appIcon.png" width="42px" height="46px" />
          <div className={styles.text}>
            <p className={styles.title}>TeaX</p>
            <p className={styles.description}>sponsored by polygon</p>
          </div>

          <a onClick={onClickCart} className={styles.cart}>
            <div className={styles.badge(cartNum !== 0)}>{cartNum}</div>
            <img src="/cartIcon.png" width="34px" height="34px" />
          </a>
        </>
      ) : (
        <button onClick={onClose}>戻る</button>
      )}
    </div>
  );
};

const styles = {
  badge: (isItemInCart: boolean) => css`
    transition: all 0.4s ease-in-out;
    opacity: ${isItemInCart ? 1 : 0};
    position: absolute;
    top: -12px;
    right: -12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    background-color: red;
    width: 28px;
    height: 28px;
    color: white;
  `,
  box: css`
    background-color: #87ce41;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 80px;
  `,
  box2: css`
    background-color: #87ce41;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    position: fixed;
    top: 0;
    left: 100vw;
    width: 100vw;
  `,

  text: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  title: css`
    color: white;
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  `,

  description: css`
    color: white;
    font-size: 12px;
    margin: 0;
  `,

  cart: css`
    position: relative;
    margin-left: auto;
  `,
};

export default HeaderNav;
