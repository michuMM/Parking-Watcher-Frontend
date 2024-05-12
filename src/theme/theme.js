import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: "#378CE7",
        light: "#67C6E3",
        dark: "#5356FF",
        contrastText: "white"
      }
    },
    typography: {
        title: {
          "fontFamily": "Ubuntu Sans",
          "fontWeight": 800
        },
        paragraph: {
          "fontFamily": "Ubuntu Sans",
          "fontWeight": 300
        }

    }
});

export default theme;