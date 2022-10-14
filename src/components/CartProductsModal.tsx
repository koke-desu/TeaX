import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemsAtom, cartProductModalAtom } from "../database/atom";
import { useOrderFunc } from "../database/orderFunc";
import CouponHalfModal from "./CouponHalfModal";
import Modal from "./Modal";

const CartProductsModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(cartProductModalAtom);
  const cartItems = useRecoilValue(cartItemsAtom);
  const orderFunc = useOrderFunc();
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  console.log("cartItems is:", cartItems);
  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <>
        <div>
          <p>カートのアイテム一覧</p>
          {cartItems.map((item) => (
            <>
              <div
                key={item.menuID}
                style={{ border: "1px solid black", padding: "4px" }}
              >
                <p>{item.menuID}</p>
                <button onClick={() => setIsCouponModalOpen(true)}>
                  クーポンを使用
                </button>
              </div>
              <CouponHalfModal
                modalIsOpen={isCouponModalOpen}
                setModalIsOpen={setIsCouponModalOpen}
                orderMenu={item}
              />
            </>
          ))}
          <div>
            <button
              onClick={() => orderFunc.order(() => console.log("ordered"))}
            >
              注文する
            </button>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default CartProductsModal;
