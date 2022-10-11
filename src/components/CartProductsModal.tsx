import { useRecoilState } from "recoil";
import { cartItemsAtom, cartProductModalAtom } from "../database/atom";
import Modal from "./Modal";

const CartProductsModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(cartProductModalAtom);
  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <div>カートのアイテム一覧</div>
    </Modal>
  );
};

export default CartProductsModal;
