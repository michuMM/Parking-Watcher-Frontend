import { 
  Container, 
  Typography,
  Toolbar, 
  Box,
  IconButton, 
  Button,
  Divider 
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GoogleIcon from '@mui/icons-material/Google';

const Footer = () => {
  return (
      <footer style={{
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        paddingBottom: 60,
        paddingTop: 48,
        position: "relative",
        bottom: "0",
        left: "0",
        width: "100%",
      }}> 
        <Container>
          <Toolbar sx={{ flexDirection: "column"}}>
            <Box sx={{ 
              justifyContent: "center",
              marginTop: 0.5
              }}>
            <IconButton aria-label='Facebook' color='inherit'>
              <FacebookIcon/>
            </IconButton>
            <IconButton aria-label='Instagram' color='inherit'>
              <InstagramIcon/>
            </IconButton>
            <IconButton aria-label='X' color='inherit'>
              <XIcon/>
            </IconButton>
            <IconButton aria-label='Google' color='inherit'>
              <GoogleIcon/>
            </IconButton>
            </Box>
            <Box sx={{ 
              justifyContent: "center",
              '& Button': {
                transition: 'text-decoration 0.3s ease-in-out', // Ustawiamy czas trwania na 0.3s
              },
              'Button:hover': {
                textDecoration: "underline"
              },
              marginBottom: 1
              }}>
              <Button color='inherit'>Home</Button>
              <Button color='inherit'>About</Button>
              <Button color='inherit'>Services</Button>
              <Button color='inherit'>Team</Button>
              <Button color='inherit'>Contact</Button>
            </Box>
            <Divider color="white" sx={{
              width: {
                xs: "100%",
                sm: "90%",
                md: "80%"
              },
              marginBottom: {
                xs: 1,
                sm: 1,
                md: 2,
              }
            }}/>
            <Box>
            <Typography sx={{
              fontSize: 13,
              marginBottom: {
                xs: 0,
                sm: 0,
                md: 0
              }
            }}>
              ©Parking Watcher | All rights reserved
            </Typography>
            </Box>
          </Toolbar>
        </Container>
      </footer>
  );
};

export default Footer;
