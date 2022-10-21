import { FC } from "react";
import { useSetRecoilState } from "recoil";
import {
  pushPageQuixExplanationAtom,
  pushPageQuizAtom,
} from "../database/atom";
import { useQuizFunc } from "../database/quizFunc";
import SmallButton from "../html&cssComps/SmallButton";
import { Quiz, QuizState } from "../type/model";

type Props = {
  quizData: Quiz;
  quizResult: QuizState | null;
};

const QuizExplanationPage: FC<Props> = ({ quizData, quizResult }) => {
  const quizFunc = useQuizFunc();
  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "scroll",
      }}
    >
      <h2>
        {quizResult
          ? "解説"
          : quizResult === "cleared"
          ? "正解です！"
          : `正解は${quizData.answer}です！`}
      </h2>
      <div
        style={{ height: "30vh", aspectRatio: "1.4", backgroundColor: "gray" }}
      >
        <img src={quizData.explaneImgURL} width="100%" height="auto" />
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "24px",
          position: "relative",
        }}
      >
        <p>{quizData.explane}</p>
        {quizResult && (
          <div style={{ position: "absolute", bottom: "24px", right: "24px" }}>
            <SmallButton
              title="閉じる"
              onClick={() => {
                quizFunc.afterFinishQuiz(quizData, quizResult);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizExplanationPage;
