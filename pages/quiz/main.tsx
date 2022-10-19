/* eslint-disable react-hooks/rules-of-hooks */
import { css } from "@emotion/css";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Modal from "../../src/components/Modal";
import QuizExplanationPage from "../../src/components/QuizExplanationPage";
import QuizHintModal from "../../src/components/QuizHintModal";
import {
  pushPageQrCodeReaderAtom,
  pushPageQuixExplanationAtom,
  quizzesAtom,
  userAtom,
} from "../../src/database/atom";
import { useInitPage } from "../../src/hooks/initAppHooks";
import { Quiz, QuizState } from "../../src/type/model";

const Main = () => {
  useInitPage();
  const quizzes = useRecoilValue(quizzesAtom);
  const setIsQrPageOpen = useSetRecoilState(pushPageQrCodeReaderAtom);
  const [isExplanationOpen, setIsExplanationOpen] = useState<Quiz | null>(null);
  const user = useRecoilValue(userAtom);
  const [hint, setHint] = useState<string>("");
  console.log(user);

  return (
    <>
      <div className={style.container}>
        <button
          className={style.qrButton}
          onClick={() => {
            setIsQrPageOpen(true);
          }}
        >
          <img
            src="/qrIcon.svg"
            alt=""
            width={60}
            height={60}
            className={style.qrIcon}
          />
          <p className={style.qrDescription}>QRコードを撮影</p>
        </button>
        <div className={style.quizList}>
          {quizzes.map((quiz) => {
            let quizState: QuizState | undefined = user.quizzes?.[quiz.id];

            return (
              <div
                key={`quiz-icon-${quiz.id}`}
                className={style.quizIconContainer}
              >
                <a
                  className={style.quizIcon}
                  onClick={() => {
                    if (user.quizzes[quiz.id] === "cleared") {
                      setIsExplanationOpen(quiz);
                    } else setHint(quiz.tips);
                  }}
                >
                  {quizState === "cleared" ? (
                    <img src="/quizCheckIcon.png" width={42} height={42} />
                  ) : (
                    <img src="/unFound.png" width={40} height={50} />
                  )}
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <QuizHintModal isOpen={hint} setIsOpen={setHint} />
      <Modal
        isOpen={isExplanationOpen ? true : false}
        setIsOpen={(isOpen: boolean) => {
          if (!isOpen) {
            setIsExplanationOpen(null);
          }
        }}
        title=""
      >
        {isExplanationOpen && (
          <QuizExplanationPage quizData={isExplanationOpen} quizResult={null} />
        )}
      </Modal>
    </>
  );
};

export default Main;

const style = {
  container: css`
    padding-top: 16px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  `,
  qrButton: css`
    width: 90%;
    height: 30%;
    background-color: #d9d9d9;
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none;
  `,
  qrIcon: css`
    margin-top: 12px;
  `,
  qrDescription: css`
    margin: 8px;
  `,
  quizList: css`
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  `,
  quizIconContainer: css`
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  quizIcon: css`
    width: 72px;
    overflow: hidden;
    background-color: white;
    aspect-ratio: 1;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
