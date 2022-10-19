// emailとpasswordはauthで管理。

// idはauthのUUID
export type User = {
  id: string;
  coupons: { [couponID: string]: CouponState };
  quizzes: { [quizID: string]: QuizState };
};

export type QuizState = "notCleared" | "cleared" | "failed";

export type CouponState = "used" | "unOwned" | "useable";

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

// export type Menus =  Menu[];

export type Menu = {
  id: string;
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

// export type Toppings = {
//   [toppingID: string]: Topping;
// };

// ココアパウダー、スライスした果物とか
export type Topping = {
  id: string;
  name: string;
  description: number;
  price: number;
  soldNum: number;
  remaining: number;
  imageUrl: string;
};

// export type Coupons = {
//   [couponID: string]: Coupon;
// };

// クーポンの詳細。中身は未定。割引や隠しメニューとか？
//typeとnumberで価格の計算を行う。例えば、type:multiple,number:0.7の場合は3割引きを意味し、価格×0.7を計算する。
export type Coupon = {
  id: string;
  title: string;
  description: string;
  type: CouponType;
  number: number;
  achieveType: AchieveType;
};

//stringはクイズのIdを指定
export type AchieveType = string | "all";

//○○割引はmultiple,○○円引きはsubtract,○○無料はfree123でタイプで分ける
export type CouponType = "multiple" | "subtract" | "free1" | "free2" | "free3";

export type Quizzes = {
  [quizID: string]: Quiz;
};

export type Quiz = {
  tips: string;
  choiceNum: number;
  explaneImgURL: string;
  explane: string;
  answer: number;
};
