/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteIndex, SetSelectedDeleteIndex] = useState(-1);
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
                {cartItems.map((item, index) => {
                  const menuData = orderFunc.getMenuByID(item.menuID);
                  return (
                    <div
                      key={item.menuID}
                      style={{ border: "1px solid black", padding: "4px" }}
                    >
                      <div
                        style={{
                          border: "1px solid black",
                          width: "64px",
                          height: "64px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={menuData?.imageUrl}
                          alt="menuImg"
                          width="auto"
                          height="100%"
                        />
                      </div>
                      <p>{item.menuID}</p>
                      <button
                        onClick={() => {
                          SetSelectedDeleteIndex(index);
                          setIsDeleteModalOpen(true);
                          // orderFunc.deleteCartItem(index);
                        }}
                      >
                        <img src="/Trash.png" />
                      </button>
                    </div>
                  );
                })}

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
        description="カート内の商品を削除します"
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        onOk={() => orderFunc.deleteCartItem(selectedDeleteIndex)}
      />
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
