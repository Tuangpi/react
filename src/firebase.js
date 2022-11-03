import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
} from "react-admin-firebase";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const config = {
  apiKey: "AIzaSyDZK5r2gQyOP0lLurl_ChOGQjU03v6ybSY",
  authDomain: "react-tutorial-df3dd.firebaseapp.com",
  databaseURL: "react-tutorial-df3dd.firebasedatabase.app",
  projectId: "react-tutorial-df3dd",
  storageBucket: "react-tutorial-df3dd.appspot.com",
  messagingSenderId: "300345005285",
};
const authProvider = FirebaseAuthProvider(config);
const dataProvider = FirebaseDataProvider(config);
const app = initializeApp(config);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { authProvider, dataProvider, db, auth, storage };
