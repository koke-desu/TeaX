import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useAccountFunc } from "../database/authFunc";
import { userAtom } from "../database/atom";
import { isLogined } from "../database/basicFunc/auth";
import { useInitPage } from "../hooks/initAppHooks";

const InitialPage = () => {
  useInitPage();
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 10,
        top: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <h1>loading..icon</h1>
    </div>
  );
};

export default InitialPage;
