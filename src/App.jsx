import Navbar from "./components/Navbar";
import { ThemeProvider } from '@mui/material/styles';
import './index.css';
import Signup from "./components/Signup";
import theme from './theme/theme';
import { 
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from 'react-router-dom';
import Signin from "./components/Signin";
import ForgotPassword from "./components/ForgotPassword";
import ProfileSettings from "./components/ProfileSettings";
import ChangePassword from "./components/ChangePassword";
import Feedback from "./components/Feedback";
import InvoiceHistory from "./components/InvoiceHistory";
import ReservationHistory from "./components/ReservationHistory";
import { ContextProvider } from "./context/ContextProvider";
import Home from "./components/Home";
import Dashboard from './components/Dashboard';


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
        path: "/",
        element: <Home />
      },
      {
        path: "/home",
        element: <Home />
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
        path: "/forgot-password",
        element: <ForgotPassword />
      }, 
      {
        path: "/change-password",
        element: <ChangePassword />
      },    
      {
        path: "/profile-settings",
        element: <ProfileSettings />
      }, 
      {
        path: "/feedback",
        element: <Feedback />
      },   
      {
        path: "/invoice-history",
        element: <InvoiceHistory />
      },
      {
        path: "/reservation-history",
        element: <ReservationHistory />
      },
      {
        path: "/contact",
        element: <></>  
      },
      {  
        path: "/about",
        element: <></>
      },
      {
        path: "/dashboard/*",
        element: <Dashboard />
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
