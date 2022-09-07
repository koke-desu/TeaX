//ユーザーのサインインやサインアウトなどの処理をまとめたファイル
//処理後にresultを返し、エラーやデータを返す。
import {
  createUserWithEmailAndPassword,
  AuthError,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
export const signUp = (email: string, password: string) => {
  console.log("aiueo");
  let result: {
    err: AuthError | null;
    userData: User;
  } = {
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
      console.log(result);
      return result;
    })
    .catch((error: AuthError) => {
      result.err = error;
      console.log(result);
      return result;
    });
};
//ログイン
export const Login = (email: string, password: string) => {
  let result: {
    err: AuthError | null;
    userData: User;
  } = {
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
};
//ログアウト
export const logOut = () => {
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
