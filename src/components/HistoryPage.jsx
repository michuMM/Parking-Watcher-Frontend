import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import axios from '../lib/axios';

const HistoryPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState({});
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchExpiredReservations = async () => {
      try {
        const response = await axios.get('/reservations');
        const expiredReservations = response.data.filter(
          (reservation) => reservation.status === 'expired'
        );

        const locationData = {};
        await Promise.all(
          expiredReservations.map(async (reservation) => {
            const parkingPlaceId = reservation.parking_place_id;
            if (!locationData[parkingPlaceId]) {
              const parkingResponse = await axios.get(`/parking-places/${parkingPlaceId}/parking`);
              locationData[parkingPlaceId] = parkingResponse.data.address;
            }
          })
        );

        setLocations(locationData);
        setReservations(expiredReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiredReservations();
  }, []);

  const calculatePrice = (st, et) => {
    if (!st || !et) return 0;

    const start = new Date(st);
    const end = new Date(et);

    const diffMs = end - start;

    const diffHours = diffMs / (1000 * 60 * 60);

    let price = 0;
    if (diffHours <= 2) {
      price = diffHours * 5;
    } else {
      price = 2 * 5 + (diffHours - 2) * 3;
    }
    return price.toFixed(2); 
  };

  return (
    <Box sx={{ padding: isSmDown ? 2 : 3 }}>
      <Typography variant="h4" gutterBottom>
        Reservation History
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : reservations.length === 0 ? (
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            You don't have any reservations yet.
          </Typography>
          <Typography variant="body1">
            It looks like you don't have any expired reservations yet.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {reservations.map((reservation, idx) => (
            <Grid item xs={12} sm={6} md={4} key={reservation.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    Reservation #{idx+1}
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Date and Time" secondary={`${new Date(reservation.start_time).toLocaleString()} - ${new Date(reservation.end_time).toLocaleString()}`} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Location" secondary={locations[reservation.parking_place_id] || 'Loading...'} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Price" secondary={`$${calculatePrice(reservation.start_time, reservation.end_time) || 'Loading...'}`} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Parking place number" secondary={reservation.parking_place_id} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="Status" secondary={'expired'} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default HistoryPage;
