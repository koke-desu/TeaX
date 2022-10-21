//クイズアプリで使用する関数をまとめたファイル

import { useRecoilState } from "recoil";
import {
  fetchQuizzes,
  setUserCoupon,
  setUserQuiz,
} from "./basicFunc/firestore";
import {
  achieveCouponModalAtom,
  couponsAtom,
  pushPageQuixExplanationAtom,
  pushPageQuizAtom,
  quizzesAtom,
  userAtom,
} from "./atom";
import { Quiz, QuizState } from "../type/model";

export const useQuizFunc = () => {
  const [quizzes, setQuizzes] = useRecoilState(quizzesAtom);
  const [userData, setUserData] = useRecoilState(userAtom);
  const [coupons, setCoupons] = useRecoilState(couponsAtom);
  const [answerPageIsOpen, setAnswerPageIsOpen] =
    useRecoilState(pushPageQuizAtom);
  const [explanationPageIsOpen, setExplanationPageIsOpen] = useRecoilState(
    pushPageQuixExplanationAtom
  );
  const [achieveCouponModal, setAchieveCouponModal] = useRecoilState(
    achieveCouponModalAtom
  );
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
  const afterFinishQuiz = (quizData: Quiz, result: QuizState) => {
    const tmp = { ...userData };
    const tmp2 = { ...tmp.quizzes };
    tmp2[quizData.id] = result;
    if (result === "cleared") {
      coupons.forEach((coupon) => {
        if (coupon.achieveType === quizData.id) {
          setUserCoupon(userData.id, coupon.id, result, userData).then(
            (tmpData) => {
              setUserQuiz(userData.id, quizData.id, result, tmpData).then(
                (data) => {
                  setUserData(data);
                }
              );
            }
          );
          setAchieveCouponModal(coupon.achieveType);
        }
        setAnswerPageIsOpen("");
        setExplanationPageIsOpen(false);
      });
    }
  };
  return {
    getQuizzes,
    getQuizByID,
    afterFinishQuiz,
  };
};
