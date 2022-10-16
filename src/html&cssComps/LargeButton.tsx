import { css } from "@emotion/css";
import { FC, ReactNode } from "react";

type Props = {
  onClick: () => void;
  title: string;
  isOutlined?: boolean;
  backgroundColor?: string;
  children?: ReactNode;
};

const LargeButton: FC<Props> = ({
  onClick,
  title,
  isOutlined = false,
  backgroundColor = "#e4c76f",
  children = <></>,
}) => {
  return (
    <button
      className={styles.button(isOutlined, backgroundColor)}
      type="button"
      onClick={onClick}
    >
      {title}
      {children}
    </button>
  );
};

const styles = {
  button: (isOutlined: boolean, backgroundColor: string) => css`
    color: #090909;
    padding: 0.7em 1.7em;
    font-size: 20px;
    border-radius: 0.6em;
    font-weight: 900;
    line-height: 1;
    background: ${isOutlined ? "#ffffff" : backgroundColor};
    border: 1px solid #e4c76f;
    width: 150px;
    height: 50px;
    padding: 0%;
    transition: background-color 0.1s ease-out;

    &:active {
      background: #eeeeee;
    }
  `,
};

export default LargeButton;
