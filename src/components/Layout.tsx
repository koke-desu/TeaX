import Head from "next/head";
import { FC, ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { orderedDataAtom } from "../database/atom";
import BottomNavigation from "./BottomNavigation";
import CartProductsModal from "./CartProductsModal";
import { Header } from "./Header";
import AchieveCouponModal from "./AchieveCouponModal";
import OrderingFAB from "./OrderingFAB";
import OrderingListModal from "./OrderingListModal";
import QRReaderPage from "./QRReaderPage";
import QuizPage from "./QuizPage";
import InstallButton from "./InstallButton";
import SplashScreen from "./SplashScreen";
import { NodeNextRequest } from "next/dist/server/base-http/node";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: "50px",
          color: "black",
          overflowY: "scroll",
          overflowX: "hidden",
          paddingBottom: "100px",
        }}
      >
        <Header isHome onClose={() => {}}></Header>
        <main style={{ display: "flex", flexGrow: 1 }}>{children}</main>
        {/* <InstallButton /> */}
        <OrderingFAB></OrderingFAB>
        <BottomNavigation></BottomNavigation>
        <OrderingListModal></OrderingListModal>
        <CartProductsModal></CartProductsModal>
      </div>
      <QRReaderPage />
      <QuizPage />
      <AchieveCouponModal />
      <SplashScreen />
    </>
  );
};

export default Layout;
