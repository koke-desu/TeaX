/* eslint-disable @next/next/no-img-element */
import { css } from "@emotion/css";
import { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { couponsAtom, orderedDataAtom, toppingsAtom } from "../database/atom";
import { useOrderFunc } from "../database/orderFunc";
import CouponIcon from "../html&cssComps/CouponIcon";
import LargeButton from "../html&cssComps/LargeButton";
import ToppingCard from "../html&cssComps/ToppingCard";
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

  const reCalcPrice = () => {
    let val = menu.price;
    orderMenu.toppings.forEach((id) => {
      const topping = toppings.find((v) => v.id === id);
      if (topping) {
        val += topping.price;
      }
    });

    return val;
  };

  return (
    <>
      <Modal
        title=""
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
                width: "60%",
                aspectRatio: "1",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={menu.imageUrl} alt="menuImg" width="100%" height="auto" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <h1 style={{ margin: 0 }}>{menu.name}</h1>
              <p
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  color: "#868686",
                  padding: "12px 12px",
                }}
              >
                {menu.description}
              </p>

              <h2
                style={{
                  margin: 0,
                  textAlign: "start",
                  marginTop: "4px",
                  marginBottom: "4px",
                  marginRight: "4%",
                  marginLeft: "4%",
                }}
              >
                トッピング
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  padding: "8px",
                }}
              >
                {toppings.map((topping) => (
                  <div key={topping.id} style={{ width: "30%" }}>
                    <ToppingCard
                      name={topping.name}
                      price={topping.price}
                      imageUrl={topping.imageUrl}
                      onClick={() => {
                        let tmp = { ...orderMenu };
                        if (orderMenu.toppings.some((data) => data === topping.id)) {
                          tmp.toppings = tmp.toppings.filter((data) => data !== topping.id);
                          tmp.menuPrice -= topping.price;
                        } else {
                          tmp.toppings.push(topping.id);
                          tmp.menuPrice = tmp.menuPrice + topping.price;
                        }
                        setOrderMenu(tmp);
                      }}
                      isSelected={orderMenu.toppings.some((data) => data === topping.id)}
                    />
                  </div>
                ))}
              </div>
              <div>
                <h1>単品￥{orderMenu.menuPrice}</h1>
              </div>
              {!orderData ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {/* {orderMenu.couponID ? (
                    <div>
                      {orderFunc.getCouponByID(orderMenu.couponID)?.title}
                    </div>
                  ) : ( */}
                  {/* // <button onClick={() => setIsCouponModalOpen(true)}>
                    //   クーポンを追加
                    // </button> */}
                  <CouponIcon
                    isCouponUsed={orderMenu.couponID ? false : true}
                    onClick={() => {
                      if (orderMenu.couponID) {
                        const tmp = { ...orderMenu };
                        tmp.menuPrice = reCalcPrice();
                        if (tmp.couponID) orderFunc.regetCoupon(tmp.couponID);
                        tmp.couponID = null;
                        setOrderMenu(tmp);
                      } else {
                        setIsCouponModalOpen(true);
                      }
                    }}
                  />

                  {/* )} */}
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
