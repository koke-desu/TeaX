import { useRouter } from "next/router";
import { useEffect } from "react";
import { isLogined } from "../database/basicFunc/auth";

const InitialPage = () => {
  const router = useRouter();
  useEffect(() => {
    isLogined(
      () => {
        console.log("not login");
        // router.push("/userAction/login");
      },
      () => {
        console.log("logined");
        // router.push("/main/main");
      }
    );
  }, []);
  return (
    <div>
      <h1>loading..icon</h1>
    </div>
  );
};

export default InitialPage;
