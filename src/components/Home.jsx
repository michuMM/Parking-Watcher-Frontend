import { 
    Typography,
    Box,
    Button,
    Grid,
    Card,
    CardContent,
    CardMedia,
    List,
    ListItem,
    Avatar,
    ListItemAvatar,
    ListItemText,
    Divider
} from '@mui/material'
// import { getContext } from '../context/ContextProvider'
import backgroundImg from '../assets/background.jpg'
import bookSpace from '../assets/bookspace.jpg'
import calendar from '../assets/calendar.jpg'
import parking from '../assets/parking.jpg'
import { Folder as FolderIcon } from "@mui/icons-material"
import usaFlag from '../assets/usaflag.png'
import spainFlag from '../assets/spainflag.png'
import polandFlag from '../assets/polandflag.png'
import germanyFlag from '../assets/germanyflag.jpg'
import Map from '../components/Map'

const Home = () => {
    const items = [
        {
            id: 1,
            country: "United States",
            image: usaFlag,
            address: "55 West 46th Street - Valet Garage, New York"
        },
        {
            id: 2,
            country: "Spain",
            image: spainFlag,
            address: "Raimundo Fernández Villaverde 57 bajo, 28003 Madrid",
        },
        {       
            id: 3,
            country: "Poland",
            image: polandFlag,
            address: "Royal Tulip (Warsaw) Grzybowska 49, Warsaw"
        },
        {
            id: 4,
            country: "Germany",
            image: germanyFlag,
            address: "Tiefgarage Friedrichstadt-Passagen (Q 206) Taubenstraße 14, Berlin"
        },
        {
            id: 5,
            country: "Spain",
            image: spainFlag,
            address: "Barceló (Madrid) Barceló s/n, 28004, Madrid"
        },
        {       
            id: 6,
            country: "Poland",
            image: polandFlag,
            address: "Parking NFM Wrocław (Wrocław) Plac Wolności 1, 50-071 Wrocław"
        },
    ]

    // const { userToken } = getContext();
 
        return (
            <>
                <Box
                    component="section"
                    minHeight="80vh"
                    bgcolor="background.paper"
                    sx={{
                        backgroundImage: `url(${backgroundImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
            
                    }}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '20%', 
                        transform: 'translateY(-40%)',
                        color: '#ffffff',
                    }}>
                        <Typography sx={{
                            lineHeight: '1.5',
                            fontSize: {
                                xs: 36,
                                md: 52
                            },
                        }} variant="title">
                            Forget about parking - reserve <br/> online and save time! <br/>
                        </Typography>

                        <Typography sx={{
                            fontSize: 20,
                            lineHeight: '1.3'
                        }} variant="paragraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed do eiusmod tempor incididunt ut labore et dolore magna <br/>
                        </Typography>
                        <Button 
                            variant="contained" 
                            href="/signup"
                            sx={{
                                marginTop: 1.5,
                                padding: 1.3,
                                width: 250
                        }}>sign up right now</Button>
                    </Box>
                </Box>
                {/* how it works section */}
                <Box sx={{ 
                    py: 8,
                    minHeight: '55vh',
                    textAlign: 'center',
                    backgroundColor: "#f3f6f8"
                }}>
                    <Typography 
                        variant="title" 
                        sx={{
                            fontSize: 42,
                            
                        }}
                    >How it works?</Typography>
                    <Grid container spacing={3}
                      alignItems="center"
                      justifyContent="center"
                      marginTop={1}
                    >
                        <Grid item xs={11} sm={8} md={3}>
                            <Card sx={{ 
                                maxWidth: 450,
                                padding: 1
                            }}>
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={bookSpace}
                                    />
                                    <Typography 
                                        variant="h6"
                                        sx={{
                                            marginTop: 2
                                        }}
                                    >Choose desired location</Typography>
                                    <Typography variant="paragraph">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id velit non nisi scelerisque pellentesque. Phasellus vel orci et lacus pellentesque pretium. Duis volutpat ante eu fermentum accumsan. Vestibulum sodales urna nec tortor consequat, vel pulvinar metus lacinia. Integer mattis arcu nec dolor commodo, nec bibendum quam faucibus. Mauris in lorem id elit vehicula fringilla sit amet nec metus.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={11} sm={8} md={3}>
                            <Card sx={{ 
                                    maxWidth: 450,
                                    padding: 1
                            }}>
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={calendar}
                                    />
                                    <Typography 
                                        variant="h6"
                                        sx={{
                                            marginTop: 2
                                        }}
                                    >Choose a suitable date</Typography>
                                    <Typography variant="paragraph">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id velit non nisi scelerisque pellentesque. Phasellus vel orci et lacus pellentesque pretium. Duis volutpat ante eu fermentum accumsan. Vestibulum sodales urna nec tortor consequat, vel pulvinar metus lacinia. Integer mattis arcu nec dolor commodo, nec bibendum quam faucibus. Mauris in lorem id elit vehicula fringilla sit amet nec metus.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={11} sm={8} md={3}>
                            <Card sx={{ 
                                maxWidth: 450,
                                padding: 1
                            }}>
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={parking}
                                        
                                    />
                                    <Typography 
                                        variant="h6"
                                        sx={{
                                            marginTop: 2
                                        }}
                                    >Safely park your car</Typography>
                                    <Typography variant="paragraph">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id velit non nisi scelerisque pellentesque. Phasellus vel orci et lacus pellentesque pretium. Duis volutpat ante eu fermentum accumsan. Vestibulum sodales urna nec tortor consequat, vel pulvinar metus lacinia. Integer mattis arcu nec dolor commodo, nec bibendum quam faucibus. Mauris in lorem id elit vehicula fringilla sit amet nec metus.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ 
                    py: 8,
                    minHeight: '45vh',
                    textAlign: 'center',
                    backgroundColor: "#388ce4"
                }}>
                    <Typography 
                        variant="title" 
                        sx={{
                            fontSize: 42,
                            color: "white"
                        }}
                    >Where we are located?</Typography>
                    <Grid container spacing={0}
                      alignItems="center"
                      justifyContent="center"
                      marginTop={4}
                    >
                        <Grid item xs={11} md={6} backgroundColor="white">
                            <List dense>
                                {items.map(item => (
                                    <>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={item.image}>
                                                    <FolderIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.country}
                                                secondary={item.address}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                    <Map />
                </Box>
            </>
        );
}

export default Home;