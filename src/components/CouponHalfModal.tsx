import { FC } from "react";
import { useRecoilValue } from "recoil";
import { couponsAtom, userAtom } from "../database/atom";
import { useOrderFunc } from "../database/orderFunc";
import CouponCard from "../html&cssComps/CouponCard";
import { couponState, OrderMenu } from "../type/model";
import HalfModal from "./HalfModal";

type Props = {
  orderMenu?: OrderMenu | null;
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
          const state: couponState = userData.coupons
            ? userData.coupons[coupon.id]
            : "unOwned";
          return (
            <CouponCard
              key={index}
              state={state}
              isUseMode={orderMenu ? true : false}
              title={coupon.title}
              description={coupon.description}
              onClick={() => {
                if (orderMenu)
                  orderFunc.useCoupon(coupon.id, orderMenu, setOrderMenu);
                setModalIsOpen(false);
              }}
            />
          );
        })}
      </div>
    </HalfModal>
  );
};

export default CouponHalfModal;
