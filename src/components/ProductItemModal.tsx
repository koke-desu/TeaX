/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { couponsAtom, orderedDataAtom, toppingsAtom } from "../database/atom";
import { useOrderFunc } from "../database/orderFunc";
import LargeButton from "../html&cssComps/LargeButton";
import { Menu, OrderMenu } from "../type/model";
import CouponHalfModal from "./CouponHalfModal";
import Modal from "./Modal";

type Props = {
  menu: Menu;
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
};

const ProductItemModal: FC<Props> = ({ menu, isOpen, setIsOpen }) => {
  const orderFunc = useOrderFunc();
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [orderMenu, setOrderMenu] = useState<OrderMenu>({
    toppings: [],
    menuPrice: menu.price,
    couponID: null,
    menuID: menu.id,
  });
  const toppings = useRecoilValue(toppingsAtom);
  const orderData = useRecoilValue(orderedDataAtom);
  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => {
          setOrderMenu({
            toppings: [],
            menuPrice: menu.price,
            couponID: null,
            menuID: menu.id,
          });
          orderFunc.resetUseCoupon(orderMenu);
          setIsOpen(false);
        }}
      >
        {menu && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                width: "100px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={menu.imageUrl}
                alt="menuImg"
                width="auto"
                height="100px"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0 }}>{menu.name}</p>
              <p style={{ margin: 0 }}>{menu.description}</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <p>トッピング</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginLeft: "10%",
                }}
              >
                {toppings.map((topping) => (
                  <button
                    style={{
                      width: "80px",
                      height: "100px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "4px",
                      padding: 0,
                      position: "relative",
                    }}
                    key={topping.id}
                    onClick={() => {
                      let tmp = { ...orderMenu };
                      if (
                        orderMenu.toppings.some((data) => data === topping.id)
                      ) {
                        tmp.toppings = tmp.toppings.filter(
                          (data) => data !== topping.id
                        );
                        tmp.menuPrice -= topping.price;
                      } else {
                        tmp.toppings.push(topping.id);
                        tmp.menuPrice = tmp.menuPrice + topping.price;
                      }
                      setOrderMenu(tmp);
                    }}
                  >
                    {orderMenu.toppings.some((data) => data === topping.id) && (
                      <div
                        style={{
                          backgroundColor: "rgba(0,0,0,0.6)",
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <p style={{ color: "white" }}>check</p>
                      </div>
                    )}
                    <div
                      style={{
                        border: "1px solid black",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={menu.imageUrl}
                        alt="menuImg"
                        width="auto"
                        height="40px"
                      />
                    </div>
                    <p style={{ fontSize: "8px", margin: 0 }}>{topping.name}</p>
                    <p>{topping.price}</p>
                  </button>
                ))}
              </div>
              <div>
                <h1>単品￥{orderMenu.menuPrice}</h1>
              </div>
              {!orderData ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {orderMenu.couponID ? (
                    <div>
                      {orderFunc.getCouponByID(orderMenu.couponID)?.title}
                    </div>
                  ) : (
                    <button onClick={() => setIsCouponModalOpen(true)}>
                      クーポンを追加
                    </button>
                  )}
                  <LargeButton
                    title="カートに追加"
                    onClick={() => {
                      orderFunc.setOrderMenuToCart(orderMenu);
                      setOrderMenu({
                        toppings: [],
                        menuPrice: menu.price,
                        couponID: null,
                        menuID: menu.id,
                      });
                      setIsOpen(false);
                    }}
                  />
                </div>
              ) : (
                <p>注文中の商品の受け取り完了をしてから注文してください</p>
              )}
            </div>
          </div>
        )}
      </Modal>
      <CouponHalfModal
        modalIsOpen={isCouponModalOpen}
        setModalIsOpen={setIsCouponModalOpen}
        orderMenu={orderMenu}
        setOrderMenu={setOrderMenu}
      />
    </>
  );
};

export default ProductItemModal;
