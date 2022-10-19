/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import MenuCard from "../../html&cssComps/MenuCard";
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
          width: "50%",
          padding: "8px",
        }}
      >
        <MenuCard
          name={menu.name}
          price={menu.price}
          imageUrl={menu.imageUrl}
          onClick={() => setIsModalOpen(true)}
        />
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
