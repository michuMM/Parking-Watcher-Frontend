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
    useNavigate
 } from 'react-router-dom'
import axios from '../lib/axios'
import { getContext } from '../context/ContextProvider';

const ForgotPassword = () => {
    const { userToken } = getContext();
    const navigate = useNavigate();
    useEffect(() => {
        if(userToken) navigate('/')
    });
    const { setToken } = getContext(); 

    const [email, setEmail] = useState('');
    const [successfulPasswordReset, setSuccessfulPasswordReset] = useState(false);

    const locationData = useLocation();

    const handleSubmit = async ev => {
        ev.preventDefault();
        const request = await axios.post("/auth/forgot-password",
        {
            email
        });
        console.log(request);
        if(request.status === 200) {
            setSuccessfulPasswordReset(true);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Container
                component="forgot_password"
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
                    <Typography variant="h5">Forgot Password</Typography>
                    <Divider sx={{ marginTop: 1}} />

                    {successfulPasswordReset ? <>
                        <Alert 
                            severity="success"
                            sx={{
                                marginTop: 2
                            }}
                        >
                            An email with password reset instructions has been sent to your inbox.
                        </Alert>
                    </> : <></>} 

                    <TextField sx={{
                        marginTop: 2,
                    }}
                        id="email"
                        label="Email"
                        variant="outlined"
                        size="small"
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <Typography
                        sx={{
                            marginTop: 1,
                        }}
                    >
                        <a href="/signin">Go back to login</a>
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 2 }}    
                    >
                        Reset Password
                    </Button>
                </Paper>
            </Container>
        </form>
    );
}

export default ForgotPassword;
