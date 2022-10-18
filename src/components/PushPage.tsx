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
      <div style={{ marginTop: "40px" }}>{children}</div>
    </div>
  );
};

const styles = {
  pushPage: css`
    transition: all 0.3s ease-in-out;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex: 1;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: -100vw;
    transform: translateX(0);
    z-index: 0;
    background-color: white;
  `,
  pushPageIsClose: css`
    transform: translateX(-100%);
  `,
};
export default PushPage;
