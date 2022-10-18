import { useRecoilState } from "recoil";
import { pushPageQuizAtom } from "../database/atom";
import PushPage from "./PushPage";

const QuizPage = () => {
  const [isOpen, setIsOpen] = useRecoilState(pushPageQuizAtom);
  const onClose = () => {
    setIsOpen("");
  };
  return (
    <PushPage isOpen={isOpen === "" ? false : true} onClose={onClose}>
      <div>EADER</div>
    </PushPage>
  );
};

export default QuizPage;
