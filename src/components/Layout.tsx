import Head from "next/head";
import { FC, ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { orderedDataAtom } from "../database/atom";
import BottomNavigation from "./BottomNavigation";
import CartProductsModal from "./CartProductsModal";
import CouponHalfModal from "./CouponHalfModal";
import { Header } from "./Header";
import OrderingFAB from "./OrderingFAB";
import OrderingListModal from "./OrderingListModal";
import ProductItemModal from "./ProductItemModal";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const orderData = useRecoilValue(orderedDataAtom);
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
      {orderData && <OrderingFAB></OrderingFAB>}
      <BottomNavigation></BottomNavigation>
      <CouponHalfModal></CouponHalfModal>
      <OrderingListModal></OrderingListModal>
      <CartProductsModal></CartProductsModal>
    </div>
  );
};

export default Layout;
