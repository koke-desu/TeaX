import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { orderedDataAtom, orderingListModalAtom } from "../database/atom";
import { useOrderFunc } from "../database/orderFunc";
import LargeButton from "../html&cssComps/LargeButton";
import ConfirmModal from "./ConfirmModal";
import HalfModal from "./HalfModal";
import TweetModal from "./TweetModal";

const OrderingListModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(orderingListModalAtom);
  const [isTweetPageOpen, setIsTweetPageOpen] = useState(false);
  const orderedData = useRecoilValue(orderedDataAtom);
  const orderFunc = useOrderFunc();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <HalfModal title="" isOpen={isOpen} setIsOpen={setIsOpen}>
        {orderedData && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0 }}>
              {orderedData.isCompleted
                ? "注文の品が完成しました！"
                : "作成中の商品"}
            </p>
            <p style={{ margin: 0 }}>注文番号</p>
            <p style={{ margin: 0 }}>{orderedData.orderKeyword}</p>
            {orderedData.OrderMenus.map((orderMenu, index) => {
              const menuData = orderFunc.getMenuByID(orderMenu.menuID);
              return (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "gray",
                    }}
                  ></div>
                  <p>{menuData?.name}</p>
                </div>
              );
            })}
            <div style={{ display: "flex" }}>
              <p>合計</p>
              <p>￥{orderedData.totalPrice}</p>
              {orderedData.isCompleted && (
                <LargeButton
                  title="受け取り完了"
                  onClick={() => setIsConfirmOpen(true)}
                />
              )}
            </div>
          </div>
        )}
      </HalfModal>
      <ConfirmModal
        title="よろしいでしょうか？"
        description="商品の料金をお支払いしたことを確認してください"
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        onOk={() =>
          orderFunc.completeOrder(() => {
            setIsOpen(false);
            setIsTweetPageOpen(true);
          })
        }
      />
      <TweetModal isOpen={isTweetPageOpen} setIsOpen={setIsTweetPageOpen} />
    </>
  );
};

export default OrderingListModal;
