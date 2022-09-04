// emailとpasswordはauthで管理。
// idはauthのUUID
export type User = {
  id: string;
  history: Order[];
};

// 「バナナスムージー」チョコクリームトッピング。みたいな感じのを表す。
// nameはデフォルトのメニューにのみ付く。
export type Menu = {
  id: string;
  name?: string;
  ingredient: Ingredient;
  toppings: Topping[];
  price: number;
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
export type Coupon = {
  id: string;
  title: string;
  description: number;
};

// Menuと受け取り予定時刻とか。
export type Order = {
  id: string;
  createdAt: Date; //
  pickupTime: Date; // 受け取り予定時刻
  user: User;
  menu: Menu[];
  coupons: Coupon[];
  totalPrice: number;
};
