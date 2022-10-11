import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { couponListModalAtom } from "../database/atom";
import HalfModal from "./HalfModal";

const CouponHalfModal = () => {
  const [modalIsOpen, setModalIsOpen] = useRecoilState(couponListModalAtom);
  console.log(modalIsOpen);
  const router = useRouter();

  return (
    <HalfModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>クーポン一覧</p>
        {new Array(4).fill(0).map((zero, index) => (
          <div
            key={index}
            style={{
              width: "80%",
              height: "50px",
              border: "1px solid black",
              margin: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <p>使用済み</p>
            <Link href="/quiz/main">
              <a>スタンプラリーへ</a>
            </Link>
            <button>クーポンを使う</button>
          </div>
        ))}
      </div>
    </HalfModal>
  );
};

export default CouponHalfModal;
