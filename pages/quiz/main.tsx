/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Layout from "../../src/components/Layout";
import { userAtom } from "../../src/database/atom";
import { authLogOut } from "../../src/database/basicFunc/auth";
import { useInitPage } from "../../src/hooks/initAppHooks";

const Main = () => {
  useInitPage();

  const router = useRouter();
  const user = useRecoilValue(userAtom);
  return (
    <>
      <p>userID:{user.id}</p>
      <button
        onClick={() => {
          authLogOut();
          router.replace("/userAction/login");
        }}
      >
        signout
      </button>
    </>
  );
};

export default Main;
