/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { css } from "@emotion/css";
import { url } from "inspector";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { couponState } from "../type/model";
import image from "/couponCard.png";

type Props = {
  title: string;
  description: string;
  onClick: () => void;
  state: couponState;
  isUseMode: boolean;
};

const styles = {
  all: css`
    position: relative;
    width: 331px;
    height: 80px;
    font-size: 7px;
    margin: 8px;
  `,
  image: css`
    position: absolute;
    width: 100%;
    top: 0;
    z-index: -1;
  `,
  title: css`
    color: black;
    font-weight: bold;
    margin: 0 0 0 30px;
    padding-top: 8px;
  `,
  content: css`
    color: black;
    margin: 5px 0 0 50px;
  `,
  usecoupon: css`
    background-color: #87ce41;
    border-radius: 10px;
    border: none;
  `,
  use: css`
    color: white;
    font-size: 7px;
  `,
  a: css`
    font-size: 16px;
  `,
  b: css`
    /* height: 48px;  */
    display: flex;
  `,
  b1: css`
    flex-grow: 1;
    /* overflow: auto; */
  `,
  b2: css`
    white-space: nowrap;
    margin: 3px;
  `,
  move: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  backdrop: css`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
  `,
  backdropText: css`
    color: white;
    font-size: 20px;
    font-weight: bold;
  `,
  gotoQuiz: css`
    position: absolute;
    right: 20px;
    background-color: #e4c76f;
    width: 64px;
    height: 64px;
    border-radius: 100px;
    border: none;
    padding: 8px;
    font-size: 11px;
    font-weight: bold;
    display: flex;
    align-items: center;
  `,
};

const CouponCard: FC<Props> = ({
  title,
  description,
  onClick,
  state,
  isUseMode,
}) => {
  return (
    <>
      <div className={styles.all}>
        <img src="/couponCard.png" className={styles.image} />
        {state !== "useable" && (
          <div className={styles.backdrop}>
            <p className={styles.backdropText}>
              {state === "used" ? "使用済み" : "未獲得"}
            </p>
            {state !== "used" && (
              <Link href="/quiz/main">
                <div className={styles.gotoQuiz}>スタンプラリーへ</div>
              </Link>
            )}
          </div>
        )}
        <div className={styles.a}>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.b}>
          <div className={styles.b1}>
            <p className={styles.content}>{description}</p>
          </div>
          <div className={styles.move}>
            <div className={styles.b2}>
              {isUseMode && (
                <button
                  className={styles.usecoupon}
                  type="button"
                  onClick={onClick}
                >
                  <p className={styles.use}>クーポンを使う</p>
                </button>
              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponCard;
