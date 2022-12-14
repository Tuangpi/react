import {
  Layout,
  AppBar,
  ToggleThemeButton,
  Menu,
  Sidebar,
  Logout,
  UserMenu,
} from "react-admin";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { createTheme, Box, Typography } from "@mui/material";
import { teal, pink, blueGrey } from "@mui/material/colors";
import { VerifiedUser, People, Label } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import SettingsIcon from "@mui/icons-material/Settings";
import RecordIcon from "@mui/icons-material/List";
import InvoiceIcon from "@mui/icons-material/LibraryBooks";
import { auth } from "../firebase";
import { MyError } from "../component/ErrorPage/error";
import useMediaQuery from "@mui/material/useMediaQuery";

const darkTheme = {
  palette: { mode: "dark" },
};
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

const MyMenu = () => (
  <Menu>
    <Menu.DashboardItem />
    <Menu.Item to="/users" primaryText="Users" leftIcon={<VerifiedUser />} />
    <Menu.Item to="/customers" primaryText="Customers" leftIcon={<People />} />
    <Menu.Item
      to={{
        pathname: "/records",
        search: `filter=${JSON.stringify({ user_id: auth.currentUser.uid })}`,
      }}
      primaryText="Records"
      leftIcon={<RecordIcon />}
    />
    <Menu.Item
      to="/invoices"
      primaryText="Invoices"
      leftIcon={<InvoiceIcon />}
    />
    <Menu.Item to="/businesses" primaryText="Business" leftIcon={<Label />} />
  </Menu>
);

const MyUserIcon = () => (
  <Avatar
    sx={{
      height: 30,
      width: 30,
    }}
    src="https://marmelab.com/images/avatars/adrien.jpg"
  />
);

const Configuration = React.forwardRef((props, ref) => {
  return (
    <MenuItem
      ref={ref}
      component={Link}
      // It's important to pass the props to allow MUI to manage the keyboard navigation
      {...props}
      to="/my-profile"
    >
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText>My Profile</ListItemText>
    </MenuItem>
  );
});

const MyUserMenu = (props) => {
  return (
    <UserMenu {...props} icon={<MyUserIcon />}>
      <Configuration />
      <Logout />
    </UserMenu>
  );
};

const MyAppBar = (props) => (
  <AppBar {...props} userMenu={<MyUserMenu />}>
    <Box flex="1">
      <Typography variant="h6" id="react-admin-title"></Typography>
    </Box>
    {/* <ToggleThemeButton lightTheme={mytheme} darkTheme={darkTheme} /> */}
  </AppBar>
);
{
  /* <Sidebar
        sx={{
          backgroundColor: "#f1f1f1",
        }}
        {...props}
      /> */
}
const MySidebar = (props) => {
  const isSmall = useMediaQuery("(max-width:600px)");
  return (
    <>
      {isSmall ? (
        <div>
          <div>Home</div>
          <div>Customers</div>
          <div>Profile</div>
        </div>
      ) : (
        <Sidebar
          sx={{
            backgroundColor: "#f1f1f1",
          }}
          {...props}
        />
      )}
    </>
  );
};

const MyLayout = (props) => (
  <Layout
    {...props}
    appBar={MyAppBar}
    menu={MyMenu}
    sidebar={MySidebar}
    error={MyError}
  />
);

export default MyLayout;
