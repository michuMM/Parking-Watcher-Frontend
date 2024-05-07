import { useEffect, useState } from 'react'
import { 
    Button, 
    Container, 
    Divider, 
    Paper, 
    TextField, 
    Typography,
    Alert
} from "@mui/material";
import { 
    useLocation,
    Navigate,
    useNavigate
 } from 'react-router-dom'
import axios from '../lib/axios'
import { getContext } from '../context/ContextProvider';

const ChangePassword = () => {
    const { userToken } = getContext();
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (!userToken) navigate('/signin'); // Redirect to sign in if not authenticated
    // });

    const { setToken } = getContext(); 

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async ev => {
        ev.preventDefault();

        // Check if new password matches confirmation
        if (newPassword !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }

        try {
            const request = await axios.post("/auth/change-password", {
                oldPassword,
                newPassword
            });

            if (request.status === 200) {
                const requestedToken = request.data.access_token;
                setToken(requestedToken);
                setPasswordChanged(true);
            }
        } catch (err) {
            setError('Failed to change password. Please try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Container
                component="change_password"
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
                    <Typography variant="h5">Change Password</Typography>
                    <Divider sx={{ marginTop: 1}} />

                    {passwordMismatch && (
                        <Alert severity="error" sx={{ marginTop: 2 }}>
                            Passwords do not match. Please try again.
                        </Alert>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ marginTop: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {passwordChanged && (
                        <Alert severity="success" sx={{ marginTop: 2 }}>
                            Password changed successfully.
                        </Alert>
                    )}

                    <TextField
                        sx={{
                            marginTop: 2,
                        }}
                        id="oldPassword"
                        label="Old Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        onChange={ev => setOldPassword(ev.target.value)}
                    />
                    <TextField
                        sx={{
                            marginTop: 2,
                        }}
                        id="newPassword"
                        label="New Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        onChange={ev => setNewPassword(ev.target.value)}
                    />
                    <TextField
                        sx={{
                            marginTop: 2,
                        }}
                        id="confirmPassword"
                        label="Confirm New Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        onChange={ev => setConfirmPassword(ev.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 2 }}    
                    >
                        Change Password
                    </Button>
                </Paper>
            </Container>
        </form>
    );
}

export default ChangePassword;
