import { useRecoilValue, useSetRecoilState } from "recoil";
import { orderedDataAtom, orderingListModalAtom } from "../database/atom";
import OrderStatus from "../html&cssComps/OrderStatus";

const OrderingFAB = () => {
  const setIsModalOpen = useSetRecoilState(orderingListModalAtom);
  return <OrderStatus onClick={() => setIsModalOpen(true)} />;
};

export default OrderingFAB;
