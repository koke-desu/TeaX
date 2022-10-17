//ユーザーのサインインやサインアウトなどの処理をまとめたファイル
//処理後にresultを返し、エラーやデータを返す。
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  User,
} from "firebase/auth";
import { auth } from "../firebase";

//ログインしているかどうかを確かめる。
export const isLogined = (
  isntLogined: () => void,
  logined: (id: string) => void
) => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      console.log("isn't logined");
      isntLogined();
    } else {
      console.log("logined");
      logined(user.uid);
    }
  });
};

//新規登録
export const authSignUp = (email: string, password: string) => {
  console.log("create account at firebase auth");
  return createUserWithEmailAndPassword(auth, email, password);
};
//ログイン
export const authLogin = (email: string, password: string) => {
  console.log("logined at firebase auth");
  return signInWithEmailAndPassword(auth, email, password);
};
//ログアウト
export const authLogOut = () => {
  console.log("logout at firebase auth");
  return auth.signOut();
};

//ユーザーの削除（使わないかも）
export const authDelete = (user: User) => {
  return deleteUser(user);
};
