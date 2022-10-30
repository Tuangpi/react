import * as React from "react";
import { Admin, Resource, defaultTheme, ToggleThemeButton } from "react-admin";
import {
  FirebaseAuthProvider,
  FirebaseDataProvider,
} from "react-admin-firebase";
import {
  ProductList,
  ProductShow,
  ProductCreate,
  ProductEdit,
} from "./component/products/products";
import {
  CategoryList,
  CategoryShow,
  CategoryCreate,
  CategoryEdit,
} from "./component/categories/categories";
import Dashboard from "./Dashboard";
import { MyLayout } from "./layout/MyLayout";
import CategoryIcon from "@mui/icons-material/Category";
import ProductIcon from "@mui/icons-material/List";

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

const App = () => (
  <Admin
    disableTelemetry
    layout={MyLayout}
    title="React Tutorial Admin"
    dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="products"
      list={ProductList}
      create={ProductCreate}
      edit={ProductEdit}
      icon={ProductIcon}
      requireAuth
    />
    <Resource
      name="categories"
      list={CategoryList}
      create={CategoryCreate}
      edit={CategoryEdit}
      recordRepresentation="name"
    />
  </Admin>
);
export default App;
