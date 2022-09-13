import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApiktKbk2AmM1oALGYbMGAkjfnDld3oFI",
  authDomain: "dx-smoothies.firebaseapp.com",
  projectId: "dx-smoothies",
  storageBucket: "dx-smoothies.appspot.com",
  messagingSenderId: "957503452877",
  appId: "1:957503452877:web:62e05a79e70aff3d31db84",
  measurementId: "G-0YK9VD4Z18",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
