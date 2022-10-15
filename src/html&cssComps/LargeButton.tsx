import { css } from "@emotion/css";
import { FC } from "react";

type Props = {
  onClick: () => void;
  title: string;
};

const LargeButton: FC<Props> = ({ onClick, title }) => {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {title}
    </button>
  );
};

const styles = {
  button: css`
    color: #090909;
    padding: 0.7em 1.7em;
    font-size: 20px;
    border-radius: 0.6em;
    font-weight: 900;
    line-height: 1;
    background: #e4c76f;
    border: 1px solid #e4c76f;
    width: 150px;
    height: 50px;
    padding: 0%;
    transition: background-color 0.1s ease-out;

    &:active {
      background: #d1b562;
    }
  `,
};

export default LargeButton;
