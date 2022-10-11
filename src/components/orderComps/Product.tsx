import { useRecoilState } from "recoil";
import { productItemModalAtom } from "../../database/atom";

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(productItemModalAtom);
  return (
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
        }}
      >
        <p>商品画像</p>
      </div>
      <p>商品名</p>
      <p>￥500</p>
    </div>
  );
};

export default Product;
