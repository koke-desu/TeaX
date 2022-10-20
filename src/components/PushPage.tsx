import { css, cx } from "@emotion/css";
import { FC, ReactNode, useState } from "react";
import { Header } from "./Header";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const PushPage: FC<Props> = ({ isOpen, children, onClose }) => {
  return (
    <div className={cx(styles.pushPage, { [styles.pushPageIsClose]: isOpen })}>
      <Header isHome={false} onClose={onClose}></Header>
      {isOpen && (
        <div style={{ marginTop: "40px", height: "100%" }}>{children}</div>
      )}
    </div>
  );
};

const styles = {
  pushPage: css`
    transition: all 0.3s ease-in-out;
    width: 100vw;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: -100vw;
    transform: translateX(0);
    z-index: 0;
    background-color: #e9e9e9;
  `,
  pushPageIsClose: css`
    transform: translateX(-100%);
  `,
};
export default PushPage;
