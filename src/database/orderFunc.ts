import { useRecoilState } from "recoil";
import { Menu, OrderData, OrderMenu, Topping, Toppings } from "../type/model";
import {
  cartItemsAtom,
  keywordLengthAtom,
  menusAtom,
  orderedDataAtom,
  tmpCouponsStateAtom,
  toppingsAtom,
  userAtom,
} from "./atom";
import {
  addKeywordNum,
  changeStateOfCoupon,
  deleteOrder,
  fetchKeyword,
  fetchMenus,
  setOrder,
  snapOrderState,
} from "./basicFunc/firestore";

//モバイルオーダーで使用する関数をまとめたファイル

export const useOrderFunc = () => {
  const [menus, setMenus] = useRecoilState(menusAtom);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [toppings, setToppings] = useRecoilState(toppingsAtom);
  const [userData, setUserData] = useRecoilState(userAtom);
  const [tmpCouponsState, setTmpCouponsState] =
    useRecoilState(tmpCouponsStateAtom);
  const [orderedData, setOrderedData] = useRecoilState(orderedDataAtom);
  const [keywordLength, setKeywordLength] = useRecoilState(keywordLengthAtom);

  //メニューデータを取得する関数
  const getMenus = () => {
    fetchMenus().then((data: any) => {
      console.log("got data", data);
      setMenus(data);
    });
  };

  //IDからメニューデータを取得する関数
  const getMenuByID = (menuId: string) => {
    const tmp = menus[menuId];
    return tmp;
  };

  //トッピングをセットする(トッピングのセットは基本的にカートに入れないのでデータを返す感じ)
  const setToppingToMenu = (
    menuId: string,
    toppingIds: string[],
    couponID?: string
  ): OrderMenu => {
    const menuPrice: number = menus[menuId].price;
    const toppingList: string[] = toppingIds;
    let totalToppingPrices: number = 0;
    toppingList.forEach((topping) => {
      const tmp: number = toppings[topping].price;
      totalToppingPrices += tmp;
    });
    const totalPrice = menuPrice + totalToppingPrices;
    const tmp: OrderMenu = {
      toppings: toppingIds,
      menuID: menuId,
      menuPrice: totalPrice,
      couponID: couponID ? couponID : null,
    };
    return tmp;
  };

  //カートにMenuをセットする関数
  const setOrderMenuToCart = (orderMenu: OrderMenu) => {
    const tmp = [...cartItems];
    tmp.push(orderMenu);
    setCartItems(tmp);
  };

  //注文する関数(thenはうまく行った時の処理を書く)
  const order = (then: () => void) => {
    if (cartItems.length !== 0) {
      const keywordIndex = Math.floor(Math.random() * keywordLength);
      fetchKeyword(keywordIndex)
        .then((keywordDoc) => {
          const keywordData = keywordDoc.data();
          if (keywordData) {
            addKeywordNum(keywordIndex, keywordData.number)
              .then(() => {
                const keyword: string = keywordData.name + keywordData.number;
                let totalPrice = 0;
                cartItems.forEach((item) => {
                  totalPrice += item.menuPrice;
                });
                const tmp: OrderData = {
                  OrderMenus: cartItems,
                  createdAt: new Date(),
                  isCompleted: false,
                  orderKeyword: keyword,
                  totalPrice: totalPrice,
                  userId: userData.id,
                };
                setOrder(userData.id, tmp)
                  .then(() => {
                    changeStateOfCoupon(userData.id, tmpCouponsState)
                      .then(() => {
                        then();
                      })
                      .catch((error) => {
                        alert(
                          "クーポンを正しく使用できませんでした。注文をキャンセルします"
                        );
                        deleteOrder(userData.id).catch((error) => {
                          alert(
                            "注文のキャンセルができませんでした。以下のメールアドレスから連絡をお願いします。"
                          );
                        });
                      });
                  })
                  .catch(() => {
                    alert(
                      "注文ができませんでした。しばらくしてからもう一度注文し直してください"
                    );
                    setTmpCouponsState(userData.coupons);
                  });
              })
              .catch((error) => {
                alert(
                  `注文番号を取得できませんでした。注文をし直してください:${error.message}`
                );
              });
          } else {
            alert("注文番号を取得できませんでした。注文をし直してください");
          }
        })
        .catch((error) => {
          alert(
            `注文番号を取得できませんでした。注文をし直してください:${error.message}`
          );
        });
    } else {
      alert("カートに商品がありません");
    }
  };

  //注文状況をスナップショットで受け取る関数
  const getOrderState = () => {
    snapOrderState(userData.id).then((doc) => {
      setOrderedData(doc as OrderData);
    });
  };

  //支払い完了時に実行する関数（オーダーデータを削除）
  const completeOrder = (then: () => void) => {
    if (orderedData?.isCompleted) {
      deleteOrder(userData.id)
        .then(() => {
          then();
        })
        .catch((error) => {
          alert(
            `注文を完了できませんでした。しばらくしてからもう一度注文完了を押してください:${error.message}`
          );
        });
    }
  };
};
