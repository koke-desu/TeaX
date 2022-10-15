/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { memo } from "react";
import { useSetRecoilState } from "recoil";
import { cartProductModalAtom } from "../database/atom";
import { useAccountFunc } from "../database/authFunc";
import HeaderNav from "../html&cssComps/HeaderNav";

export const Header = memo(() => {
  const router = useRouter();
  const setModalOpen = useSetRecoilState(cartProductModalAtom);
  const authFunc = useAccountFunc();
  return (
    <div style={{ marginTop: "40px" }}>
      <HeaderNav router={router} onClickCart={() => setModalOpen(true)} />
    </div>
  );
});
