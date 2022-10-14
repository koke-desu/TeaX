/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Layout from "../../src/components/Layout";
import Product from "../../src/components/orderComps/Product";
import {
  couponListModalAtom,
  menusAtom,
  userAtom,
} from "../../src/database/atom";
import { authLogOut } from "../../src/database/basicFunc/auth";
import { useInitPage } from "../../src/hooks/initAppHooks";

const Main = () => {
  useInitPage();

  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const setIsCouponModalOpen = useSetRecoilState(couponListModalAtom);
  const menus = useRecoilValue(menusAtom);
  return (
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
        style={{ display: "flex", justifyContent: "flex-end", margin: "12px" }}
      >
        <button
          onClick={() => setIsCouponModalOpen(true)}
          style={{ width: "120px", height: "40px", borderRadius: 8 }}
        >
          クーポン一覧
        </button>
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
  );
};

export default Main;
