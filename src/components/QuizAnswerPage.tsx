import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  pushPageQuixExplanationAtom,
  pushPageQuizAtom,
} from "../database/atom";
import { useQuizFunc } from "../database/quizFunc";
import LargeButton from "../html&cssComps/LargeButton";
import PushPage from "./PushPage";
import { css } from "@emotion/css";
import { useRouter } from "next/router";
import QuizExplanationPage from "./QuizExplanationPage";
import { QuizState } from "../type/model";

const QuizAnswerPage = () => {
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [focusedItem, setFocusedItem] = useState<number | null>(null);
  const quizId = useRecoilValue(pushPageQuizAtom);
  const quizFunc = useQuizFunc();
  const quizData = quizFunc.getQuizByID(quizId);
  const [isExplanePageOpen, setIsExplanePageOpen] = useRecoilState(
    pushPageQuixExplanationAtom
  );
  const [quizResult, setQuizResult] = useState<QuizState>("notCleared");

  return (
    <>
      <div className={style.container}>
        {quizData ? (
          <>
            <div className={style.title}>
              <h2>問題</h2>
              <p className={style.text}>問題文は紙にあります</p>
              <p className={style.text}>答えだと思うものを選択してください！</p>
            </div>
            <div className={style.choices_list}>
              {[1, 2, 3, 4].map((num) => {
                return (
                  <div
                    key={`quiz-choices-${num}`}
                    className={style.choiceContainer}
                  >
                    <button
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
                  </div>
                );
              })}
            </div>
            <div className={style.footer}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p className={style.text}>残り回答可能回数</p>
                <p className={style.description}>{3 - selectedItem.length}回</p>
              </div>
              {focusedItem && (
                <LargeButton
                  title="回答する"
                  onClick={() => {
                    console.log(selectedItem.length);
                    if (selectedItem.length >= 2) {
                      setQuizResult("failed");
                      setIsExplanePageOpen(true);
                    }
                    if (focusedItem === quizData.answer) {
                      setQuizResult("cleared");
                      setIsExplanePageOpen(true);
                    }
                    setSelectedItem([...selectedItem, focusedItem]);
                    setFocusedItem(null);
                  }}
                />
              )}
            </div>
            <PushPage isOpen={isExplanePageOpen} onClose={() => {}}>
              <QuizExplanationPage
                quizData={quizData}
                quizResult={quizResult}
              />
            </PushPage>
          </>
        ) : (
          <div>
            <h2>クイズデータを正しく読み込めませんでした。</h2>
            <p>画面を戻って再度QRコードを読み取ってください</p>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizAnswerPage;

const style = {
  title: css`
    text-align: center;
  `,
  text: css`
    margin: 0;
    font-weight: bold;
  `,
  footer: css`
    display: flex;
    /* margin-top: 64px; */
    width: 100%;
    justify-content: space-between;
    align-items: center;
  `,
  container: css`
    padding: 16px;
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: black;
  `,

  description: css`
    font-size: 20px;
    margin: 0;
  `,

  choices_list: css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 32px;
    width: 100%;
  `,

  choiceContainer: css`
    width: 50%;
    aspect-ratio: 1.4;
    padding: 8px;
  `,

  choice: ({
    focused,
    selected,
  }: {
    focused: boolean;
    selected: boolean;
  }) => css`
    transition: all 0.3s ease-in-out;

    width: 100%;
    height: 100%;
    padding: 16px;
    font-size: 20px;
    font-weight: bold;
    background-color: ${selected ? "gray" : focused ? "#87ce41" : "white"};
    border: 1px solid ${focused ? "#87ce41" : "gray"};
    border-radius: 8px;
    color: black;
  `,
};
