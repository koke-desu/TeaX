import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { couponListModalAtom, couponsAtom, userAtom } from "../database/atom";
import { useOrderFunc } from "../database/orderFunc";
import CouponCard from "../html&cssComps/CouponCard/CouponCard";
import { couponState, OrderMenu } from "../type/model";
import HalfModal from "./HalfModal";

type Props = {
  orderMenu?: OrderMenu;
  setOrderMenu?: (orderMenu: OrderMenu) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (a: boolean) => void;
};

const CouponHalfModal: FC<Props> = ({
  modalIsOpen,
  setModalIsOpen,
  orderMenu,
  setOrderMenu = () => {},
}) => {
  console.log(modalIsOpen);
  const router = useRouter();
  const coupons = useRecoilValue(couponsAtom);
  const userData = useRecoilValue(userAtom);
  const orderFunc = useOrderFunc();
  return (
    <HalfModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>クーポン一覧</p>
        {coupons.map((coupon, index) => {
          const tmp = userData.coupons[coupon.id];
          const state: couponState = tmp ? tmp : "unOwned";
          return (
            <CouponCard
              key={index}
              isUsable={state === "useable" && orderMenu ? true : false}
              title={coupon.title}
              description={coupon.description}
              onClick={() => {
                if (orderMenu)
                  orderFunc.setCouponToOrderMenu(
                    coupon.id,
                    orderMenu,
                    setOrderMenu
                  );
                setModalIsOpen(false);
              }}
            />
            // <div
            //   key={index}
            //   style={{
            //     width: "80%",
            //     height: "50px",
            //     border: "1px solid black",
            //     margin: "4px",
            //     display: "flex",
            //     alignItems: "center",
            //     justifyContent: "space-around",
            //   }}
            // >
            //   <p>{state}</p>
            //   <Link href="/quiz/main">
            //     <a>スタンプラリーへ</a>
            //   </Link>
            //   {state === "useable" && orderMenu && (
            //     <button
            //       onClick={() => {
            //         orderFunc.setCouponToOrderMenu(
            //           coupon.id,
            //           orderMenu,
            //           setOrderMenu
            //         );
            //         setModalIsOpen(false);
            //       }}
            //     >
            //       クーポンを使う
            //     </button>
            //   )}
            // </div>
          );
        })}
      </div>
    </HalfModal>
  );
};

export default CouponHalfModal;
