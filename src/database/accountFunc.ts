//アプリでのログインや新規登録（authのログインとfirestoreのドキュメント作成など）などの処理をまとめたファイル

import { AuthError } from "firebase/auth";
import { User } from "../type/model";
import { AuthLogin, AuthSignUp } from "./basicFunc/auth";
import { createUserData, getUserData } from "./basicFunc/firestore";
//TODO:処理後に受け取ったユーザーデータをローカルに保存しなければいけない（Reduxを使うかRecoilを使うか）
//TODO:またどの関数でデータを格納するかも考えないと（ここのファイルで格納するかfirestore.tsで格納するか）
//ログイン
export const logIn = (email: string, password: string, then: () => void) => {
  let result = AuthLogin(email, password);
  const interval = setInterval(() => {
    if (result.userData.id) {
      clearInterval(interval);
      if (result.err) {
        alert(result.err);
      } else {
        //TODO:ここにもsetIntervalをおかないとオブジェクトの中身が取得できない多分getUserDataでreturnしてるのが原因と思われなのでreturnしないでRecoilとかに保存するのがよさそう
        result.userData.id = getUserData(result.userData.id);
        console.log("logined", result);
        then();
      }
    }
  }, 100);
};

//新規登録
export const signUp = (email: string, password: string, then: () => void) => {
  console.log("サインアップします");
  let result: { userData: User; err: AuthError | null } = AuthSignUp(
    email,
    password
  );
  const interval = setInterval(() => {
    if (result.userData.id) {
      clearInterval(interval);
      if (result.err) {
        alert(result.err);
      } else {
        console.log("result is", result);
        createUserData(result.userData.id);
        console.log("signUped!!");
        then();
      }
    }
  }, 100);
};
//ログアウト
