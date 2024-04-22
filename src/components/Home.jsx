import { Typography } from '@mui/material'
import { getContext } from '../context/ContextProvider'
import { Navigate } from 'react-router-dom'

const Home = () => {
    const { userToken } = getContext();
 
        return (
            <>
                {userToken ? (<div>
                    hello user
                </div>) : (
                <Typography>
                    jestes wylogowany
                </Typography>

                )}
            </>
        );
}

export default Home;