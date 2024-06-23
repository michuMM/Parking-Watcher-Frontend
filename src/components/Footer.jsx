import { Container, Typography, Toolbar, Box, IconButton, Button, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';

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
        <Toolbar sx={{ flexDirection: "column" }}>
          <Box sx={{
            display: 'flex',
            justifyContent: "center",
            marginTop: 0.5
          }}>
            <IconButton
              aria-label='Facebook'
              color='inherit'
              onClick={() => window.open('https://www.facebook.com', '_blank')}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label='Instagram'
              color='inherit'
              onClick={() => window.open('https://www.instagram.com', '_blank')}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              aria-label='X'
              color='inherit'
              onClick={() => window.open('https://www.twitter.com', '_blank')} // Assuming X is Twitter
            >
              <XIcon />
            </IconButton>
            <IconButton
              aria-label='Google'
              color='inherit'
              onClick={() => window.open('https://www.google.com', '_blank')}
            >
          <GoogleIcon />
      </IconButton>
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
          }} />
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
