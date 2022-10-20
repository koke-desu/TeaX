import { atom } from "recoil";
import {
  User,
  OrderMenu,
  CouponState,
  OrderData,
  Menu,
  Coupon,
  Topping,
  Quiz,
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
  default: {} as { [couponID: string]: CouponState },
});

export const couponsAtom = atom({
  key: "couponsAtom",
  default: [] as Coupon[],
});

export const menusAtom = atom({
  key: "menusAtom",
  default: [] as Menu[],
});

export const toppingsAtom = atom({
  key: "toppingsAtom",
  default: [] as Topping[],
});

export const quizzesAtom = atom({
  key: "quizzesAtom",
  default: [] as Quiz[],
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

export const couponListModalAtom = atom({
  key: "couponListModalAtom",
  default: false,
});

export const orderingListModalAtom = atom({
  key: "orderingListModalAtom",
  default: false,
});

export const cartProductModalAtom = atom({
  key: "cartProductModalAtom",
  default: false,
});

export const pushPageQuizAtom = atom({
  key: "pushPageQuizAtom",
  default: "" as string,
});

export const pushPageQrCodeReaderAtom = atom({
  key: "pushPageQrCodeReaderAtom",
  default: false,
});

//stringには獲得したクーポンのIDを入れる
export const achieveCouponModalAtom = atom({
  key: "achieveCouponModalAtom",
  default: null as string | null,
});

export const pushPageQuixExplanationAtom = atom({
  key: "pushPageQuixExplanationAtom",
  default: false,
});
