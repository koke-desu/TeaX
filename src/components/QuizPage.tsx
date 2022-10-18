import { useState } from "react";
import { useRecoilState } from "recoil";
import { pushPageQuizAtom } from "../database/atom";
import ConfirmModal from "./ConfirmModal";
import PushPage from "./PushPage";
import QuizAnswerPage from "./QuizAnswerPage";

const QuizPage = () => {
  const [isOpen, setIsOpen] = useRecoilState(pushPageQuizAtom);
  const [isCofirmOpen, setIsConfirmOpen] = useState(false);
  const onClose = () => {
    setIsOpen("");
  };

  return (
    <>
      <ConfirmModal
        isOpen={isCofirmOpen}
        setIsOpen={setIsConfirmOpen}
        title="本当によろしいですか？"
        description="問題の回答はリセットされます。"
        onOk={onClose}
      />
      <PushPage
        isOpen={isOpen === "" ? false : true}
        onClose={() => setIsConfirmOpen(true)}
      >
        <QuizAnswerPage />
      </PushPage>
    </>
  );
};

export default QuizPage;
