import * as React from "react";
import { Admin, Resource, Login, CustomRoutes } from "react-admin";
import { Route } from "react-router";
import { dataProvider, authProvider, auth } from "./firebase";
import { UserList, UserShow } from "./component/users";
import { UserCreate } from "./component/Users/UserCreate";
import {
  CustomerList,
  CustomerCreate,
  CustomerEdit,
  CustomerShow,
} from "./component/Customers/customers";
import {
  BusinessList,
  BusinessCreate,
  BusinessEdit,
  BusinessShow,
} from "./component/businesses";
import { userInputs } from "./formSource";
import Dashboard from "./layout/Dashboard";
import Mylayout from "./layout/MyLayout";
import CustomerIcon from "@mui/icons-material/VerifiedUser";
import BusinessIcon from "@mui/icons-material/List";
import { blueGrey, teal, pink } from "@mui/material/colors";
import { Fetch } from "./component/not use/profile";
import { UserUpdate } from "./component/Users/UserUpdate";

const mytheme = {
  palette: {
    primary: teal,
    secondary: blueGrey,
    error: pink,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
};

const MyLoginPage = () => (
  <Login
    // A random image that changes everyday
    backgroundImage="https://source.unsplash.com/random"
  />
);

const App = () => (
  <Admin
    loginPage={MyLoginPage}
    title="React Tutorial Admin"
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
    layout={Mylayout}
    theme={mytheme}
    requireAuth
  >
    <Resource name="users" list={UserList} create show={UserShow} requireAuth recordRepresentation="name" />
    {/* {console.log(dataProvider.getOne("users", { id: auth.currentUser.uid }).then(response => console.log(response.data.id)))} */}
    <CustomRoutes>
      <Route path="/users/create" element={<UserCreate />} />
      <Route path="/users/update" element={<UserUpdate />} />
      {/* <Route
        path="/users/list"
        element={<Profile inputs={userInputs} title="Add New User" />}
      /> */}
      {/* <Route
        path="/users/create"
        element={<Profile inputs={userInputs} title="Add New User" />}
      /> */}
      <Route path="/users/create" element={<UserCreate />} />
      <Route path="/my-profile" element={<UserUpdate />} />
      <Route path="/mydoc" element={<Fetch />} />
    </CustomRoutes>
    <Resource
      name="businesses"
      list={BusinessList}
      create={BusinessCreate}
      edit={BusinessEdit}
      show={BusinessShow}
      icon={BusinessIcon}
      recordRepresentation="name"
      requireAuth
    />
    <Resource
      name="customers"
      list={CustomerList}
      create={CustomerCreate}
      edit={CustomerEdit}
      show={CustomerShow}
      icon={CustomerIcon}
      recordRepresentation="name"
      requireAuth
    />
  </Admin>
);
export default App;
