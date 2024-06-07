import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import { Audio } from 'react-loader-spinner';
import { Box } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoggedUser from './LoggedUser';
import ReservationsPage from './ReservationsPage';
import HistoryPage from './HistoryPage';
import SettingsPage from './SettingsPage';
import { getContext } from '../context/ContextProvider';
import DashboardPage from './DashboardPage';
import InvoicesPage from './InvoicesPage'

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const { userToken } = getContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/user');
      const { data } = response;
      setUserData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {userData && userToken ? (
        <Routes>
          <Route path="/" element={<LoggedUser userData={userData} />}>
            <Route index element={<DashboardPage userData={userData} />} />
            <Route path="reservations" element={<ReservationsPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
          </Route>
        </Routes>
      ) : userToken ? (
        <Box
          sx={{
            position: 'absolute',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Audio
            height="300"
            width="300"
            radius="5"
            color="#388ce4"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </Box>
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
};

export default Dashboard;
