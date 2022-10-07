import { atom, RecoilState } from "recoil";
import {
  Coupons,
  Menus,
  quizzes,
  User,
  OrderMenu,
  Toppings,
  couponState,
  OrderData,
} from "../type/model";
import { auth } from "./firebase";

export const userAtom = atom({
  key: "user",
  default: {
    id: auth.currentUser?.uid || "",
    coupons: {},
    quizzes: {},
  } as User,
});

export const tmpCouponsStateAtom = atom({
  key: "tmpCouponsStateAtom",
  default: {} as { [couponID: string]: couponState },
});

export const couponsAtom = atom({
  key: "couponsAtom",
  default: {} as Coupons,
});

export const menusAtom = atom({
  key: "menusAtom",
  default: {} as Menus,
});

export const toppingsAtom = atom({
  key: "toppingsAtom",
  default: {} as Toppings,
});

export const quizzesAtom = atom({
  key: "quizzesAtom",
  default: {} as quizzes,
});

export const cartItemsAtom = atom({
  key: "cartItemsAtom",
  default: [] as OrderMenu[],
});

//注文済みかつ作成待ちの注文データ
export const orderedDataAtom = atom({
  key: "orderedDataAtom",
  default: null as OrderData | null,
});

export const keywordLengthAtom = atom({
  key: "keywordLengthAtom",
  default: 0 as number,
});
