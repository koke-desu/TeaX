/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Layout from "../../src/components/Layout";
import {
  pushPageQrCodeReaderAtom,
  pushPageQuizAtom,
  userAtom,
} from "../../src/database/atom";
import { authLogOut } from "../../src/database/basicFunc/auth";
import { setUserCoupon } from "../../src/database/basicFunc/firestore";
import { useInitPage } from "../../src/hooks/initAppHooks";

const Main = () => {
  useInitPage();
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const setQuizId = useSetRecoilState(pushPageQuizAtom);
  const setIsQrPageOpen = useSetRecoilState(pushPageQrCodeReaderAtom);
  return (
    <div style={{ gap: 10, display: "flex", flexDirection: "column" }}>
      <p>userID:{user.id}</p>
      <button
        onClick={() => {
          authLogOut();
          router.replace("/userAction/login");
        }}
      >
        signout
      </button>
      <button onClick={() => setUserCoupon(user.id)}>クーポン獲得する</button>

      <button onClick={() => setIsQrPageOpen(true)}>
        goto qrcodereader page
      </button>
      <button
        onClick={() => {
          setQuizId("aiueo");
        }}
      >
        goto aiueo page
      </button>
    </div>
  );
};

export default Main;
