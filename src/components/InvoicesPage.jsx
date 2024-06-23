import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  useMediaQuery,
  useTheme,
  Alert,
  TextField,
  Grid,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import axios from '../lib/axios';

const InvoicesPage = ({ userData }) => {
  const [reservations, setReservations] = useState([]);
  const [parkingNames, setParkingNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/reservations');
        const reservationsData = response.data;

        const parkingNamesData = {};

        // Fetch parking names for each reservation
        await Promise.all(
          reservationsData.map(async (reservation) => {
            const parkingPlaceId = reservation.parking_place_id;
            if (!parkingNamesData[parkingPlaceId]) {
              const parkingResponse = await axios.get(`/parking-places/${parkingPlaceId}/parking`);
              parkingNamesData[parkingPlaceId] = parkingResponse.data.address;
            }
          })
        );

        setParkingNames(parkingNamesData);
        setReservations(reservationsData);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
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

  const generatePDF = (reservation) => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = '/src/assets/png/logo-color.png';

    doc.addImage(logo, 'PNG', 55, -10, 100, 100); // Add logo to the PDF centered
    doc.setFontSize(20);
    doc.text(105, 70, `Invoice for Reservation #${reservation.id}`, null, null, 'center');
    doc.setFontSize(12);
    doc.text(105, 90, `Name: ${userData.name}`, null, null, 'center');
    doc.text(105, 100, `Email: ${userData.email}`, null, null, 'center');
    doc.text(105, 110, `Date: ${reservation.start_time.split('T')[0].split(' ')[0]}`, null, null, 'center');
    doc.text(105, 120, `Time: ${new Date(reservation.start_time).toLocaleTimeString()} - ${new Date(reservation.end_time).toLocaleTimeString()}`, null, null, 'center');
    doc.text(105, 130, `Location: ${parkingNames[reservation.parking_place_id]}`, null, null, 'center');
    doc.text(105, 140, `Status: ${reservation.status}`, null, null, 'center');
    doc.text(105, 150, `Price: $${calculatePrice(reservation.start_time, reservation.end_time)}`, null, null, 'center');
    doc.text(105, 160, `Account number: PL49 1020 2892 2276 3005 0000 0000`, null, null, 'center');

    doc.save(`invoice_${reservation.id}.pdf`);
  };

  const filteredReservations = reservations.filter((reservation) => {
    const startTime = new Date(reservation.start_time);
    if (startDate && startTime < new Date(startDate)) return false;
    if (endDate && startTime > new Date(endDate)) return false;
    return true;
  });

  return (
    <Box sx={{ padding: isSmDown ? 2 : 3 }}>
      <Typography variant="h4" gutterBottom>
        Invoices
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : reservations.length === 0 ? (
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No invoices available.
          </Typography>
          <Typography variant="body1">
            You have no reservations yet, so there are no invoices to download.
          </Typography>
        </Paper>
      ) : (
        <Box>
          <Alert severity="info" sx={{ marginBottom: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Note:
            </Typography>
            <Typography variant="body2">
              Invoices will disappear after payment and approval by the admin.
            </Typography>
          </Alert>
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="reservations table">
              <TableHead>
                <TableRow>
                  <TableCell>Reservation ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Download</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.id}</TableCell>
                    <TableCell>{reservation.start_time.split('T')[0]}</TableCell>
                    <TableCell>
                      {`${new Date(reservation.start_time).toLocaleString()} - ${new Date(reservation.end_time).toLocaleString()}`}
                    </TableCell>
                    <TableCell>{parkingNames[reservation.parking_place_id] || 'Loading...'}</TableCell>
                    <TableCell>{reservation.status}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={() => generatePDF(reservation)}
                      >
                        Download PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default InvoicesPage;
