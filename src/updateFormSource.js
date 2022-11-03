import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase";

const mydata = async () => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const arr = [
        {
            "email": docSnap.data().email
        },
        {
            "name": docSnap.data().displayName
        }
    ]
    return arr;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const updateformdata = mydata;