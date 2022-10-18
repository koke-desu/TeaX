import { css } from "@emotion/css";
import { FC } from "react";

type Props = {
  onClick: () => void;
};

const CloseButton: FC<Props> = ({ onClick }) => {
  return (
    <a onClick={onClick} className={styles.button}>
      <img src="/close.png" />
    </a>
  );
};

const styles = {
  button: css`
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    background-color: #e9e9e9;
    border-radius: 100px;

    &:active {
      background-color: #cecece;
    }
  `,
};

export default CloseButton;
