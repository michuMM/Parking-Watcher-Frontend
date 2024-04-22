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
import { 
    useLocation,
    Navigate
 } from 'react-router-dom'
import axios from '../lib/axios'
import { getContext } from '../context/ContextProvider';

const Signin = () => {
    const { setToken } = getContext(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successfulSignIn, setSuccessfulSignIn] = useState(false);

    const locationData = useLocation();

    const handleSubmit = async ev => {
        ev.preventDefault();
        const request = await axios.post("/auth/login",
        {
            email,
            password
        });
        if(request.status == 200) {
            const requestedToken = request.data.access_token;
            setToken(requestedToken);
            setSuccessfulSignIn(true);
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
                        Forgot password?
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
                        <Navigate to="/" />
                    )}
                </Paper>
            </Container>
        </form>
    );
}

export default Signin;