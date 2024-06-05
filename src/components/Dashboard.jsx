import { 
    useEffect, 
    useState 
} from 'react';
import axios from '../lib/axios';
import { Audio } from 'react-loader-spinner'
import { 
    Box,
} from '@mui/material';
import LoggedUser from './LoggedUser';

const Dashboard = () => {
    const [userData, setUserData] = useState(null); 
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/user');
            const { data } = response;
            setUserData(data);
        }
      
        fetchData()
    }, []) 
    return (
        <>
            {userData ? (
                
                <LoggedUser userData={userData} />
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