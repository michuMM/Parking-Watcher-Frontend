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

const ProfileSettings = () => {
    const { userToken } = getContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userToken) navigate('/signin'); // Redirect to sign in if not authenticated
    });

    const { setToken } = getContext(); 

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [profileUpdated, setProfileUpdated] = useState(false);

    // Function to fetch current user profile data
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get("/user/profile");
            const { username, email } = response.data;
            setUsername(username);
            setEmail(email);
        } catch (error) {
            setError('Failed to fetch user profile.');
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []); // Fetch user profile data on component mount

    const handlePasswordChange = () => {
        navigate('/change-password');
    };

    const handleUploadProfilePicture = () => {
        // Handle profile picture upload logic
        // You can implement this based on your specific requirements
    };

    const handleSubmit = async ev => {
        ev.preventDefault();

        try {
            const request = await axios.post("/auth/update-profile", {
                username,
                email
            });

            if (request.status === 200) {
                const requestedToken = request.data.access_token;
                setToken(requestedToken);
                setProfileUpdated(true);
            }
        } catch (err) {
            setError('Failed to update profile. Please try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Container
                component="profile_settings"
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
                    <Typography variant="h5">Profile Settings</Typography>
                    <Divider sx={{ marginTop: 1}} />

                    {error && (
                        <Alert severity="error" sx={{ marginTop: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {profileUpdated && (
                        <Alert severity="success" sx={{ marginTop: 2 }}>
                            Profile updated successfully.
                        </Alert>
                    )}
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleUploadProfilePicture}
                        sx={{ marginTop: 2 }}
                    >
                        Upload Profile Picture
                    </Button>
                    <TextField
                        sx={{
                            marginTop: 2,
                        }}
                        id="username"
                        label="Username"
                        variant="outlined"
                        size="small"
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
                    />
                    <TextField
                        sx={{
                            marginTop: 2,
                        }}
                        id="email"
                        label="Email"
                        variant="outlined"
                        size="small"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 2 }}    
                    >
                        Update Profile
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handlePasswordChange}
                        sx={{ marginTop: 2 }}
                    >
                        Change Password
                    </Button>

                    
                </Paper>
            </Container>
        </form>
    );
}

export default ProfileSettings;
