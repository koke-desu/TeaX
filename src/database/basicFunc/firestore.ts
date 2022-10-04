//ユーザーのデータをfirestoreから取得したり変更したりする処理をまとめたファイル
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Coupons, couponState, User } from "../../type/model";
import { db } from "../firebase";
//ユーザーのアカウント情報を取得
export const fetchUserData = (id: string): any => {
  return getDoc(doc(db, "users", `${id}`)).then((doc: any) => {
    console.log("getUserData from firestore", doc.data());
    return doc.data();
  });
};

//TODO:関数を試す
export const fetchToppings = () => {
  return getDocs(collection(db, "toppings")).then((docs: any) => {
    console.log("getToppings from firestore", docs.data());
    return docs.data();
  });
};

//TODO:関数を試す
export const fetchQuizzes = () => {
  return getDocs(collection(db, "quizzes")).then((docs: any) => {
    console.log("get quizzes from firestore", docs.data());
    return docs.data();
  });
};

//TODO:関数を試す
export const fetchMenus = () => {
  return getDocs(collection(db, "menus")).then((docs: any) => {
    console.log("getMenus from firestore");
    return docs.docs();
  });
};

//クーポンのステートを変更する関数
export const changeStateOfCoupon = (userId: string, couponData: Coupons) => {
  return updateDoc(doc(db, "users", `${userId}`), {
    coupons: couponData,
  });
};

//ユーザーのアカウント情報を初期状態で生成
export const createUserData = (id: string) => {
  console.log("createUserData at firestore", id);
  return setDoc(doc(db, "users", `${id}`), {
    id: id,
  });
};

//ユーザーアカウント情報を更新
export const updateUserData = (userData: User) => {
  console.log("updateUserData at firestore");
  return updateDoc(doc(db, "users", `${userData.id}`), userData);
};
