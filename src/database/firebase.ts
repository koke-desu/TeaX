import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAkI2LFU-zLCELMCjY3DQZPiaYD9sq5-Y",
  authDomain: "test-dx-smoothies.firebaseapp.com",
  projectId: "test-dx-smoothies",
  storageBucket: "test-dx-smoothies.appspot.com",
  messagingSenderId: "789867681278",
  appId: "1:789867681278:web:1432455afd274389a51caf",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
