/* eslint-disable react-hooks/rules-of-hooks */
//ユーザーのデータをfirestoreから取得したり変更したりする処理をまとめたファイル
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRecoilValue } from "recoil";
import {
  CouponState,
  OrderData,
  OrderMenu,
  User,
  QuizState,
  Quiz,
} from "../../type/model";
import { userAtom } from "../atom";
import { useAccountFunc } from "../authFunc";
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
export const fetchQuizzes = async () => {
  const docs = await getDocs(collection(db, "quizzes"));
  console.log("get quizzes from firestore", docs);
  let tmp: any[] = [];
  docs.forEach((doc) => {
    tmp.push(doc.data());
  });
  return tmp;
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
  console.log("ordered index is:", index);
  return updateDoc(doc(db, "keywords", `${index}`), {
    number: preNum + 1,
  });
};

//クーポンのステートを変更する関数
export const changeStateOfCoupon = (
  userId: string,
  couponStates: { [couponID: string]: CouponState }
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

export const useUserCoupon = (userData: User, couponId: string) => {
  const tmp = {
    ...userData.coupons,
  };
  tmp[couponId] = "used";
  return updateDoc(doc(db, "users", userData.id), {
    coupons: tmp,
  })
    .then(() => {
      fetchUserData(userData.id);
    })
    .catch((error) => {
      alert("クーポンを使用できませんでした。もう一度お試しください");
    });
};

//TODO:関数を試す
export const setUserCoupon = async (
  userId: string,
  couponId: string,
  result: QuizState,
  userData: User
): Promise<User> => {
  const tmp = { ...userData.coupons };
  tmp[couponId] = result === "cleared" ? "useable" : "unOwned";
  await updateDoc(doc(db, "users", userId), {
    coupons: tmp,
  });
  return fetchUserData(userId) as User;
};

export const setUserQuiz = async (
  userId: string,
  quizId: string,
  result: QuizState,
  userData: User
): Promise<User> => {
  const tmp = { ...userData.quizzes };
  tmp[quizId] = result;
  await updateDoc(doc(db, "users", userId), {
    quizzes: tmp,
  });
  return fetchUserData(userId) as User;
};

export const decreaseProduct = (docRef: string) => {
  getDoc(doc(db, docRef)).then((docData) => {
    const data = docData.data();
    if (data) {
      let remaining = data.remaining;
      let soldNum = data.soldNum;
      remaining -= 1;
      soldNum += 1;
      updateDoc(doc(db, docRef), {
        remaining: remaining,
        soldNum: soldNum,
      });
    }
  });
};

export const setAnalytics = async (orderData: OrderData) => {
  const docData = await getDoc(doc(db, "appAnalytics", "earnings"));
  const data = docData.data();
  if (data) {
    let tmpEarnMoney = data.totalEarnMoney;
    tmpEarnMoney = tmpEarnMoney + orderData.totalPrice;
    let tmpSoldedProducts: OrderMenu[] = [...data.soldedProducts];
    orderData.OrderMenus.forEach((menu) => {
      tmpSoldedProducts.push(menu);
    });
    setDoc(doc(db, "appAnalytics", "earnings"), {
      soldedProducts: tmpSoldedProducts,
      totalEarnMoney: tmpEarnMoney,
    });
  }
};
