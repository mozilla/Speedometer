// Plain stand-in for the subset of the Material-UI v4 theme used by the page.
// Values are copied from platform-app-react/src/theme.js (with the polished
// lighten/darken calls pre-evaluated).
const PRIMARY = '#3489ca';
const SECONDARY = '#ff6350';

export const grey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
};

const theme = {
  palette: {
    primary: {
      light: '#85b8df',
      main: PRIMARY,
      dark: '#1f5279',
      lighter: '#add0ea',
      contrastText: '#fff',
    },
    secondary: {
      main: SECONDARY,
      contrastText: '#fff',
    },
    text: {
      primary: '#5A5F5F',
    },
    grey,
  },
};

export default theme;
