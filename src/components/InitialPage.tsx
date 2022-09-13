import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useAccountFunc, useInitPage } from "../database/accountFunc";
import { userAtom } from "../database/atom";
import { isLogined } from "../database/basicFunc/auth";

const InitialPage = () => {
  useInitPage();
  return (
    <div>
      <h1>loading..icon</h1>
    </div>
  );
};

export default InitialPage;
