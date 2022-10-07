/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../src/database/atom";
import { useInitPage } from "../../src/database/authFunc";
import { authLogOut } from "../../src/database/basicFunc/auth";

const Main = () => {
  useInitPage();
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  return (
    <div>
      main
      <h1>userID:{user.id}</h1>
      <button
        onClick={() => {
          authLogOut();
          router.replace("/userAction/login");
        }}
      >
        signout
      </button>
    </div>
  );
};

export default Main;
