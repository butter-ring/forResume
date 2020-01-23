import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4d85f1',
      dark: '#6696f3',
    },
    secondary: {
      main: '#dedede',
      contrastText: '#ffffff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    action: {
      selected: '#4d85f1',
      hover: '#6696f3',
      // disabled: '#9B9B9B',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
