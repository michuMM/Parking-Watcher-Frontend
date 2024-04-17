import { useState } from "react";
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
    username: yup.string().min(10).required(),
    email: yup.string().email().required(),
    password: yup.string().min(10).required(),
    phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "must be only digits")
    .min(9, "phone number must have 9 digits")
    .max(9, "phone number must have 9 digits")
    .required("phone number is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "confirmed password doesn't match").required()
});

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [startDate, setStartDate] = useState(null);

    const uppercaseFirstLetter = str => {
        if(str) 
            return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const handleChange = ev => {
        const {id, value} = ev.target;

        setFormData({
          ...formData,
          [id]: value,
        });
    };
    
    const handleSubmit = async ev => {
        ev.preventDefault();
    
        try {
          await schema.validate(formData, {abortEarly: false});
          console.log("Form Submitted", formData);
        } catch (error) {
            const newErrors = {};
            console.log(error)    
            error.inner.forEach(err => newErrors[err.path] = err.message);
            
            setErrors(newErrors);
            console.log(errors);
        }
    };

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
                        xs: 3,
                        sm: 4,
                        md: 5
                    },
                    padding: 3,
                    
                }}>
                    <Typography variant="h5">Zarejestruj się</Typography>
                    <Divider sx={{ marginTop: 1 }} />
                    <TextField sx={{
                            marginTop: 2,
                    }} 
                        error={errors.username}
                        id="username" 
                        label="Nazwa użytkownika" 
                        variant="outlined" 
                        size="small" 
                        onChange={handleChange}
                        component="essa"
                        helperText={uppercaseFirstLetter(errors.username)}
                    />
                    <TextField 
                        error={Boolean(errors.email)}
                        sx={{
                            marginTop: 2,
                        }} 
                        id="email" 
                        label="Email" 
                        variant="outlined" 
                        size="small" 
                        onChange={handleChange}
                        helperText={uppercaseFirstLetter(errors.email)}
                    />
                    <TextField
                        error={Boolean(errors.password)} 
                        sx={{
                            marginTop: 2
                        }} 
                        id="password"
                        label="Hasło" 
                        variant="outlined"
                        size="small"
                        type="password"
                        onChange={handleChange}
                        helperText={uppercaseFirstLetter(errors.password)}
                    />
                    <TextField
                        error={Boolean(errors.confirmPassword)} 
                        sx={{
                            marginTop: 2
                        }} 
                        id="confirmPassword" 
                        label="Potwierdź hasło" 
                        variant="outlined" 
                        size="small" 
                        type="password"
                        onChange={handleChange}
                        helperText={uppercaseFirstLetter(errors.confirmPassword)}
                    />
                    <TextField
                        error={Boolean(errors.phoneNumber)} 
                        sx={{
                            marginTop: 2,
                        }} 
                        id="phoneNumber" 
                        label="Nr telefonu" 
                        variant="outlined" 
                        size="small" 
                        onChange={handleChange}
                        helperText={uppercaseFirstLetter(errors.phoneNumber)}
                    />
                    <Box component="captcha" 
                        sx={{ 
                            marginTop: 2,
                            transformOrigin: '0 0',
                            transform: "scale(0.87)"
                        }}
                    >
                    </Box>
                    <Button 
                        type="submit"
                        variant="contained" 
                        sx={{ marginTop: 1 }}
                        onClick={handleSubmit}
                    >Zarejestruj się</Button>
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

 export default Signup