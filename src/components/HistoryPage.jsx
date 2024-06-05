import React from 'react';
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
} from '@mui/material';

const mockReservations = [
  {
    id: 1,
    date: '2024-06-01',
    time: '10:00 AM - 12:00 PM',
    location: '55 West 46th Street, New York',
    spot: 'P3',
  },
  {
    id: 2,
    date: '2024-06-03',
    time: '01:00 PM - 03:00 PM',
    location: 'Raimundo Fernández Villaverde 57, Madrid',
    spot: 'S6',
  },
  {
    id: 3,
    date: '2024-06-05',
    time: '09:00 AM - 11:00 AM',
    location: 'Royal Tulip Grzybowska 49, Warsaw',
    spot: 'P5',
  },
  {
    id: 4,
    date: '2024-06-07',
    time: '02:00 PM - 04:00 PM',
    location: 'Tiefgarage Friedrichstadt-Passagen, Berlin',
    spot: 'P8',
  },
  {
    id: 5,
    date: '2024-06-10',
    time: '11:00 AM - 01:00 PM',
    location: 'Barceló s/n, Madrid',
    spot: 'S3',
  },
  {
    id: 6,
    date: '2024-06-12',
    time: '08:00 AM - 10:00 AM',
    location: 'Parking NFM Wrocław, Wrocław',
    spot: 'S1',
  },
  {
    id: 7,
    date: '2024-06-14',
    time: '05:00 PM - 07:00 PM',
    location: '55 West 46th Street, New York',
    spot: 'P1',
  },
  {
    id: 8,
    date: '2024-06-16',
    time: '12:00 PM - 02:00 PM',
    location: 'Raimundo Fernández Villaverde 57, Madrid',
    spot: 'S4',
  },
  {
    id: 9,
    date: '2024-06-18',
    time: '09:00 AM - 11:00 AM',
    location: 'Royal Tulip Grzybowska 49, Warsaw',
    spot: 'P9',
  },
  {
    id: 10,
    date: '2024-06-20',
    time: '03:00 PM - 05:00 PM',
    location: 'Tiefgarage Friedrichstadt-Passagen, Berlin',
    spot: 'P10',
  },
];

const HistoryPage = () => (
  <Box sx={{ padding: 3 }}>
    <Typography variant="h4" gutterBottom>
      Reservation History
    </Typography>
    <Grid container spacing={2}>
      {mockReservations.map((reservation) => (
        <Grid item xs={12} sm={6} md={4} key={reservation.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Reservation #{reservation.id}
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Date" secondary={reservation.date} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Time" secondary={reservation.time} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Location" secondary={reservation.location} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Spot" secondary={reservation.spot} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default HistoryPage;