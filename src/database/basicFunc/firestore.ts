//ユーザーのデータをfirestoreから取得したり変更したりする処理をまとめたファイル
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { couponState, OrderData, User } from "../../type/model";
import { db } from "../firebase";
//ユーザーのアカウント情報を取得
export const fetchUserData = (id: string): any => {
  return getDoc(doc(db, "users", id)).then((doc: any) => {
    console.log("getUserData from firestore", doc.data());
    return doc.data();
  });
};

//TODO:関数を試す
export const fetchToppings = async () => {
  const docs = await getDocs(collection(db, "toppings"));
  console.log("getCoupons from firestore");
  let tmp: any[] = [];
  docs.forEach((doc) => {
    tmp.push(doc.data());
  });
  return tmp;
};

//TODO:関数を試す
export const fetchQuizzes = () => {
  return getDocs(collection(db, "quizzes")).then((docs: any) => {
    console.log("get quizzes from firestore", docs.data());
    return docs.data();
  });
};

//TODO:関数を試す
export const fetchMenus = async () => {
  const docs = await getDocs(collection(db, "menus"));
  console.log("getMenus from firestore");
  let tmp: any[] = [];
  docs.forEach((doc) => {
    tmp.push(doc.data());
  });
  return tmp;
};

//TODO:関数を試す
export const fetchCoupons = async () => {
  const docs = await getDocs(collection(db, "coupons"));
  console.log("getCoupons from firestore");
  let tmp: any[] = [];
  docs.forEach((doc) => {
    tmp.push(doc.data());
  });
  return tmp;
};

//TODO:関数を試す
export const setOrder = (userId: string, orderData: OrderData) => {
  return setDoc(doc(db, "orders", userId), orderData);
};

//TODO:関数を試す
export const deleteOrder = (userId: string) => {
  return deleteDoc(doc(db, "orders", userId));
};

//TODO:関数を試す
//キーワードの種類数を取得するランダム数の範囲を指定する用（アプリの起動時に取得する感じ）
export const fetchKeywordLength = () => {
  return getDocs(collection(db, "keywords"));
};

//キーワードを取得する
//TODO:関数を試す
export const fetchKeyword = (index: number) => {
  return getDoc(doc(db, "keywords", `${index}`));
};

//キーワードの後半の番号を1つ増やす
//TODO:関数を試す
export const addKeywordNum = (index: number, preNum: number) => {
  return updateDoc(doc(db, "keywords", `${index}`), {
    number: preNum + 1,
  });
};

//クーポンのステートを変更する関数
export const changeStateOfCoupon = (
  userId: string,
  couponStates: { [couponID: string]: couponState }
) => {
  return updateDoc(doc(db, "users", userId), {
    coupons: couponStates,
  });
};

//ユーザーのアカウント情報を初期状態で生成
export const createUserData = (id: string) => {
  console.log("createUserData at firestore", id);
  return setDoc(doc(db, "users", id), {
    id: id,
  });
};

//ユーザーアカウント情報を更新
export const updateUserData = (userData: User) => {
  console.log("updateUserData at firestore");
  return updateDoc(doc(db, "users", userData.id), userData);
};

export const snapOrderState = async (
  userId: string,
  then: (orderData: OrderData) => void
): Promise<DocumentData> => {
  return onSnapshot(doc(db, "orders", userId), (doc) => {
    const orderData = doc.data();
    if (orderData) {
      console.log("get orderState from firestore", orderData);
      then(orderData as OrderData);
    }
  });
};
