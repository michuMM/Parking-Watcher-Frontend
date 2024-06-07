import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Box,
  Typography,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  History,
  Settings,
  Event,
  Dashboard,
  Receipt
} from "@mui/icons-material";

const drawerWidth = 360;

const LoggedUser = ({ userData }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      marginTop={-4}
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
            width: { xs: 80, sm: drawerWidth },
            bgcolor: "#3f51b5",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
            p: 2,
          }}
        >
          <Box
            sx={{
              width: { xs: 50, sm: 60 },
              height: { xs: 50, sm: 60 },
              mb: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              bgcolor: "#3f51b5",
            }}
          >
            <Avatar sx={{ width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 } }} />
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
              mt: { xs: 2, sm: 0 },
            }}
          >
            <ListItem
              button
              component={Link}
              to="/dashboard"
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
              component={Link}
              to="/dashboard/reservations"
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
              component={Link}
              to="/dashboard/history"
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
              component={Link}
              to="/dashboard/settings"
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
            <ListItem
              button
              component={Link}
              to="/dashboard/invoices"
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
                <Receipt sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Invoices"
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
            flexDirection: "column",
            bgcolor: "white",
            overflowY: "auto", 
            height: "100%", 
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default LoggedUser;
