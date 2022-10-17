/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useRecoilValue } from "recoil";
import CouponHalfModal from "../../src/components/CouponHalfModal";
import Product from "../../src/components/orderComps/Product";
import { menusAtom } from "../../src/database/atom";
import { useInitPage } from "../../src/hooks/initAppHooks";
import LargeButton from "../../src/html&cssComps/LargeButton";

const Main = () => {
  useInitPage();
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const menus = useRecoilValue(menusAtom);
  return (
    <>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "12px",
            position: "fixed",
            right: 0,
          }}
        >
          <LargeButton
            title="クーポン一覧"
            onClick={() => setIsCouponModalOpen(true)}
          />
        </div>
        <div
          style={{
            margin: "12px",
            display: "flex",
            flexWrap: "wrap",
            paddingTop: "72px",
          }}
        >
          {Object.values(menus).map((menu, index) => (
            <Product key={index} menu={menu}></Product>
          ))}
        </div>
      </div>
      <CouponHalfModal
        modalIsOpen={isCouponModalOpen}
        setModalIsOpen={setIsCouponModalOpen}
      />
    </>
  );
};

export default Main;
