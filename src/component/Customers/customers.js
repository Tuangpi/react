import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  DeleteButton,
  TextInput,
  Create,
  SimpleShowLayout,
  Show,
  ShowButton,
  BooleanField,
  BooleanInput,
  ReferenceInput,
  NonEmptyReferenceField,
} from "react-admin";
import { Favorite } from "@mui/icons-material";
import { auth, db, storage } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dataProvider } from "../../firebase";
import { CustomerFilterSideBar } from "./customerfiltersidebar";
import CustomInput from "./custominput";

export const Fetch = () => {
  const handle = async (e) => {
    const q = query(
      collection(db, "businesses"),
      where("user_id", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };
  return (
    <div>
      <h1>Fetch Data</h1>
      <button onClick={handle}>fetch</button>
    </div>
  );
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
  }
});

const customerFilters = [
  <TextInput source="name" label="Search Name" alwaysOn />,
];
const CustomerList = () => {
  // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List aside={<CustomerFilterSideBar />}>
      {/* {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.address}
          
        />
      ) : ( */}
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <TextField source="address" />
        <BooleanField source="paid" />
        <ShowButton basePath="/customers" />
        <EditButton basePath="/customers" />
        <DeleteButton basePath="/customers" />
      </Datagrid>
      {/* )} */}
    </List>
  );
};
const CustomerShow = () => (
  <Show>
    <SimpleShowLayout>
      <BooleanField
        source="paid"
        valueLabelTrue="Paid"
        valueLabelFalse="Unpaid"
      />
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="address" />
    </SimpleShowLayout>
  </Show>
);
const CustomerCreate = (props) => (
  <Create title="Create a Customer" {...props}>
    <SimpleForm>
      <CustomInput source="user_id" defaultValue={auth.currentUser.uid} />
      <TextInput source="name" />
      <TextInput source="address" />
      <BooleanInput source="paid" />
    </SimpleForm>
  </Create>
);

const CustomerEdit = (props) => (
  <Edit title="Edit a Customer" {...props}>
    <SimpleForm>
      <BooleanInput source="paid" options={{ checkedIcon: <Favorite /> }} />
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="address" />
    </SimpleForm>
  </Edit>
);

export { CustomerEdit, CustomerCreate, CustomerList, CustomerShow };
