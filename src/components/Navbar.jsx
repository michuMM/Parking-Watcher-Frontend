import logo from "../assets/png/logo-no-background.png"
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem,
    Paper,
    ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { 
    Link, 
    useNavigate
} from 'react-router-dom'
import { getContext } from '../context/ContextProvider'
import axios from "../lib/axios";

const Navbar = () => {
    const navigate = useNavigate();
    const pages = ["home"];
    const buttons = ["Log in", "Register"];
    const { userToken, logoutUser } = getContext();

    const [anchorElNav, setAnchorElNav] = useState(null);
    
    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    useEffect(() => {
        window.addEventListener('resize', handleCloseNavMenu)
    }, []);
    
    const signOutUser = async () => {
        const request = await axios.post('/auth/logout');
        if(request.status === 200) {
            logoutUser();
            navigate('/home');
        }
    }

    return (
        <>
            <AppBar sx={{
                bgcolor: "white",
            }}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Container sx={{
                            marginLeft: {
                                xs: 3,
                                sm: 0,
                                md: 10

                            },
                            padding: {
                                sm: 0,
                                xs: 1
                            }
                        }}>
                            <Link to="/">
                                <img src={logo} width={200} alt="logo" />
                            </Link>
                        </Container>
                        <Box sx={{ 
                            flexGrow: 1, 
                            display: { 
                                xs: 'none', md: "flex" 
                            },
                            pl: 2
                        }}>
                            {pages.map((page, idx) => (
                            <Button
                                key={idx}
                                sx={{ 
                                    color: 'black', 
                                    display: { sm: 'flex', xs: 'none' },
                                    bgColor: "blue",
                                    margin: 1
                                }}
                                href={`/${page}`}
                            >
                                {page}
                            </Button>
                            ))}
                        </Box>
                        <Box sx={{ 
                                flexGrow: 1, 
                                display: "flex", 
                                margin: 2,
                                mr: 0
                        }}>
                            {!userToken && buttons.map((txt, idx) => (
                                <Button
                                    key={idx}
                                    sx={{ 
                                        display: {
                                            xs: 'none',
                                            sm: "block"
                                        },
                                        color: "white",
                                        ml: 1,
                                        width: 120,
                                        textAlign: "center"
                                    }}
                                    variant="contained"
                                    href={idx == 0 ? "/signin" : "/signup"}
                                >
                                    <Typography fontWeight={400}>
                                        {txt} 
                                    </Typography>
                                </Button>
                            ))}
                            {userToken && (
                                <Button
                                    sx={{ 
                                        display: {
                                            xs: 'none',
                                            sm: "block"
                                        },
                                        color: "white",
                                        ml: 1,
                                        width: 120,
                                        textAlign: "center"
                                    }}
                                    variant="contained"
                                    onClick={signOutUser}
                                >
                                    <Typography fontWeight={400}>
                                        Log out
                                    </Typography>
                                </Button>
                            )}
                        </Box>
                        <Box sx={{ 
                            flexGrow: 1, 
                            display: { xs: 'flex', md: 'none' },
                            margin: 1,
                            marginRight: 0
                        }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                anchorEl={anchorElNav}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: 'block'
                                }}
                            >
                                <Paper sx={{ 
                                    width: 220, 
                                    maxWidth: '100%' 
                                }}>
                                    {
                                        (pages.map(page => (
                                            <>
                                                <Link 
                                                    to={`/${page}`} 
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "black"
                                                    }}
                                                >
                                                    <MenuItem 
                                                        divider
                                                        onClick={handleCloseNavMenu}
                                                    >
                                                        <ListItemText sx={{ 
                                                            textAlign: "center",
                                                            display: "block" 
                                                        }}>
                                                            <Typography textTransform={'uppercase'}>{page}</Typography>
                                                        </ListItemText>
                                                    </MenuItem>
                                                </Link>
                                            </>
                                        )))
                                    }
                                    {!userToken && buttons.map((buttonText, idx) => (
                                        <Button variant="contained" sx={{ 
                                            width: '100%', 
                                            borderRadius: 0, 
                                            display: {
                                                xs: 'block',
                                                sm: 'none'
                                            },
                                            marginTop: idx == 1 ? 0.6 : 0,
                                            textAlign: "center"
                                        }}
                                            href={idx==0 ? "/signin" : "/signup"}
                                        >
                                            {buttonText}
                                        </Button>
                                    ))}
                                    {userToken && (
                                        <>
                                            <Button variant="contained" sx={{ 
                                                width: '100%', 
                                                borderRadius: 0, 
                                                display: {
                                                    xs: 'block',
                                                    sm: 'none'
                                                },
                                                textAlign: "center"
                                            }}
                                                onClick={signOutUser}
                                            >
                                               Log out
                                            </Button>
                                        </>
                                    )}
                                </Paper>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </>
    );
}

export default Navbar;