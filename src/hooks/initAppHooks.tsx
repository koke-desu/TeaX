import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../database/atom";
import { isLogined } from "../database/basicFunc/auth";
import { fetchUserData } from "../database/basicFunc/firestore";
import { useOrderFunc } from "../database/orderFunc";
import { User } from "../type/model";

export const useInitPage = () => {
  const router = useRouter();
  const orderFunc = useOrderFunc();
  const [user, setUser] = useRecoilState(userAtom);
  useEffect(() => {
    isLogined(
      () => {
        router.replace("/userAction/login");
      },
      (id: string) => {
        fetchUserData(id).then((data: User) => {
          console.log("setUserData to recoil", data);
          setUser(data);
          orderFunc.getMenus();
          orderFunc.getCoupons();
          orderFunc.getToppings();
          orderFunc.getOrderState(data.id);
        });
        if (router.pathname === "/") router.replace("/order/main");
      }
    );
  }, []);
};
