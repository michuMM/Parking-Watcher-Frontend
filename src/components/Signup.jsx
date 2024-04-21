import { useState } from "react";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Divider,
    //Alert,
    Button
} from '@mui/material'
import * as yup from "yup"
import { 
    Navigate,
    useLocation
} from 'react-router-dom'
import axios from 'axios'

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
    confirmPassword: yup.string().
    oneOf([yup.ref("password")], "confirmed password doesn't match")
    .required("Confirmed password is required")
});

const Signup = () => {
    const apiUrl = import.meta.env.VITE_API_ENDPOINT;

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [successfullSignUp, setSuccessfullSignUp] = useState(false);

    const uppercaseFirstLetter = str => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
        
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
            await schema.validate(formData, 
            {
                abortEarly: false
            });
            setErrors({});
            const req = await axios.post(`${apiUrl}/auth/register`, {
                name: formData.username,
                email: formData.email,
                password: formData.password
            });
            if(req.status === 200) {
                setSuccessfullSignUp(true);
            }
    
        } catch (error) {
            const newErrors = {};
            console.log(error)    
            error.inner.forEach(err => newErrors[err.path] = err.message);
            
            setErrors(newErrors);
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
                    <Typography variant="h5">Sign Up</Typography>
                    <Divider sx={{ marginTop: 1 }} />
                    <TextField sx={{
                            marginTop: 2,
                    }} 
                        error={errors.username}
                        id="username" 
                        label="Username" 
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
                        label="Password" 
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
                        label="Confirm password" 
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
                        label="Phone number" 
                        variant="outlined" 
                        size="small" 
                        onChange={handleChange}
                        type="number"
                        helperText={uppercaseFirstLetter(errors.phoneNumber)}
                    /> 
                    {successfullSignUp ? (
                        <Navigate 
                            to="/signin" 
                            state={{ signedUp: true }}
                        />
                    ) : <></>
                    }
                    <Button 
                        type="submit"
                        variant="contained" 
                        sx={{ marginTop: 2 }}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Typography sx={{
                        textAlign: "",
                        marginTop: 1.5
                    }}>
                        Already have an account? <a href="/signin">Login</a>
                    </Typography>
                </Paper>
            </Container>
        </form>
    );
}

 export default Signup