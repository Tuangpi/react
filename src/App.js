import * as React from "react";
import { Admin, Resource, Login, CustomRoutes } from "react-admin";
import { Route } from "react-router";
import { dataProvider, authProvider } from "./firebase";
import { UserList, UserShow } from "./component/users";
import { UserCreate } from "./component/Users/UserCreate";
import { UserUpdate } from "./component/Users/UserUpdate";
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
} from "./component/Businesses/businesses";
import Dashboard from "./layout/Dashboard";
import Mylayout from "./layout/MyLayout";
import CustomerIcon from "@mui/icons-material/VerifiedUser";
import BusinessIcon from "@mui/icons-material/List";
import { blueGrey, teal, pink } from "@mui/material/colors";
import { BrowserRouter } from "react-router-dom/dist";
import {
  CustomerRecordCreate,
  CustomerRecordEdit,
  CustomerRecordList,
  CustomerRecordShow,
} from "./component/Customers/customerrecord";
import { InvoiceList } from "./component/Invoices/InvoiceList";
import { InvoiceCreate } from "./component/Invoices/InvoiceCreate";
import { InvoiceShow } from "./component/Invoices/InvoiceShow";

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
  <BrowserRouter>
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
      <Resource
        name="users"
        list={UserList}
        create
        show={UserShow}
        requireAuth
        recordRepresentation="name"
      />
      <CustomRoutes>
        <Route path="/my-profile" element={<UserUpdate />} />
        <Route path="/users/create" element={<UserCreate />} />
        {/* <Route path="/invoices/create" element={<InvoiceCreate />} /> */}
        {/* <Route path="/customers/create" element={<CustomerCreate />} /> */}
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
        name="records"
        // create={CustomerRecordCreate}
        edit={CustomerRecordEdit}
        list={CustomerRecordList}
        show={CustomerRecordShow}
      />
      <Resource
        name="invoices"
        list={InvoiceList}
        create={InvoiceCreate}
        show={InvoiceShow}
        icon={CustomerIcon}
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
  </BrowserRouter>
);
export default App;
