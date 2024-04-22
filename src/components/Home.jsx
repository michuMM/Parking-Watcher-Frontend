import { Typography } from '@mui/material'
import { getContext } from '../context/ContextProvider'
import { Navigate } from 'react-router-dom'

const Home = () => {
    const { userToken } = getContext();
 
        return (
            <>
                {userToken ? (
                    <Typography textAlign={'center'}>
                        hello user
                    </Typography>
                ) : (
                    <Typography textAlign={'center'}>
                        jestes wylogowany
                    </Typography>
                )}
            </>
        );
}

export default Home;