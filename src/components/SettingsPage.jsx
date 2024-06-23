import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, Grid, Paper, Alert } from '@mui/material';

const SettingsPage = ({ userData }) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: 'success'
  });

  const [isDirty, setIsDirty] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const isFormDirty =
      formData.name !== userData.name ||
      formData.email !== userData.email;

    setIsDirty(isFormDirty);
  }, [formData.name, formData.email, userData.name, userData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'newPassword' || name === 'confirmPassword') {
      if (name === 'newPassword' && value !== formData.confirmPassword) {
        setPasswordError('Passwords do not match.');
      } else if (name === 'confirmPassword' && value !== formData.newPassword) {
        setPasswordError('Passwords do not match.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    // Validate and handle user info form submission logic
    setAlert({
      show: true,
      message: 'User information updated successfully!',
      severity: 'success'
    });
    setIsDirty(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setAlert({
        show: true,
        message: 'Please fill in all password fields.',
        severity: 'error'
      });
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    // Handle password form submission logic
    setAlert({
      show: true,
      message: 'Password updated successfully!',
      severity: 'success'
    });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      {alert.show && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleUserInfoSubmit}>
          <Typography variant="h6" gutterBottom>User Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isDirty}>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
        {isDirty && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            You have unsaved changes.
          </Typography>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handlePasswordSubmit}>
          <Typography variant="h6" gutterBottom>Change Password</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Current Password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm New Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                type="password"
                error={!!passwordError}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Change Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
