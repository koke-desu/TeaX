/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemsAtom, cartProductModalAtom } from "../database/atom";
import { useOrderFunc } from "../database/orderFunc";
import LargeButton from "../html&cssComps/LargeButton";
import SmallButton from "../html&cssComps/SmallButton";
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
  const totalPrice = () => {
    let tmp = 0;
    cartItems.forEach((item) => {
      tmp += item.menuPrice;
    });
    return tmp;
  };
  console.log("cartItems is:", cartItems);
  return (
    <>
      <Modal title="" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <>
          <div>
            <h2 style={{ margin: 0 }}>合計 ￥{totalPrice()}</h2>
            {cartItems.length ? (
              <div>
                {cartItems.map((item, index) => {
                  const cartItem = orderFunc.getMenuByID(item.menuID);
                  return (
                    <div
                      key={index}
                      style={{
                        borderBottom: "1px solid #e9e9e9",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "8px",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "0 12px",
                          gap: "8px",
                          width: "100%",
                        }}
                      >
                        <img
                          src={cartItem?.imageUrl}
                          width="40px"
                          height="auto"
                        />
                        <div
                          style={{
                            width: "100%",
                            paddingRight: "8px",
                            paddingLeft: "4px",
                          }}
                        >
                          <h3 style={{ margin: 0 }}>{cartItem?.name}</h3>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                            }}
                          >
                            {item.toppings.map((topping) => {
                              const toppingData =
                                orderFunc.getToppingsByID(topping);
                              return (
                                <p
                                  style={{
                                    margin: 0,
                                    color: "#919191",
                                    fontSize: "12px",
                                  }}
                                  key={topping}
                                >
                                  {toppingData?.name}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <a
                        onClick={() => {
                          SetSelectedDeleteIndex(index);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <img src="/Trash.png" />
                      </a>
                    </div>
                  );
                })}

                <div
                  style={{
                    padding: "12px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <LargeButton
                    onClick={() => setIsConfirmOpen(true)}
                    title="注文する"
                  />
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
