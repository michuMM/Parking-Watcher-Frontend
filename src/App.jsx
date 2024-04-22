import Navbar from "./components/Navbar"
import { ThemeProvider } from '@mui/material/styles';
import './index.css'
import Signup from "./components/Signup";
import theme from './theme/theme'
import { 
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom'
import Signin from "./components/Signin";
import { ContextProvider } from "./context/ContextProvider";
import Home from "./components/Home";

const Layout = () => (
  <>
    <Navbar />
    <Home />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <></>
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/contact",
        element: <></>  
      },
      {  
        path: "/about",
        element: <></>
      }
    ]
  },
]);

const App = () => {
  document.body.style.backgroundColor = "#f1f2f6";
  
  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ContextProvider>
  );
}

export default App;
