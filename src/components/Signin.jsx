import { 
    Button, 
    Container, 
    Divider, 
    Paper, 
    TextField, 
    Typography,
    Alert
} from "@mui/material";
import { useLocation } from 'react-router-dom'

const Signin = () => {
    const locationData = useLocation();

    const handleSubmit = ev => ev.preventDefault();

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
                        id="username"
                        label="Username"
                        variant="outlined"
                        size="small"
                        
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
                </Paper>
            </Container>
        </form>
    );
}

export default Signin;