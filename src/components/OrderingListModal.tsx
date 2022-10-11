import { useRecoilState } from "recoil";
import { orderedDataAtom, orderingListModalAtom } from "../database/atom";
import HalfModal from "./HalfModal";

const OrderingListModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(orderingListModalAtom);
  return (
    <HalfModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p style={{ margin: 0 }}>作成中の商品</p>
        <p style={{ margin: 0 }}>注文番号</p>
        <p style={{ margin: 0 }}>823859732180</p>
        {new Array(5).fill(0).map((zero, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{ width: "20px", height: "20px", backgroundColor: "gray" }}
            ></div>
            <p>ピーチティー</p>
          </div>
        ))}
        <div style={{ display: "flex" }}>
          <p>合計</p>
          <p>￥1200</p>
          <button>受け取り完了</button>
        </div>
      </div>
    </HalfModal>
  );
};

export default OrderingListModal;
