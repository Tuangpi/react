import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
} from "react-admin-firebase";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const config = {
  apiKey: "AIzaSyDrULOx0Y934AYED63_afyilaQ8ZTTyrxo",
  authDomain: "react-tuto-e4657.firebaseapp.com",
  projectId: "react-tuto-e4657",
  storageBucket: "react-tuto-e4657.appspot.com",
  messagingSenderId: "632818805785",
  appId: "1:632818805785:web:4fc1d27c8a89802ec5ce88",
  databaseURL: "react-tuto-e4657.firebasedatabase.app",
};
const authProvider = FirebaseAuthProvider(config);
const dataProvider = FirebaseDataProvider(config);
const app = initializeApp(config);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { authProvider, dataProvider, db, auth, storage };
