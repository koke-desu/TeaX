/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { memo } from "react";
import { useSetRecoilState } from "recoil";
import { cartProductModalAtom } from "../database/atom";
import { useAccountFunc } from "../database/authFunc";

export const Header = memo(() => {
  const router = useRouter();
  const setModalOpen = useSetRecoilState(cartProductModalAtom);
  const authFunc = useAccountFunc();
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "50px",
          border: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          backgroundColor: "white",
        }}
      >
        <button onClick={() => authFunc.logOut()}>logout</button>
        {router.pathname === "/order/main" ||
        router.pathname === "/quiz/main" ? (
          <p>ロゴ</p>
        ) : (
          <button onClick={() => router.back()}>戻る</button>
        )}
        <button onClick={() => setModalOpen(true)}>カート</button>
      </div>
    </>
  );
});
