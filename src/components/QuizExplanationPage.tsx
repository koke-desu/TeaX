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
  quizResult: QuizState;
};

const QuizExplanationPage: FC<Props> = ({ quizData, quizResult }) => {
  const setExplanationPageIsOpen = useSetRecoilState(
    pushPageQuixExplanationAtom
  );
  const setAnswerPageIsOpen = useSetRecoilState(pushPageQuizAtom);
  const quizFunc = useQuizFunc();
  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>正解は{quizData.answer}です！</h2>
      <div
        style={{ height: "30vh", aspectRatio: "1.4", backgroundColor: "gray" }}
      >
        <img src={quizData.explaneImgURL} width="100%" height="auto" />
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          height: "40vh",
          borderRadius: "12px",
          marginTop: "12px",
          padding: "24px",
          paddingBottom: "50px",
          position: "relative",
        }}
      >
        <p
          style={{
            overflowY: "scroll",
            height: "100%",
            paddingBottom: "40px",
          }}
        >
          {quizData.explane}
        </p>
        <div style={{ position: "absolute", bottom: "24px", right: "24px" }}>
          <SmallButton
            title="閉じる"
            onClick={() => {
              //   setAnswerPageIsOpen("");
              //   setExplanationPageIsOpen(false);
              quizFunc.afterFinishQuiz(quizData, quizResult);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizExplanationPage;
