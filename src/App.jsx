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

const Layout = () => (
  <>
    <Navbar />
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
        element: <></>
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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
