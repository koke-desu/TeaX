import { useRecoilState } from "recoil";
import { Menu, OrderMenu, Topping, Toppings } from "../type/model";
import { cartItemsAtom, menusAtom, toppingsAtom } from "./atom";
import { fetchMenus } from "./basicFunc/firestore";

//モバイルオーダーで使用する関数をまとめたファイル
export {};

export const useOrderFunc = () => {
  const [menus, setMenus] = useRecoilState(menusAtom);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [toppings, setToppings] = useRecoilState(toppingsAtom);

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

  //トッピングをセットする
  const setToppingToMenu = (
    menuId: string,
    toppingIds: string[],
    couponID?: string
  ): OrderMenu => {
    const menuData: Menu = menus[menuId];
    const toppingList: string[] = toppingIds;
    let totalToppingPrices: number = 0;
    toppingList.forEach((topping) => {
      const tmp: number = toppings[topping].price;
      totalToppingPrices += tmp;
    });
    const totalPrice = menus[menuId].price + totalToppingPrices;
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

  //注文する関数

  //注文状況をスナップショットで受け取る関数

  //支払い完了時に実行する関数（オーダーデータを削除）
};
