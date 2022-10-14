import { FC, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { couponsAtom } from "../database/atom";
import { useOrderFunc } from "../database/orderFunc";
import { Menu, OrderMenu } from "../type/model";
import CouponHalfModal from "./CouponHalfModal";
import Modal from "./Modal";

type Props = {
  menu: Menu;
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
};

const ProductItemModal: FC<Props> = ({ menu, isOpen, setIsOpen }) => {
  console.log("menu is:", menu);
  const orderFunc = useOrderFunc();
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [orderMenu, setOrderMenu] = useState<OrderMenu>({
    toppings: [],
    menuPrice: menu.price,
    couponID: null,
    menuID: menu.id,
  });
  const coupons = useRecoilValue(couponsAtom);
  console.log("couponId is", orderMenu.couponID);

  // const setIsCouponModalOpen = useSetRecoilState(couponListModalAtom);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {menu && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "gray",
              }}
            ></div>
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
                <button>カスタム</button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <p style={{ margin: 0 }}>・チョコソース</p>
                <p style={{ margin: 0 }}>・チョコソース</p>
              </div>
              <div
                style={{
                  marginTop: "40px",
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <p style={{ margin: 0 }}>アレルギー情報</p>
                <div style={{ display: "flex" }}>
                  {Object.keys(menu.allergy).map((key, index) => (
                    <div
                      key={index}
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "gray",
                      }}
                    >
                      {menu.allergy[key]}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h1>単品￥{menu.price}</h1>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  // zIndex: 2,
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
                <button
                  onClick={() => {
                    orderFunc.setOrderMenuToCart(orderMenu);
                    setIsOpen(false);
                  }}
                >
                  カートに追加
                </button>
              </div>
            </div>
          </div>
          <CouponHalfModal
            modalIsOpen={isCouponModalOpen}
            setModalIsOpen={setIsCouponModalOpen}
            orderMenu={orderMenu}
            setOrderMenu={setOrderMenu}
          />
        </>
      )}
    </Modal>
  );
};

export default ProductItemModal;
