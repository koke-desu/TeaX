import { css, cx } from "@emotion/css";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { isLoadingAtom } from "../database/atom";
import { useInitPage } from "../hooks/initAppHooks";

const SplashScreen: FC = () => {
  const isOpen = useRecoilValue(isLoadingAtom);
  useInitPage();
  return (
    <div className={cx(styles.container, { [styles.containerOpen]: !isOpen })}>
      <img src="/tea.png" />
    </div>
  );
};

const styles = {
  container: css`
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #87ce41;
    opacity: 1;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 9999;
    pointer-events: all;
  `,
  containerOpen: css`
    opacity: 0;
    pointer-events: none;
  `,
};

export default SplashScreen;
