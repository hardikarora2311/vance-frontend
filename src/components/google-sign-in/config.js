import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi9wpH7L9CMDsLKv0trPLces6bwRV8in0",
  authDomain: "vance-dash.firebaseapp.com",
  projectId: "vance-dash",
  storageBucket: "vance-dash.appspot.com",
  messagingSenderId: "860167817428",
  appId: "1:860167817428:web:28b96e5d79ffc4d8c25341",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, provider, db };
