//アプリでのログインや新規登録（authのログインとfirestoreのドキュメント作成など）などの処理をまとめたファイル

import { AuthError } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { User } from "../type/model";
import { userAtom } from "./atom";
import {
  AuthDelete,
  AuthLogin,
  AuthLogOut,
  AuthSignUp,
  isLogined,
} from "./basicFunc/auth";
import { createUserData, getUserData } from "./basicFunc/firestore";
import { auth } from "./firebase";
//TODO:処理後に受け取ったユーザーデータをローカルに保存しなければいけない（Reduxを使うかRecoilを使うか）
//TODO:またどの関数でデータを格納するかも考えないと（ここのファイルで格納するかfirestore.tsで格納するか）

export const useInitPage = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userAtom);
  useEffect(() => {
    isLogined(
      () => {
        router.replace("/userAction/login");
      },
      (id: string) => {
        getUserData(id).then((data: User) => {
          console.log("setUserData to recoil", data);
          setUser(data);
        });
        router.replace("/main/main");
      }
    );
  }, []);
};

export const useAccountFunc = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const router = useRouter();
  const setUserData = () => {
    const id = auth.currentUser?.uid;
    if (id) setUser(getUserData(id));
    else console.log("ログインしてません");
  };
  //ログイン
  const logIn = async (email: string, password: string) => {
    let userId: string | null = null;
    await AuthLogin(email, password)
      .then((userCredential) => {
        console.log("logined");
        userId = userCredential.user.uid;
      })
      .catch((error: AuthError) => {
        console.log(error.message);
        return error;
      });
    if (userId)
      await getUserData(userId)
        .then((data: User) => {
          setUser(data);
          router.replace("/main/main");
        })
        .catch((error: AuthError) => {
          console.log(error.message);
          AuthLogOut();
          return error;
        });
  };

  //新規登録
  const signUp = async (email: string, password: string) => {
    console.log("サインアップします");
    await AuthSignUp(email, password)
      .then((userCredential) => {
        console.log("signUped");
        let user = userCredential.user;
        createUserData(user.uid)
          .then(() => {
            console.log("created userData");
            setUser({ id: user.uid, history: [] });
            router.replace("/main/main");
          })
          .catch((error: AuthError) => {
            console.log(error.message);
            console.log("アカウントを削除します");
            if (user)
              AuthDelete(user)
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
  const logOut = (then: () => void) => {
    AuthLogOut()
      .then(() => {
        console.log("logouted");
        setUser({ id: "", history: [] });
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
