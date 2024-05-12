import { useState } from 'react'
import { 
    Button, 
    Container, 
    Divider, 
    Paper, 
    TextField, 
    Typography,
    Alert
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import { getContext } from '../context/ContextProvider';

const Feedback = () => {
    const { userToken } = getContext();
    const navigate = useNavigate();

    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState('');
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    const handleSubmit = async ev => {
        ev.preventDefault();

        if (!userToken) {
            setError('You must be logged in to submit feedback.');
            return;
        }

        try {
            await axios.post("/feedback/submit", { feedback });

            setFeedback('');
            setFeedbackSubmitted(true);
        } catch (err) {
            setError('Failed to submit feedback. Please try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Container
                component="feedback"
                maxWidth="sm"
                width="100%"
                height="100%"
            >
                <Paper sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 500,
                    justifyContent: "center",
                    marginTop: {
                        xs: 3,
                        sm: 4,
                        md: 5,
                    },
                    padding: 3,
                }}>
                    <Typography variant="h5">Feedback</Typography>
                    <Divider sx={{ marginTop: 1}} />

                    {error && (
                        <Alert severity="error" sx={{ marginTop: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {feedbackSubmitted && (
                        <Alert severity="success" sx={{ marginTop: 2 }}>
                            Thank you for your feedback!
                        </Alert>
                    )}

                    <TextField
                        sx={{
                            marginTop: 2,
                        }}
                        id="feedback"
                        label="Your Feedback"
                        variant="outlined"
                        size="small"
                        multiline
                        rows={4}
                        value={feedback}
                        onChange={ev => setFeedback(ev.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 2 }}    
                    >
                        Submit Feedback
                    </Button>
                </Paper>
            </Container>
        </form>
    );
}

export default Feedback;
