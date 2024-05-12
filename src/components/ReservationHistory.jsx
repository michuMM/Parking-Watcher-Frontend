import { useState, useEffect } from 'react';
import { 
    Container, 
    Divider, 
    Paper, 
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Snackbar,
    Alert
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import { getContext } from '../context/ContextProvider';

const ReservationHistory = () => {
    const { userToken } = getContext();
    const navigate = useNavigate();

    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (!userToken) {
            navigate('/signin'); // Redirect to sign in if not authenticated
            // fetchReservations();
        } else {
            fetchReservations();
        }
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get("/reservations");
            setReservations(response.data);
        } catch (err) {
            setError('Failed to fetch reservation history. Please try again.');
        }
    };

    const handleCancelReservation = async (reservationId) => {
        try {
            // Make API call to cancel reservation
            // You can implement this based on your backend setup
            setSnackbarMessage('Reservation cancelled successfully.');
            setSnackbarOpen(true);
        } catch (err) {
            setError('Failed to cancel reservation. Please try again.');
        }
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ padding: 3, marginTop: 4 }}>
                <Typography variant="h5">Reservation History</Typography>
                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

                {error && (
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Alert>
                )}

                <List>
                    {reservations.map((reservation) => (
                        <ListItem key={reservation.id}>
                            <ListItemText
                                primary={`Reservation #${reservation.id}`}
                                secondary={`Date: ${reservation.date}, Time: ${reservation.time}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={() => handleCancelReservation(reservation.id)}>
                                    Cancel
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default ReservationHistory;
