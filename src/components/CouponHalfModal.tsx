import { FC } from "react";
import { useRecoilValue } from "recoil";
import { couponsAtom, userAtom } from "../database/atom";
import { useOrderFunc } from "../database/orderFunc";
import CouponCard from "../html&cssComps/CouponCard";
import { CouponState, OrderMenu } from "../type/model";
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
  const coupons = useRecoilValue(couponsAtom);
  const userData = useRecoilValue(userAtom);
  const orderFunc = useOrderFunc();
  console.log("coupon is", coupons);
  return (
    <HalfModal
      isOpen={modalIsOpen}
      setIsOpen={setModalIsOpen}
      title="クーポン一覧"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {coupons.map((coupon, index) => {
          const state: CouponState = userData.coupons
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
