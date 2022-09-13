//ユーザーのサインインやサインアウトなどの処理をまとめたファイル
//処理後にresultを返し、エラーやデータを返す。
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  User,
} from "firebase/auth";
// import { User } from "../../type/model";
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
export const AuthSignUp = (email: string, password: string) => {
  console.log("create account at firebase auth");
  return createUserWithEmailAndPassword(auth, email, password);
};
//ログイン
export const AuthLogin = (email: string, password: string) => {
  console.log("logined at firebase auth");
  return signInWithEmailAndPassword(auth, email, password);
};
//ログアウト
export const AuthLogOut = () => {
  console.log("logout at firebase auth");
  return auth.signOut();
};

//ユーザーの削除（使わないかも）
export const AuthDelete = (user: User) => {
  return deleteUser(user);
};
