import "./profile.css";
import { useEffect, useState } from "react";
import {
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updatePassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { json, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { auth, db, storage } from "../../firebase";
import { async } from "@firebase/util";

export const Fetch = () => {
  const [userData, setUserData] = useState({ email: "", name: "" });
  const handle = async (e) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const arr = [
        {
          email: docSnap.data().email,
        },
        {
          name: docSnap.data().displayName,
        },
      ];
      console.log(JSON.stringify(arr));
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div>
      <h1>Fetch Data</h1>
      <button onClick={handle}>fetch</button>
    </div>
  );
};

const Profile = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [businessData, setBusinessData] = useState([{ name: "" }]);
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let arr = [];
    const mydata = async () => {
      const docSnap = await getDocs(collection(db, "businesses"));
      docSnap.forEach((d) => {
        arr.push(d.data());
      });
      setBusinessData(arr);
    };
    mydata();
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

  // console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="bottom">
        <div className="left">
          <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
        </div>
        <div className="right">
          <form onSubmit={handleAdd}>
            <div className="formInput">
              {/* <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label> */}
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            {businessData.map((data) => (
              <div>{data.name}</div>
            ))}
            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={handleInput}
                />
              </div>
            ))}
            <button disabled={per !== null && per < 100} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const UpdateProfile = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [editdata, setEditData] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const mydata = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      setEditData(docSnap.data());
    };
    mydata();

    // console.log(mydata);
    // setEditData('singtuang@gmailc');
    //   const uploadFile = () => {
    //     const name = new Date().getTime() + file.name;

    //     console.log(name);
    //     const storageRef = ref(storage, file.name);
    //     const uploadTask = uploadBytesResumable(storageRef, file);

    //     uploadTask.on(
    //       "state_changed",
    //       (snapshot) => {
    //         const progress =
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log("Upload is " + progress + "% done");
    //         setPerc(progress);
    //         switch (snapshot.state) {
    //           case "paused":
    //             console.log("Upload is paused");
    //             break;
    //           case "running":
    //             console.log("Upload is running");
    //             break;
    //           default:
    //             break;
    //         }
    //       },
    //       (error) => {
    //         console.log(error);
    //       },
    //       () => {
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //           setData((prev) => ({ ...prev, img: downloadURL }));
    //         });
    //       }
    //     );
    //   };
    //   file && uploadFile();
  }, []);

  // console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(auth.currentUser, data.password);
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (err) {
      console.log("err");
      console.log(err);
    }
  };

  return (
    <Card>
      <h1>{title}</h1>
      <CardContent>
        {/* <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            /> */}
        <div className="right">
          <form onSubmit={handleAdd}>
            <div className="formInput">
              {/* <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label> */}
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="formInput">
              {/* <label>My Profile</label> */}
              <input
                id="name"
                type="text"
                placeholder="Update Your Name"
                value={editdata.displayName}
                onChange={handleInput}
              />
              <input
                id="email"
                type="email"
                placeholder="Update Your Email"
                value={editdata.email}
                onChange={handleInput}
              />
              <input
                id="password"
                type="password"
                placeholder="Chang Your Password"
                value={editdata.password}
                onChange={handleInput}
              />
            </div>
            <button disabled={per !== null && per < 100} type="submit">
              Update
            </button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
