// emailとpasswordはauthで管理。

// idはauthのUUID
export type User = {
  id: string;
  coupons: { [couponID: string]: couponState };
  //booleanはスタンプラリーのスポットをクリアし終わっていたらtrueそうでなければfalse
  quizzes: { [quizID: string]: quizState };
};

export type quizState = "notCleared" | "cleared";

export type couponState = "used" | "unOwned" | "useable";

export type OrderData = {
  OrderMenus: OrderMenu[];
  createdAt: Date;
  isCompleted: boolean;
  orderKeyword: string;
  totalPrice: number;
  userId: string;
};

// 「バナナスムージー」チョコクリームトッピング。みたいな感じのを表す。
// nameはデフォルトのメニューにのみ付く。
export type OrderMenu = {
  //トッピングIDをリスト形式で格納しデータを参照する時はIDをもとにトッピング一覧データから参照
  toppings: string[];
  menuID: string;
  menuPrice: number; //トッピングとメイン材料の合計価格
  couponID: string | null;
};

export type Menus = {
  [menuID: string]: Menu;
};

export type Menu = {
  description: string;
  name: string;
  price: number;
  //バナナ:falseのような感じで記述するイメージ
  allergy: { [allergyName: string]: boolean };
  soldNum: number;
  remaining: number;
  imageUrl: string;
};

// トッピング。複数種類つけることが出来る。

export type Toppings = {
  [toppingID: string]: Topping;
};

// ココアパウダー、スライスした果物とか
export type Topping = {
  name: string;
  description: number;
  price: number;
  soldNum: number;
  remaining: number;
  imageUrl: string;
};

export type Coupons = {
  [couponID: string]: Coupon;
};

// クーポンの詳細。中身は未定。割引や隠しメニューとか？
//typeとnumberで価格の計算を行う。例えば、type:multiple,number:0.7の場合は3割引きを意味し、価格×0.7を計算する。
export type Coupon = {
  title: string;
  description: number;
  type: CouponType;
  number: number;
};

//○○割引はmultiple,○○円引きはsubtract,○○無料はfree123でタイプで分ける
export type CouponType = "multiple" | "subtract" | "free1" | "free2" | "free3";

export type quizzes = {
  [quizID: string]: quiz;
};

export type quiz = {
  tips: string;
  choiceNum: number;
  explaneImgURL: string;
  explane: string;
  answer: number;
};
