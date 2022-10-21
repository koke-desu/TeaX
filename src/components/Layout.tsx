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

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  useEffect(() => {
    window.addEventListener("appinstalled", () => {
      // Optionally, send analytics event to indicate successful install
      console.log("PWA was installed");
    });
  }, []);

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
        }}
      >
        <Header isHome onClose={() => {}}></Header>
        <main style={{ display: "flex", flexGrow: 1 }}>{children}</main>
        <InstallButton />
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
