/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import { Menu } from "../../type/model";
import ProductItemModal from "../ProductItemModal";

type Props = {
  menu: Menu;
};

const Product: FC<Props> = ({ menu }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          width: "150px",
          height: "180px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          border: "1px solid black",
          borderRadius: 10,
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <div
          style={{
            border: "1px solid black",
            width: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={menu.imageUrl} alt="menuImg" width="auto" height="60px" />
        </div>
        <p>{menu.name}</p>
        <p>￥{menu.price}</p>
      </div>
      <ProductItemModal
        menu={menu}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
};

export default Product;
