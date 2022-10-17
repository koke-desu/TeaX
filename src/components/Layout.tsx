import Head from "next/head";
import { FC, ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { orderedDataAtom } from "../database/atom";
import BottomNavigation from "./BottomNavigation";
import CartProductsModal from "./CartProductsModal";
import { Header } from "./Header";
import OrderingFAB from "./OrderingFAB";
import OrderingListModal from "./OrderingListModal";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: "50px",
      }}
    >
      <Head>
        <title>about me</title>
      </Head>
      <Header></Header>
      <main style={{ display: "flex", flexGrow: 1 }}>{children}</main>
      <OrderingFAB></OrderingFAB>
      <BottomNavigation></BottomNavigation>
      <OrderingListModal></OrderingListModal>
      <CartProductsModal></CartProductsModal>
    </div>
  );
};

export default Layout;
