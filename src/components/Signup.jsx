import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Divider,
    Box,
    Button
} from '@mui/material'
import * as yup from "yup"

const schema = yup.object({
    username: yup
    .string()
    .required("Nazwa użytkownika jest wymagana"),
    email: yup
    .string()
    .email("Ten email jest niepoprawny")
    .required("email jest wymagany")
});

const Signup = () => {
    const [startDate, setStartDate] = useState(null);
    
    return (
        <form>
            <Container 
                component="sign_up" 
                maxWidth="sm"
                width="100%"
                height="100%"
            >
                <Paper sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 500,
                    justifyContent: 'center',
                    marginTop: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },
                    padding: 3,
                    
                }}>
                    <Typography variant="h5">Zarejestruj się</Typography>
                    <Divider sx={{ marginTop: 1 }} />
                    <TextField sx={{
                        marginTop: 2,
                    }} id="outlined-basic" label="Nazwa użytkownika" variant="outlined" size="small" />
                    <TextField sx={{
                        marginTop: 2,
                    }} id="outlined-basic" label="Email" variant="outlined" size="small" />
                    <TextField 
                        sx={{
                            marginTop: 2
                        }} 
                        id="outlined-basic"
                        label="Hasło" 
                        variant="outlined"
                        size="small"
                        type="password"
                    />
                    <TextField 
                        sx={{
                            marginTop: 2
                        }} 
                        id="outlined-basic" 
                        label="Potwierdź hasło" 
                        variant="outlined" 
                        size="small" 
                        type="password"
                    />
                    <TextField 
                        sx={{
                            marginTop: 2,
                        }} id="outlined-basic" 
                        label="Nr telefonu" 
                        variant="outlined" 
                        size="small" 
                    />
                    <Box component="captcha" 
                        sx={{ 
                            marginTop: 2,
                            transformOrigin: '0 0',
                            transform: "scale(0.87)"
                        }}
                    >
                        <ReCAPTCHA
                            sitekey="6LeeSrQpAAAAAG4D2ZK0-6sAcu7AGFfdDmeVQ9Nf"
                        />
                    </Box>
                    <Button variant="contained" sx={{ marginTop: 2 }}>Zarejestruj się</Button>
                    <Typography sx={{
                        textAlign: "",
                        marginTop: 1.5
                    }}>
                        Masz już konto? Zaloguj się <a href="/signin">tutaj!</a>
                    </Typography>
                </Paper>
            </Container>
        </form>
    );
}

 export default Signup;