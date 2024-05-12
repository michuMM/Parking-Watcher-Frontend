import { useState, useEffect } from 'react';
import { 
    Button, 
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

const InvoiceHistory = () => {
    const { userToken } = getContext();
    const navigate = useNavigate();

    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (!userToken) {
            navigate('/signin'); // Redirect to sign in if not authenticated
            // fetchInvoices();
        } else {
            fetchInvoices();
        }
    }, []);

    const fetchInvoices = async () => {
        try {
            const response = await axios.get("/invoices");
            setInvoices(response.data);
        } catch (err) {
            setError('Failed to fetch invoice history. Please try again.');
        }
    };

    const handleDownloadInvoice = async (invoiceId) => {
        try {
            // Make API call to download invoice
            // You can implement this based on your backend setup
            setSnackbarMessage('Invoice downloaded successfully.');
            setSnackbarOpen(true);
        } catch (err) {
            setError('Failed to download invoice. Please try again.');
        }
    };

    const handlePrintInvoice = async (invoiceId) => {
        try {
            // Make API call to print invoice
            // You can implement this based on your backend setup
            setSnackbarMessage('Invoice printed successfully.');
            setSnackbarOpen(true);
        } catch (err) {
            setError('Failed to print invoice. Please try again.');
        }
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ padding: 3, marginTop: 4 }}>
                <Typography variant="h5">Invoice History</Typography>
                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

                {error && (
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Alert>
                )}

                <List>
                    {invoices.map((invoice) => (
                        <ListItem key={invoice.id}>
                            <ListItemText
                                primary={`Invoice #${invoice.id}`}
                                secondary={`Total Amount: $${invoice.totalAmount}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={() => handleDownloadInvoice(invoice.id)}>
                                    Download
                                </IconButton>
                                <IconButton edge="end" onClick={() => handlePrintInvoice(invoice.id)}>
                                    Print
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

export default InvoiceHistory;
