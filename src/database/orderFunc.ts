import { useRecoilState } from "recoil";
import {
  Coupon,
  Coupons,
  Menu,
  OrderData,
  OrderMenu,
  Topping,
  Toppings,
} from "../type/model";
import {
  cartItemsAtom,
  couponsAtom,
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
  decreaseProduct,
  deleteOrder,
  fetchCoupons,
  fetchKeyword,
  fetchKeywordLength,
  fetchMenus,
  fetchToppings,
  setAnalytics,
  setOrder,
  snapOrderState,
  updateUserData,
} from "./basicFunc/firestore";

//モバイルオーダーで使用する関数をまとめたファイル

export const useOrderFunc = () => {
  const [menus, setMenus] = useRecoilState(menusAtom);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [toppings, setToppings] = useRecoilState(toppingsAtom);
  const [userData, setUserData] = useRecoilState(userAtom);
  const [coupons, setCoupons] = useRecoilState(couponsAtom);
  const [orderedData, setOrderedData] = useRecoilState(orderedDataAtom);
  const [keywordLength, setKeywordLength] = useRecoilState(keywordLengthAtom);

  //メニューデータを取得する関数
  const getMenus = () => {
    fetchMenus().then((data: any) => {
      console.log("got data", data);
      setMenus(data);
    });
  };

  const deleteCartItem = (index: number) => {
    let tmp = [...cartItems];
    tmp.splice(index, 1);
    const coupon = cartItems[index].couponID;
    const tmpUserData = { ...userData };
    const tmpUserCoupons = { ...tmpUserData.coupons };
    if (coupon) {
      tmpUserCoupons[coupon] = "useable";
    }
    setUserData(tmpUserData);
    setCartItems(tmp);
  };

  const getKeywordLength = () => {
    fetchKeywordLength()
      .then((docs) => {
        setKeywordLength(docs.size);
      })
      .catch((error) => {
        alert(
          `キーワードの種類数を取得できませんでしたアプリを再起動してください:${error.message}`
        );
      });
  };

  const getToppings = () => {
    fetchToppings().then((docs) => {
      const toppings: Toppings = {};
      docs.forEach((doc) => {
        //TODO:ここ無理やりTopping型にしているので改善したい
        toppings[doc.id] = doc.data() as Topping;
      });
    });
    setToppings(toppings);
  };

  const getCoupons = () => {
    const coupons: Coupons = {};
    fetchCoupons().then((docs) => {
      docs.forEach((doc) => {
        //TODO:ここ無理やりCoupon型にしているので改善したい
        coupons[doc.id] = doc.data() as Coupon;
      });
    });
    setCoupons(coupons);
  };

  //IDからメニューデータを取得する関数
  const getMenuByID = (menuId: string) => {
    const tmp = menus[menuId];
    return tmp;
  };

  //IDからクーポンデータを取得する関数
  const getCouponByID = (couponId: string) => {
    const tmp = coupons[couponId];
    return tmp;
  };

  //IDからトッピングデータを取得する関数
  const getToppingsByID = (toppingId: string) => {
    const tmp = toppings[toppingId];
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
  const order = async (then: () => void) => {
    if (cartItems.length !== 0) {
      const keywordIndex = Math.floor(Math.random() * keywordLength);
      let keywordData;
      try {
        keywordData = (await fetchKeyword(keywordIndex)).data();
      } catch (error) {
        alert(
          `注文番号を取得できませんでした。注文をし直してください:${error}`
        );
        return;
      }
      if (!keywordData) {
        alert(`注文番号を取得できませんでした。注文をし直してください。`);
        return;
      }
      try {
        addKeywordNum(keywordIndex, keywordData.number);
      } catch (error) {
        alert(
          `注文番号を取得できませんでした。注文をし直してください:${error}`
        );
        return;
      }
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
      try {
        setOrder(userData.id, tmp);
      } catch (error) {
        alert(
          `注文のキャンセルができませんでした。以下のメールアドレスから連絡をお願いします。${error}`
        );
        return;
      }
      try {
        // changeStateOfCoupon(userData.id, tmpCouponsState);
        updateUserData(userData);
      } catch (error) {
        alert(
          `クーポンを正しく使用できませんでした。注文をキャンセルします${error}`
        );
        return;
      }
      then();
    } else {
      alert("カートに商品がありません");
    }
  };

  //注文状況をスナップショットで受け取る関数
  const getOrderState = () => {
    snapOrderState(userData.id, (orderData) => setOrderedData(orderData));
  };

  //支払い完了時に実行する関数（オーダーデータを削除）
  const completeOrder = (then: () => void) => {
    if (orderedData?.isCompleted) {
      deleteOrder(userData.id)
        .then(() => {
          setOrderedData(null);
          orderedData.OrderMenus.forEach((menu) => {
            decreaseProduct(`menus/${menu.menuID}`);
            menu.toppings.forEach((topping) => {
              decreaseProduct(`toppings/${topping}`);
            });
          });
          setAnalytics(orderedData)
            .then(() => {
              then();
            })
            .catch((error) => {
              then();
            });
        })
        .catch((error) => {
          alert(
            `注文を完了できませんでした。しばらくしてからもう一度注文完了を押してください:${error.message}`
          );
        });
    }
  };

  const resetUseCoupon = (orderMenu: OrderMenu) => {
    if (orderMenu.couponID) {
      const tmpUserData = { ...userData };
      const tmpCoupons = { ...tmpUserData.coupons };
      tmpCoupons[orderMenu.couponID] = "useable";
      tmpUserData.coupons = tmpCoupons;
      setUserData(tmpUserData);
    }
  };

  const useCoupon = (
    couponId: string,
    orderMenu: OrderMenu,
    setOrderMenu: (orderMenu: OrderMenu) => void
  ) => {
    if (orderMenu.couponID) {
      alert("クーポンはすでに使用しています。");
    } else {
      const calcPrice = () => {
        const couponData = getCouponByID(couponId);
        let tmpPrice = orderMenu.menuPrice;
        if (couponData) {
          if (couponData.type === "multiple") {
            tmpPrice = tmpPrice * couponData.number;
          } else if (couponData.type === "subtract") {
            tmpPrice = tmpPrice - couponData.number;
          } else {
            alert("対応していないクーポンタイプです");
          }
        } else {
          alert("クーポンデータがありません");
        }
        return tmpPrice;
      };
      const tmp = { ...orderMenu };
      const tmpUserData = { ...userData };
      const tmpCoupons = { ...tmpUserData.coupons };
      tmp.menuPrice = calcPrice();
      tmp.couponID = couponId;
      tmpCoupons[couponId] = "used";
      tmpUserData.coupons = tmpCoupons;
      setOrderMenu(tmp);
      setUserData(tmpUserData);
    }
  };

  return {
    getMenus,
    getKeywordLength,
    getToppings,
    getCoupons,
    getMenuByID,
    getCouponByID,
    getToppingsByID,
    setToppingToMenu,
    setOrderMenuToCart,
    order,
    getOrderState,
    completeOrder,
    useCoupon,
    resetUseCoupon,
    deleteCartItem,
  };
};
