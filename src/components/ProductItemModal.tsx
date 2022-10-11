import { useRecoilState } from "recoil";
import { productItemModalAtom } from "../database/atom";
import Modal from "./Modal";

const ProductItemModal = () => {
  const [modalIsOpen, setModalIsOpen] = useRecoilState(productItemModalAtom);
  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{ width: "100px", height: "100px", backgroundColor: "gray" }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0 }}>商品名</p>
          <p style={{ margin: 0 }}>
            説明説明説明説明説明説明説明説明説明説明説明説明説明
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <p>トッピング</p>
            <button>カスタム</button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <p style={{ margin: 0 }}>・チョコソース</p>
            <p style={{ margin: 0 }}>・チョコソース</p>
          </div>
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <p style={{ margin: 0 }}>アレルギー情報</p>
            <div style={{ display: "flex" }}>
              {new Array(7).fill(0).map((zero, index) => (
                <div
                  key={index}
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "gray",
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div>
            <h1>単品￥400</h1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              zIndex: 2,
            }}
          >
            <button>クーポンを追加</button>
            <button onClick={() => console.log("aiueo")}>カートに追加</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductItemModal;
