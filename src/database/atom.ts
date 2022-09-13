import { atom, RecoilState } from "recoil";
import { User } from "../type/model";
import { auth } from "./firebase";

export const userAtom = atom({
  key: "user",
  default: {
    id: auth.currentUser?.uid,
    history: [],
  } as User,
});
