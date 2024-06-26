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

const Signin = () => {
    const { userToken } = getContext();
    const navigate = useNavigate();
    useEffect(() => {
        if(userToken) navigate('/')
    });
    const { setToken } = getContext(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successfulSignIn, setSuccessfulSignIn] = useState(false);
    const [error, setError] = useState(null);

    const locationData = useLocation();

    const handleSubmit = async ev => {
        if(error) setError(null)
        ev.preventDefault();
        try {
            const request = await axios.post("/auth/login",
            {
                email,
                password
            });
            if(request.status == 200) {
                const requestedToken = request.data.access_token;
                setToken(requestedToken);
                console.log(requestedToken)
                setSuccessfulSignIn(true);
            }
        }
        catch(err) {
            setError(err.response.data.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Container
                component="sign_in"
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
                    <Typography variant="h5">Sign In</Typography>
                    <Divider sx={{ marginTop: 1}} />

                    {(locationData.state && locationData.state.signedUp) ? <>
                        <Alert 
                            severity="success"
                            sx={{
                                marginTop: 2
                            }}
                        >
                            Account created successfully! Now you can sign in
                        </Alert>
                    </> : <></>} 
                    {error ? <>
                        <Alert 
                            severity="error"
                            sx={{
                                marginTop: 2
                            }}
                        >
                            {error}
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
                    <TextField
                        sx = {{
                            marginTop: 2,
                        }}
                        id="password"
                        label="Password"
                        variant="outlined"
                        size="small"
                        type="password"
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <Typography
                        sx={{
                            marginTop: 1,
                        }}
                    >
                        <a href="/forgot-password">Forgot password?</a>
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 2 }}    
                    >
                        Sign In
                    </Button>
                    <Typography sx={{
                        textAlign: "",
                        marginTop: 1.5
                    }}>
                        Not a member? <a href="/signup">Signup now</a> 
                    </Typography>
                    {successfulSignIn && (
                        <Navigate to="/home" />
                    )}
                </Paper>
            </Container>
        </form>
    );
}

export default Signin;