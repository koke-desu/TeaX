//ユーザーのデータをfirestoreから取得したり変更したりする処理をまとめたファイル
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { User } from "../../type/model";
import { db } from "../firebase";
//ユーザーのアカウント情報を取得
export const getUserData = (id: string): any => {
  console.log("getUserData()");
  onSnapshot(doc(db, "users", `${id}`), (doc: any) => {
    console.log("data is", doc.data().id);
    return doc.data();
  });
};

//ユーザーのアカウント情報を初期状態で生成
export const createUserData = (id: string) => {
  console.log("createUserData()", id);
  setDoc(doc(db, "users", `${id}`), {
    id: id,
  });
};

//ユーザーアカウント情報を更新
export const updateUserData = (userData: User) => {
  console.log("updateUserData()");
  updateDoc(doc(db, "users", `${userData.id}`), userData);
};
