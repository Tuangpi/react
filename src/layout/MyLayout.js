import { Layout, AppBar, ToggleThemeButton  } from 'react-admin';
import { createTheme, Box, Typography } from '@mui/material';
import indigo from '@mui/material/colors/indigo';
import pink from '@mui/material/colors/blueGrey';
import red from '@mui/material/colors/red';

const darkTheme = createTheme({
    palette: { mode: 'dark' },
});
const mytheme = {
    palette: {
        primary: indigo,
        secondary: pink,
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
    },
  };
const MyAppBar = props => (
    <AppBar {...props}>
        <Box flex="1">
            <Typography variant="h6" id="react-admin-title"></Typography>
        </Box>
        <ToggleThemeButton
            lightTheme={mytheme}
            darkTheme={darkTheme}
        />
    </AppBar>
);

const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;
export {MyLayout, MyAppBar};