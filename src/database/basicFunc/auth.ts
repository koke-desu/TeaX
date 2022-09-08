//ユーザーのサインインやサインアウトなどの処理をまとめたファイル
//処理後にresultを返し、エラーやデータを返す。
import {
  createUserWithEmailAndPassword,
  AuthError,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { exit } from "process";
import { User } from "../../type/model";
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
type result = { err: AuthError | null; userData: User };
export const AuthSignUp = (email: string, password: string): result => {
  console.log("aiueo");
  let result: result = {
    err: null,
    userData: {
      id: "",
      history: [],
    },
  };
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      result.userData = {
        id: userCredential.user.uid,
        history: [],
      };
    })
    .catch((error: AuthError) => {
      result.err = error;
      console.log(result);
    });
  return result;
};
//ログイン
export const AuthLogin = (email: string, password: string): result => {
  let result: result = {
    err: null,
    userData: {
      id: "",
      history: [],
    },
  };
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      result.userData = {
        id: userCredential.user.uid,
        history: [],
      };
      return result;
    })
    .catch((error: AuthError) => {
      result.err = error;
      return result;
    });
  return result;
};
//ログアウト
export const AuthLogOut = () => {
  let result: AuthError | null = null;
  auth
    .signOut()
    .then(() => {
      return result;
    })
    .catch((error) => {
      result = error;
      return result;
    });
};
