import Navbar from "./components/Navbar"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css'

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

const App = () => {
  document.body.style.backgroundColor = "#f1f2f6";
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>
  );
}

export default App;
