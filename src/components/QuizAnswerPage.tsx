import { useState } from "react";
import { useRecoilValue } from "recoil";
import { pushPageQuizAtom, quizzesAtom } from "../database/atom";
import { useQuizFunc } from "../database/quizFunc";
import LargeButton from "../html&cssComps/LargeButton";
import PushPage from "./PushPage";

const QuizAnswerPage = () => {
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [selectingItem, setSelectingItem] = useState<number | null>(null);
  const quizId = useRecoilValue(pushPageQuizAtom);
  const quizFunc = useQuizFunc();
  const quizData = quizFunc.getQuizByID(quizId);
  return (
    <>
      <div>
        <h1>残り{3 - selectedItem.length}回</h1>
        {[1, 2, 3, 4].map((num) => (
          <div key={num}>
            {selectedItem.some((number) => number === num) ? (
              <div>osenai</div>
            ) : selectingItem === num ? (
              <button onClick={() => setSelectingItem(null)}>selected</button>
            ) : (
              <button
                onClick={() => {
                  setSelectingItem(num);
                }}
              >
                {num}
              </button>
            )}
          </div>
        ))}
        <div>
          {selectingItem && (
            <LargeButton
              title="回答する"
              onClick={() => {
                const tmp = [...selectedItem];
                tmp.push(selectingItem);
                setSelectedItem(tmp);
              }}
            />
          )}
        </div>
      </div>
      <PushPage
        isOpen={
          selectedItem.length >= 3 ||
          selectedItem.some((num) => num === quizData?.answer)
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
