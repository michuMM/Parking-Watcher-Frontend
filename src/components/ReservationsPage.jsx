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
  IconButton,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EventNoteIcon from '@mui/icons-material/EventNote';
import axios from '../lib/axios';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [parkingNames, setParkingNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/reservations'); 
        const reservationsData = response.data;

        const parkingNamesData = {};

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
        console.error('Błąd podczas pobierania rezerwacji:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (reservationId) => {
    try {
      await axios.delete(`/reservations/${reservationId}/`);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== reservationId)
      );
    } catch (error) {
      console.error('Error while deleting reservations:', error);
    }
  };

  const handleOpenDialog = (reservationId) => {
    setReservationToDelete(reservationId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setReservationToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (reservationToDelete) {
      handleDelete(reservationToDelete);
    }
    handleCloseDialog();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Active reservations
      </Typography>
      {loading ? (
        <Typography>Ładowanie...</Typography>
      ) : reservations.filter(res => res.status === 'current').length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,
          }}
        >
          <EventNoteIcon sx={{ fontSize: 100, color: 'gray' }} />
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            You don't have any active reservations yet.
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Parking Place ID</TableCell>
                <TableCell>Parking Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (reservation.status == "current" &&
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.parking_place_id}</TableCell>
                  <TableCell>{parkingNames[reservation.parking_place_id] || 'Loading...'}</TableCell>
                  <TableCell>{reservation.status}</TableCell>
                  <TableCell>{new Date(reservation.start_time).toLocaleString()}</TableCell>
                  <TableCell>{new Date(reservation.end_time).toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleOpenDialog(reservation.id)}
                      sx={{
                        color: '#f44336',
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this reservation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReservationsPage;