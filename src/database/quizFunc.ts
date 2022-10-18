//クイズアプリで使用する関数をまとめたファイル

import { useRecoilState } from "recoil";
import { fetchQuizzes, setUserCoupon } from "./basicFunc/firestore";
import { couponsAtom, quizzesAtom, userAtom } from "./atom";
import { Quiz, quizState } from "../type/model";

export const useQuizFunc = () => {
  const [quizzes, setQuizzes] = useRecoilState(quizzesAtom);
  const [userData, setUserData] = useRecoilState(userAtom);
  const [coupons, setCoupons] = useRecoilState(couponsAtom);
  const getQuizzes = () => {
    const tmp = fetchQuizzes();
    tmp.then((data) => {
      //TODO:ここ無理やりCoupon型にしているので改善したい
      console.log("setQuizzesData to recoil", data);
      const tmp = [...data];
      setQuizzes(tmp);
    });
  };

  //IDからクイズデータを取得する関数
  const getQuizByID = (menuId: string) => {
    const tmp = quizzes.find((data) => data.id === menuId);
    return tmp;
  };

  //クイズ回答後の処理
  const afterFinishQuiz = (quizData: Quiz, result: quizState) => {
    const tmp = { ...userData };
    const tmp2 = { ...tmp.quizzes };
    tmp2[quizData.id] = result;
    if (result === "cleared") {
      coupons.forEach((coupon) => {
        if (coupon.achieveType === quizData.id) {
          setUserCoupon(userData.id, coupon.achieveType);
        } else {
          if (quizzes.length === Object.values(tmp2).length) {
            setUserCoupon(userData.id, quizData.id);
          }
        }
      });
    }
  };
  return {
    getQuizzes,
    getQuizByID,
  };
};
