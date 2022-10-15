//アプリでのログインや新規登録（authのログインとfirestoreのドキュメント作成など）などの処理をまとめたファイル

import { AuthError } from "firebase/auth";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { User } from "../type/model";
import { userAtom } from "./atom";
import {
  authDelete,
  authLogin,
  authLogOut,
  authSignUp,
  isLogined,
} from "./basicFunc/auth";
import { createUserData, fetchUserData } from "./basicFunc/firestore";
import { auth } from "./firebase";
//TODO:処理後に受け取ったユーザーデータをローカルに保存しなければいけない（Reduxを使うかRecoilを使うか）
//TODO:またどの関数でデータを格納するかも考えないと（ここのファイルで格納するかfirestore.tsで格納するか）

export const useAccountFunc = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const router = useRouter();
  const setUserData = () => {
    const id = auth.currentUser?.uid;
    if (id) setUser(fetchUserData(id));
    else console.log("ログインしてません");
  };
  const logIn = async (email: string, password: string) => {
    let userId: string | null = null;
    await authLogin(email, password)
      .then((userCredential) => {
        console.log("logined");
        userId = userCredential.user.uid;
      })
      .catch((error: AuthError) => {
        console.log(error.message);
        return error;
      });
    if (userId)
      await fetchUserData(userId)
        .then((data: User) => {
          setUser(data);
          router.replace("/order/main");
        })
        .catch((error: AuthError) => {
          console.log(error.message);
          authLogOut();
          return error;
        });
  };

  //新規登録
  const signUp = async (email: string, password: string) => {
    console.log("サインアップします");
    await authSignUp(email, password)
      .then((userCredential) => {
        console.log("signUped");
        let user = userCredential.user;
        createUserData(user.uid)
          .then(() => {
            console.log("created userData");
            setUser({ id: user.uid, coupons: {}, quizzes: {} });
            router.replace("/main/main");
          })
          .catch((error: AuthError) => {
            console.log(error.message);
            console.log("アカウントを削除します");
            if (user)
              authDelete(user)
                .then(() => console.log("削除しました"))
                .catch((error: AuthError) => {
                  console.log(error.message);
                  console.log("アカウントを削除できませんでした！！");
                });
            return error;
          });
      })
      .catch((error) => {
        console.log("signupできませんでした");
        alert(error.message);
        return error;
      });
  };
  //ログアウト
  const logOut = async (then: () => void) => {
    await authLogOut()
      .then(() => {
        console.log("logouted");
        setUser({ id: "", coupons: {}, quizzes: {} });
        then();
      })
      .catch((error: AuthError) => {
        console.log(error.message);
      });
  };
  return {
    logIn,
    logOut,
    signUp,
    setUserData,
  };
};
