import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import ParkingLot from './ParkingLot';

const DashboardPage = ({ userData }) => (
  <Box>
    <ParkingLot userData={userData} />
  </Box>
);

export default DashboardPage;
