import { useRecoilState } from "recoil";
import { Coupon, Menu, OrderData, OrderMenu, Topping } from "../type/model";
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
  deleteOrder,
  fetchCoupons,
  fetchKeyword,
  fetchKeywordLength,
  fetchMenus,
  fetchToppings,
  setOrder,
  snapOrderState,
} from "./basicFunc/firestore";

//モバイルオーダーで使用する関数をまとめたファイル

export const useOrderFunc = () => {
  const [menus, setMenus] = useRecoilState(menusAtom);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [toppings, setToppings] = useRecoilState(toppingsAtom);
  const [userData, setUserData] = useRecoilState(userAtom);
  const [coupons, setCoupons] = useRecoilState(couponsAtom);
  const [tmpCouponsState, setTmpCouponsState] =
    useRecoilState(tmpCouponsStateAtom);
  const [orderedData, setOrderedData] = useRecoilState(orderedDataAtom);
  const [keywordLength, setKeywordLength] = useRecoilState(keywordLengthAtom);
  //メニューデータを取得する関数
  const getMenus = () => {
    fetchMenus().then((data) => {
      const tmp = [...data];
      setMenus(tmp);
    });
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
    const tmp = fetchToppings();
    tmp.then((data) => {
      //TODO:ここ無理やりCoupon型にしているので改善したい
      console.log("setToppingsData to recoil", data);
      const tmp = [...data];
      setToppings(tmp);
    });
  };

  const getCoupons = () => {
    const tmp = fetchCoupons();
    // setCoupons(coupons);
    tmp.then((data) => {
      //TODO:ここ無理やりCoupon型にしているので改善したい
      console.log("setCouponData to recoil", data);
      const tmp = [...data];
      setCoupons(tmp);
    });
  };

  //IDからメニューデータを取得する関数
  const getMenuByID = (menuId: string) => {
    const tmp = menus.find((data) => data.id === menuId);
    console.log("get menudata", menus, menuId, tmp);

    return tmp;
  };

  //IDからクーポンデータを取得する関数
  const getCouponByID = (couponId: string) => {
    const tmp = coupons.find((data) => data.id === couponId);
    return tmp;
  };

  //IDからトッピングデータを取得する関数
  const getToppingsByID = (toppingId: string) => {
    const tmp = toppings.find((data) => data.id === toppingId);
    return tmp;
  };

  //トッピングをセットする(トッピングのセットは基本的にカートに入れないのでデータを返す感じ)
  const setToppingToMenu = (
    orderMenu: OrderMenu,
    toppingIds: string[],
    couponID?: string
  ): OrderMenu => {
    const menuPrice: number | undefined = getMenuByID(orderMenu.menuID)?.price;
    const toppingList: string[] = toppingIds;
    let totalToppingPrices: number = 0;
    toppingList.forEach((topping) => {
      const tmp: number | undefined = getToppingsByID(topping)?.price;
      if (tmp) totalToppingPrices += tmp;
      else {
        alert("トッピングのデータがありません");
      }
    });
    let totalPrice = 0;
    if (!menuPrice) {
      alert("メニューデータがありません");
    } else {
      totalPrice = menuPrice + totalToppingPrices;
    }
    const tmp: OrderMenu = {
      toppings: toppingIds,
      menuID: orderMenu.menuID,
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
    console.log("setted menu to cart", orderMenu);
  };

  const setCouponToOrderMenu = (
    couponId: string,
    orderMenu: OrderMenu,
    setOrderMenu: (orderMenu: OrderMenu) => void
  ) => {
    if (orderMenu.couponID) {
      alert("クーポンはすでに使用しています。");
    } else {
      const tmp = { ...orderMenu };
      tmp.couponID = couponId;
      setOrderMenu(tmp);
    }
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
          "注文のキャンセルができませんでした。以下のメールアドレスから連絡をお願いします。"
        );
        return;
      }
      try {
        changeStateOfCoupon(userData.id, tmpCouponsState);
      } catch (error) {
        alert(
          `クーポンを正しく使用できませんでした。注文をキャンセルします${error}`
        );
        return;
      }
      setCartItems([]);
      then();
    } else {
      alert("カートに商品がありません");
    }
  };

  //注文状況をスナップショットで受け取る関数
  const getOrderState = (userId: string) => {
    snapOrderState(userId, (orderData) => setOrderedData(orderData));
  };

  //支払い完了時に実行する関数（オーダーデータを削除）
  const completeOrder = (then: () => void) => {
    if (orderedData?.isCompleted) {
      deleteOrder(userData.id)
        .then(() => {
          setOrderedData(null);
          then();
        })
        .catch((error) => {
          alert(
            `注文を完了できませんでした。しばらくしてからもう一度注文完了を押してください:${error.message}`
          );
        });
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
    setCouponToOrderMenu,
  };
};
