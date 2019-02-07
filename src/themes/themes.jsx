import { createMuiTheme } from "@material-ui/core/styles";
import { blue, red, green, purple } from "@material-ui/core/colors";

export const theme1 = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  }
});

export const theme2 = createMuiTheme({
  palette: {
    primary: green,
    secondary: purple
  }
});

// const theme = createMuiTheme({
//     palette: {
//       primary: {
//         // light: will be calculated from palette.primary.main,
//         main: '#ff4400',
//         // dark: will be calculated from palette.primary.main,
//         // contrastText: will be calculated to contrast with palette.primary.main
//       },
//       secondary: {
//         light: '#0066ff',
//         main: '#0044ff',
//         // dark: will be calculated from palette.secondary.main,
//         contrastText: '#ffcc00',
//       },
//       // error: will use the default color
//     },
//   });
