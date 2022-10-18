/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { css } from "@emotion/css";
import { FC } from "react";

type Props = {
  onClick: () => void;
  name: string;
  price: number;
  imageUrl: string;
};

const MenuCard: FC<Props> = ({ onClick, name, price, imageUrl }) => {
  return (
    <a onClick={onClick}>
      <div className={styles.card}>
        <div className={styles.image}>
          <img
            width="auto"
            height="100%"
            src={imageUrl ? imageUrl : "/sample.png"}
          />
        </div>
        <div className={styles.text}>
          <p className={styles.title}>{name ? name : "サンプル"}</p>
          <p className={styles.price}>¥{price ? price : 500}</p>
        </div>
      </div>
    </a>
  );
};

const styles = {
  text: css`
    margin: 0;
  `,
  image: css`
    height: 90px;
    aspect-ratio: 1;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  card: css`
    transition: all 0.1s ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 160px;
    height: 180px;
    padding: 12px 0px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.2);
    background-color: white;

    &:active {
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0);
    }
  `,

  title: css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    color: rgb(98, 96, 96);
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0px 4px 0px;
  `,

  price: css`
    font-size: 22px;
    font-weight: bold;
    margin: 0px;
    text-align: center;
  `,
};

export default MenuCard;
