import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: "#378CE7",
        light: "67C6E3",
        dark: "5356FF",
        contrastText: "white"
      }
    },
    typography: {
      "fontFamily": "Roboto Condensed",
      "fontSize": 16,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500
     }
});

export default theme;