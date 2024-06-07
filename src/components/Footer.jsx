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
            <IconButton aria-label='Facebook' color='inherit'>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label='Instagram' color='inherit'>
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label='X' color='inherit'>
              <XIcon />
            </IconButton>
            <IconButton aria-label='Google' color='inherit'>
              <GoogleIcon />
            </IconButton>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: "center",
            '& Button': {
              transition: 'text-decoration 0.3s ease-in-out',
            },
            'Button:hover': {
              textDecoration: "underline"
            },
            marginBottom: 1
          }}>
            <Button component={Link} to="/" color='inherit'>Home</Button>
            <Button component={Link} to="/about" color='inherit'>About</Button>
            <Button component={Link} to="/services" color='inherit'>Services</Button>
            <Button component={Link} to="/team" color='inherit'>Team</Button>
            <Button component={Link} to="/contact" color='inherit'>Contact</Button>
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
