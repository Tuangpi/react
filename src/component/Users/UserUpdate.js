import React from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, storage } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updatePassword } from "firebase/auth";
import { useEffect, useState } from "react";

export const UserUpdate = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [businessData, setBusinessData] = useState([{ name: "" }]);
  const [per, setPerc] = useState(null);
  const [editdata, setEditData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const mydata = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      setEditData(docSnap.data());
    };
    mydata();
    let arr = [];
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const phone = e.target[2].value;
    // const file = e.target[3].files[0];
    const password = e.target[4].value;
    try {
      await updatePassword(auth.currentUser, password);
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        name: name,
        email: email,
        phone: phone,
      });
      navigate(-1);
    } catch (err) {
      console.log("err");
      console.log(err);
    }
  };
  return (
    <div>
      <img
        src={
          file
            ? URL.createObjectURL(file)
            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
        }
        alt="Profile Picture"
        style={{ height: "120px" }}
      />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="User Name" value={editdata.name} />
        <input type="email" placeholder="Email" value={editdata.email} />
        <input type="text" placeholder="Phone Number" value={editdata.phone} />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input type="password" placeholder="Change Your Password" />
        <button>Submit</button>
      </form>
    </div>
  );
};
