//ユーザーのサインインやサインアウトなどの処理をまとめたファイル
//処理後にresultを返し、エラーやデータを返す。
import {
  createUserWithEmailAndPassword,
  AuthError,
  signInWithEmailAndPassword,
  deleteUser,
  User,
} from "firebase/auth";
// import { User } from "../../type/model";
import { auth } from "../firebase";

//ログインしているかどうかを確かめる。
export const isLogined = (logined: () => void, isntLogined: () => void) => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      console.log("isn't logined");
      logined();
    } else {
      console.log("logined");
      isntLogined();
    }
  });
};

//新規登録
export const AuthSignUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
//ログイン
export const AuthLogin = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
//ログアウト
export const AuthLogOut = () => {
  return auth.signOut();
};

//ユーザーの削除（使わないかも）
export const AuthDelete = (user: User) => {
  return deleteUser(user);
};
