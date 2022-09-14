// emailとpasswordはauthで管理。

// idはauthのUUID
export type User = {
  id: string;
  history: Order[];
};

// 「バナナスムージー」チョコクリームトッピング。みたいな感じのを表す。
// nameはデフォルトのメニューにのみ付く。
export type Menu = {
  // id: string;
  name: string | "custom";
  ingredient: Ingredient;
  toppings: Topping[];
  sumPrice: number; //トッピングとメイン材料の合計価格
  coupon: Coupon;
};

// メインの材料。バナナとか
export type Ingredient = {
  id: string;
  name: string;
  description: string;
  price: number;
};

// トッピング。複数種類つけることが出来る。
// ココアパウダー、スライスした果物とか
export type Topping = {
  id: string;
  name: string;
  description: number;
  price: number;
};

// クーポンの詳細。中身は未定。割引や隠しメニューとか？
//typeとnumberで価格の計算を行う。例えば、type:multiple,number:0.7の場合は3割引きを意味し、価格×0.7を計算する。
export type Coupon = {
  id: string;
  title: string;
  description: number;
  type: CouponType;
  number: number;
  isGetting: boolean;
  isUsed: boolean;
};
//○○割引はmultiple,○○円引きはsubtract,○○無料はfree123でタイプで分ける
export type CouponType = "multiple" | "subtract" | "free1" | "free2" | "free3";

// Menuと受け取り予定時刻とか。
export type Order = {
  // id: string;
  orderNumber: number;
  createdAt: Date;
  pickupTime: Date; // 受け取り予定時刻
  isCompleted: boolean; //オーダーしたスムージーが完成したかどうか
  userId: string;
  menu: Menu[];
  // coupons: Coupon[];メニューにつき一つクーポンを適用できるようにするためここにクーポンは置かないようにします
  totalPrice: number; //Menuらの合計価格
};
