import { 
    useEffect, 
    useState 
} from 'react';
import axios from '../lib/axios';
import { Audio } from 'react-loader-spinner'
import { 
    Box,
    Card,
    CardContent,
    Typography
} from '@mui/material';

const Dashboard = () => {
    const [userData, setUserData] = useState(null); 
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/user');
            const { data } = response;
            console.log(data);
            setUserData(data);
        }
      
        fetchData()


    }, []) 
    return (
        <>
            {userData ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="80vh"
                >
                    <Card sx={{ 
                        textAlign: "center",
                        minWidth: 500
                    }}>
                        <CardContent>
                            <Typography variant="title" sx={{fontSize: 36}}>
                                Hello
                            </Typography>
                            <Typography variant="h5" component="div">
                                {userData.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {userData.email}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            
            ) : (
                <Box
                    sx={{
                        position: 'absolute',
                        height: '100vh', 
                        width: '100vw',
                        display: 'flex',  
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Audio
                        height="300"
                        width="300"
                        radius="5"
                        color="#388ce4"
                        ariaLabel="loading"
                        wrapperStyle
                        wrapperClass
                    />
                </Box>
            )}
            
        </>
    )
}

export default Dashboard