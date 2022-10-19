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
      <HalfModal
        title={
          orderedData?.isCompleted ? "注文の品が完成しました！" : "作成中の商品"
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {orderedData && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <p
                style={{
                  margin: 0,
                  color: "#005B7A",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                注文番号
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#005B7A",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {orderedData.orderKeyword}
              </p>
            </div>
            {orderedData.OrderMenus.map((orderMenu, index) => {
              const menuData = orderFunc.getMenuByID(orderMenu.menuID);
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "8px",
                    gap: "24px",
                    width: "100%",
                  }}
                >
                  <img src={menuData?.imageUrl} width="52px" />
                  <p>{menuData?.name}</p>
                </div>
              );
            })}
            <div
              style={{
                display: "flex",
                borderTop: "solid 1px #e9e9e9",
                width: "100%",
                justifyContent: "space-between",
                paddingTop: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <p style={{ fontWeight: "bold" }}>合計</p>
                <p style={{ fontWeight: "bold" }}>￥{orderedData.totalPrice}</p>
              </div>
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
