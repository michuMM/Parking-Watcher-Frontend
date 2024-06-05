import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  AccountCircle,
  History,
  Settings,
  Event,
  Dashboard,
} from "@mui/icons-material";

const drawerWidth = 310;

const LoggedUser = ({ userData }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="95vh"
      sx={{ backgroundColor: "#f0f0f0" }}
    >
      <Box
        sx={{
          width: "95%",
          height: "85vh",
          bgcolor: "white",
          boxShadow: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            width: { xs: 60, sm: drawerWidth }, 
            bgcolor: "#3f51b5",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              mb: 2,
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              bgcolor: "#3f51b5",
            }}
          >
            <Avatar sx={{ width: 50, height: 50 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {userData.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 2, display: { xs: "none", sm: "block" } }}
          >
            {userData.email}
          </Typography>
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "flex-start" },
              mt: { xs: 2, sm: 0 },
            }}
          >
            <ListItem
              button
              key="Dashboard"
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
                mb: { xs: 2, sm: 0 },
                width: "100%",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "auto",
                  mr: { xs: 0, sm: 2 },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Dashboard sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            </ListItem>
            <ListItem
              button
              key="Reservations"
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
                mb: { xs: 2, sm: 0 },
                width: "100%",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "auto",
                  mr: { xs: 0, sm: 2 },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Event sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Reservations"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            </ListItem>
            <ListItem
              button
              key="History"
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
                mb: { xs: 2, sm: 0 },
                width: "100%",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "auto",
                  mr: { xs: 0, sm: 2 },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <History sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="History"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            </ListItem>
            <ListItem
              button
              key="Settings"
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
                mb: { xs: 2, sm: 0 },
                width: "100%",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "auto",
                  mr: { xs: 0, sm: 2 },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Settings sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            </ListItem>
          </List>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "white",
          }}
        >
          <Card
            sx={{
              textAlign: "center",
              minWidth: { xs: 280, sm: 500 },
            }}
          >
            <CardContent>
              <Typography variant="h4" sx={{ fontSize: 36 }}>
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
      </Box>
    </Box>
  );
};

export default LoggedUser;
