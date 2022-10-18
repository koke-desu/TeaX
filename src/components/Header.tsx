/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { FC, memo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartItemsAtom, cartProductModalAtom } from "../database/atom";
import { useAccountFunc } from "../database/authFunc";
import HeaderNav from "../html&cssComps/HeaderNav";

type Props = {
  isHome: boolean;
  onClose: () => void;
};

export const Header: FC<Props> = ({ isHome, onClose }) => {
  const setModalOpen = useSetRecoilState(cartProductModalAtom);
  const cartItems = useRecoilValue(cartItemsAtom);
  return (
    <div style={{ marginTop: "40px" }}>
      <HeaderNav
        onClose={onClose}
        isHome={isHome}
        cartNum={cartItems.length}
        onClickCart={() => setModalOpen(true)}
      />
    </div>
  );
};
