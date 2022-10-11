/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Layout from "../../src/components/Layout";
import Product from "../../src/components/orderComps/Product";
import { couponListModalAtom, userAtom } from "../../src/database/atom";
import { useInitPage } from "../../src/database/authFunc";
import { authLogOut } from "../../src/database/basicFunc/auth";

const Main = () => {
  useInitPage();

  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const setIsCouponModalOpen = useSetRecoilState(couponListModalAtom);
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
        {new Array(12).fill(0).map((zero, index) => (
          <Product key={index}></Product>
        ))}
      </div>
    </div>
  );
};

export default Main;
