import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemsAtom, cartProductModalAtom } from "../database/atom";
import { useOrderFunc } from "../database/orderFunc";
import { OrderMenu } from "../type/model";
import ConfirmModal from "./ConfirmModal";
import CouponHalfModal from "./CouponHalfModal";
import Modal from "./Modal";

const CartProductsModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(cartProductModalAtom);
  const cartItems = useRecoilValue(cartItemsAtom);
  const orderFunc = useOrderFunc();
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [menuItem, setMenuItem] = useState<OrderMenu | null>(null);
  console.log("cartItems is:", cartItems);
  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <>
          <div>
            {cartItems.length ? (
              <div>
                <p>カートのアイテム一覧</p>
                {cartItems.map((item) => (
                  <>
                    <div
                      key={item.menuID}
                      style={{ border: "1px solid black", padding: "4px" }}
                    >
                      <p>{item.menuID}</p>
                      <button
                        onClick={() => {
                          setIsCouponModalOpen(true);
                          setMenuItem(item);
                        }}
                      >
                        クーポンを使用
                      </button>
                    </div>
                  </>
                ))}

                <div>
                  <button onClick={() => setIsConfirmOpen(true)}>
                    注文する
                  </button>
                </div>
              </div>
            ) : (
              <p>カートに商品がありません</p>
            )}
          </div>
        </>
      </Modal>
      <ConfirmModal
        title="よろしいでしょうか？"
        description="カートの中の商品を購入します"
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        onOk={() =>
          orderFunc.order(() => {
            setIsModalOpen(false);
          })
        }
      />
      <CouponHalfModal
        modalIsOpen={isCouponModalOpen}
        setModalIsOpen={setIsCouponModalOpen}
        orderMenu={menuItem}
      />
    </>
  );
};

export default CartProductsModal;
