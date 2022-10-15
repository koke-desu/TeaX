/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CouponHalfModal from "../../src/components/CouponHalfModal";
import Layout from "../../src/components/Layout";
import Product from "../../src/components/orderComps/Product";
import {
  couponListModalAtom,
  menusAtom,
  userAtom,
} from "../../src/database/atom";
import { authLogOut } from "../../src/database/basicFunc/auth";
import { useInitPage } from "../../src/hooks/initAppHooks";
import LargeButton from "../../src/html&cssComps/LargeButton";

const Main = () => {
  useInitPage();

  const router = useRouter();
  const user = useRecoilValue(userAtom);
  // const setIsCouponModalOpen = useSetRecoilState(couponListModalAtom);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const menus = useRecoilValue(menusAtom);
  return (
    <>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        {/* <p>userID:{user.id}</p> */}
        {/* <button
        onClick={() => {
          authLogOut();
          router.replace("/userAction/login");
        }}
      >
        signout
      </button> */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "12px",
          }}
        >
          <LargeButton
            title="クーポン一覧"
            onClick={() => setIsCouponModalOpen(true)}
          />
        </div>
        <div
          style={{
            margin: "12px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {Object.values(menus).map((menu, index) => (
            <Product key={index} menu={menu}></Product>
          ))}
        </div>
      </div>
      <CouponHalfModal
        modalIsOpen={isCouponModalOpen}
        setModalIsOpen={setIsCouponModalOpen}
      />
    </>
  );
};

export default Main;
