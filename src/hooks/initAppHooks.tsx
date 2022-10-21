import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoadingAtom, userAtom } from "../database/atom";
import { isLogined } from "../database/basicFunc/auth";
import { fetchUserData } from "../database/basicFunc/firestore";
import { useOrderFunc } from "../database/orderFunc";
import { useQuizFunc } from "../database/quizFunc";
import { User } from "../type/model";

export const useInitPage = () => {
  const router = useRouter();
  const orderFunc = useOrderFunc();
  const quizFunc = useQuizFunc();
  const [user, setUser] = useRecoilState(userAtom);
  const setSplashScreenIsOpen = useSetRecoilState(isLoadingAtom);
  useEffect(() => {
    isLogined(
      () => {
        router.replace("/userAction/login");
      },
      (id: string) => {
        if (user.id === "")
          fetchUserData(id).then((data: User) => {
            console.log("setUserData to recoil", data);
            setUser(data);
            orderFunc.getMenus();
            orderFunc.getCoupons();
            orderFunc.getToppings();
            quizFunc.getQuizzes();
            orderFunc.getOrderState(data.id);
          });
        if (router.pathname === "/") router.replace("/quiz/main");
        setSplashScreenIsOpen(false);
      }
    );
  }, []);
};
