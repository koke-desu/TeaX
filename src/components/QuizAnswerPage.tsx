import { useState } from "react";
import { useRecoilValue } from "recoil";
import { pushPageQuizAtom } from "../database/atom";
import { useQuizFunc } from "../database/quizFunc";
import LargeButton from "../html&cssComps/LargeButton";
import PushPage from "./PushPage";
import { css } from "@emotion/css";
import { useRouter } from "next/router";

const QuizAnswerPage = () => {
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [focusedItem, setFocusedItem] = useState<number | null>(null);
  const quizId = useRecoilValue(pushPageQuizAtom);
  const quizFunc = useQuizFunc();
  const quizData = quizFunc.getQuizByID(quizId);

  const router = useRouter();

  return (
    <>
      <div className={style.container}>
        <p className={style.description}>残り回答可能回数：{3 - selectedItem.length}回</p>
        <div className={style.choices_list}>
          {[1, 2, 3, 4].map((num) => (
            <button
              key={`quiz-choices-${num}`}
              className={style.choice({
                selected: selectedItem.includes(num),
                focused: focusedItem === num,
              })}
              onClick={() => {
                if (!selectedItem.includes(num)) setFocusedItem(num);
              }}
            >
              {num}
            </button>
          ))}
        </div>
        <div className={style.submit}>
          {focusedItem && (
            <LargeButton
              title="回答する"
              onClick={() => {
                if (focusedItem === quizData?.answer) {
                  router.push("quiz/explain");
                }
                setSelectedItem([...selectedItem, focusedItem]);
              }}
            />
          )}
        </div>
      </div>
      <PushPage
        isOpen={
          selectedItem.length >= 3 || selectedItem.some((num) => num === quizData?.answer)
            ? true
            : false
        }
        onClose={() => {}}
      >
        <div>aiueo</div>
      </PushPage>
    </>
  );
};

export default QuizAnswerPage;

const style = {
  container: css`
    padding: 16px;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  description: css`
    font-size: 20px;
  `,

  choices_list: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: 32px;
    width: 100%;
  `,

  choice: ({ focused, selected }: { focused: boolean; selected: boolean }) => css`
    width: 80%;
    padding: 16px;
    font-size: 20px;
    font-weight: bold;
    background-color: ${selected ? "gray" : focused ? "green" : "white"};
    border: 1px solid ${focused ? "green" : "gray"};
    border-radius: 8px;
  `,

  submit: css`
    margin-top: 64px;
  `,
};
