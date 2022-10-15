/* eslint-disable jsx-a11y/alt-text */

import { css } from "@emotion/css";
import { NextRouter } from "next/router";
import { FC } from "react";

type Props = {
  onClickCart: () => void;
  router: NextRouter;
};
/* eslint-disable @next/next/no-img-element */
const HeaderNav: FC<Props> = ({ onClickCart, router }) => {
  return (
    <div className={styles.box}>
      {router.pathname === "/order/main" || router.pathname === "/quiz/main" ? (
        <img src="/appIcon.png" width="42px" height="46px" />
      ) : (
        <button onClick={() => router.back()}>戻る</button>
      )}

      <div className={styles.text}>
        <p className={styles.title}>TeaX</p>
        <p className={styles.description}>sponsored by polygon</p>
      </div>

      <a onClick={onClickCart} className={styles.cart}>
        <img src="/cartIcon.png" width="34px" height="34px" />
      </a>
    </div>
  );
};

const styles = {
  box: css`
    background-color: #00613e;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    position: fixed;
    top: 0;
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
    margin-left: auto;
  `,
};

export default HeaderNav;
