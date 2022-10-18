import { useRecoilState, useRecoilValue } from "recoil";
import { pushPageQrCodeReaderAtom } from "../database/atom";
import PushPage from "./PushPage";

const QRReaderPage = () => {
  const [isOpen, setIsOpen] = useRecoilState(pushPageQrCodeReaderAtom);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <PushPage isOpen={isOpen} onClose={onClose}>
      <div>QRCODEREADER</div>
    </PushPage>
  );
};

export default QRReaderPage;
