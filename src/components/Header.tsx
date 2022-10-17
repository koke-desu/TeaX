/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { memo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartItemsAtom, cartProductModalAtom } from "../database/atom";
import { useAccountFunc } from "../database/authFunc";
import HeaderNav from "../html&cssComps/HeaderNav";

export const Header = memo(() => {
  const router = useRouter();
  const setModalOpen = useSetRecoilState(cartProductModalAtom);
  const authFunc = useAccountFunc();
  const cartItems = useRecoilValue(cartItemsAtom);
  return (
    <div style={{ marginTop: "40px" }}>
      <HeaderNav
        cartNum={cartItems.length}
        router={router}
        onClickCart={() => setModalOpen(true)}
      />
    </div>
  );
});
