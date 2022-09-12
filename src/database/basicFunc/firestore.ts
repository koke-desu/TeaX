//ユーザーのデータをfirestoreから取得したり変更したりする処理をまとめたファイル
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { User } from "../../type/model";
import { db } from "../firebase";
//ユーザーのアカウント情報を取得
export const getUserData = (id: string): any => {
  console.log("getUserData()");
  return getDoc(doc(db, "users", `${id}`)).then((doc: any) => {
    return doc.data();
  });
};

//ユーザーのアカウント情報を初期状態で生成
export const createUserData = (id: string) => {
  console.log("createUserData()", id);
  return setDoc(doc(db, "users", `${id}`), {
    id: id,
  });
};

//ユーザーアカウント情報を更新
export const updateUserData = (userData: User) => {
  console.log("updateUserData()");
  return updateDoc(doc(db, "users", `${userData.id}`), userData);
};
