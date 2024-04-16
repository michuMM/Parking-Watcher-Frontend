import Navbar from "./components/Navbar"
import { ThemeProvider } from '@mui/material/styles';
import './index.css'
import Signup from "./components/Signup";
import theme from './theme/theme'


const App = () => {
  document.body.style.backgroundColor = "#f1f2f6";
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Signup />
    </ThemeProvider>
  );
}

export default App;
