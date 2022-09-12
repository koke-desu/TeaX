//アプリでのログインや新規登録（authのログインとfirestoreのドキュメント作成など）などの処理をまとめたファイル

import { AuthError, User } from "firebase/auth";
import {
  AuthDelete,
  AuthLogin,
  AuthLogOut,
  AuthSignUp,
} from "./basicFunc/auth";
import { createUserData, getUserData } from "./basicFunc/firestore";
//TODO:処理後に受け取ったユーザーデータをローカルに保存しなければいけない（Reduxを使うかRecoilを使うか）
//TODO:またどの関数でデータを格納するかも考えないと（ここのファイルで格納するかfirestore.tsで格納するか）
//ログイン
export const logIn = async (
  email: string,
  password: string,
  then: () => void
) => {
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
      .then(() => {
        console.log("getted UserData");
        then();
      })
      .catch((error: AuthError) => {
        console.log(error.message);
        AuthLogOut();
        return error;
      });
};

//新規登録
export const signUp = async (
  email: string,
  password: string,
  then: () => void
) => {
  console.log("サインアップします");
  let user: User | null;
  await AuthSignUp(email, password)
    .then((userCredential) => {
      console.log("signUped");
      user = userCredential.user;
      createUserData(user.uid)
        .then(() => {
          console.log("created userData");
          then();
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
export const logOut = (then: () => void) => {
  AuthLogOut()
    .then(() => {
      console.log("logouted");
      then();
    })
    .catch((error: AuthError) => {
      console.log(error.message);
    });
};
