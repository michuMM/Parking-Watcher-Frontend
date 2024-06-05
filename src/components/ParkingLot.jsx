import React, { useState } from 'react';
import { Box, Grid, Typography, Modal, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const floorsData = {
  ground: [
    { id: 1, number: 'P1', occupied: false },
    { id: 2, number: 'P2', occupied: true },
    { id: 3, number: 'P3', occupied: false },
    { id: 4, number: 'P4', occupied: true },
    { id: 5, number: 'P5', occupied: false },
    { id: 6, number: 'P6', occupied: false },
    { id: 7, number: 'P7', occupied: true },
    { id: 8, number: 'P8', occupied: false },
    { id: 9, number: 'P9', occupied: true },
    { id: 10, number: 'P10', occupied: false },
    { id: 11, number: 'S1', occupied: false },
    { id: 12, number: 'S2', occupied: true },
    { id: 13, number: 'S3', occupied: false },
    { id: 14, number: 'S4', occupied: true },
    { id: 15, number: 'S5', occupied: true },
    { id: 16, number: 'S6', occupied: false },
    { id: 17, number: 'S7', occupied: true },
    { id: 18, number: 'S8', occupied: true },
    { id: 19, number: 'S9', occupied: true },
    { id: 20, number: 'S10', occupied: false },
  ],
  first: [
    { id: 1, number: 'F1', occupied: false },
    { id: 2, number: 'F2', occupied: true },
    { id: 3, number: 'F3', occupied: true },
    { id: 4, number: 'F4', occupied: true },
    { id: 5, number: 'F5', occupied: false },
    { id: 6, number: 'F6', occupied: true },
    { id: 7, number: 'F7', occupied: true },
    { id: 8, number: 'F8', occupied: false },
    { id: 9, number: 'F9', occupied: true },
    { id: 10, number: 'F10', occupied: false },
    { id: 11, number: 'F11', occupied: false },
    { id: 12, number: 'F12', occupied: true },
    { id: 13, number: 'F13', occupied: false },
    { id: 14, number: 'F14', occupied: true },
    { id: 15, number: 'F15', occupied: false },
    { id: 16, number: 'F16', occupied: false },
    { id: 17, number: 'F17', occupied: true },
    { id: 18, number: 'F18', occupied: false },
    { id: 19, number: 'F19', occupied: true },
    { id: 20, number: 'F20', occupied: false },
  ],
  second: [
    { id: 1, number: 'S1', occupied: false },
    { id: 2, number: 'S2', occupied: true },
    { id: 3, number: 'S3', occupied: false },
    { id: 4, number: 'S4', occupied: true },
    { id: 5, number: 'S5', occupied: false },
    { id: 6, number: 'S6', occupied: false },
    { id: 7, number: 'S7', occupied: true },
    { id: 8, number: 'S8', occupied: false },
    { id: 9, number: 'S9', occupied: true },
    { id: 10, number: 'S10', occupied: false },
    { id: 11, number: 'S11', occupied: false },
    { id: 12, number: 'S12', occupied: true },
    { id: 13, number: 'S13', occupied: false },
    { id: 14, number: 'S14', occupied: true },
    { id: 15, number: 'S15', occupied: false },
    { id: 16, number: 'S16', occupied: false },
    { id: 17, number: 'S17', occupied: true },
    { id: 18, number: 'S18', occupied: false },
    { id: 19, number: 'S19', occupied: true },
    { id: 20, number: 'S20', occupied: false },
  ],
};

const ParkingLot = () => {
  const [selectedFloor, setSelectedFloor] = useState('ground');
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSpaceClick = (space) => {
    setSelectedSpace(space);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSpace(null);
  };

  const renderSpace = (space) => (
    <Box
      key={space.id}
      sx={{
        width: { xs: 50, sm: 70, md: 100 },
        height: { xs: 70, sm: 70, md: 100 },
        backgroundColor: space.occupied ? '#ff6666' : '#66ff66',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        margin: '5px',
        fontSize: { xs: 16, sm: 14, md: 16 },
        fontWeight: 'bold',
        color: '#ffffff',
      }}
      onClick={() => handleSpaceClick(space)}
    >
      {space.number}
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <FormControl sx={{ minWidth: 120, mb: 2 }}>
        <InputLabel id="floor-select-label" sx={{ marginTop: '-10px' }}>Floor</InputLabel>
        <Select
          value={selectedFloor}
          onChange={(e) => setSelectedFloor(e.target.value)}
        >
          <MenuItem value="ground">Ground Floor</MenuItem>
          <MenuItem value="first">First Floor</MenuItem>
          <MenuItem value="second">Second Floor</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ mt: 2, overflowY: 'auto', maxHeight: '70vh' }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={5}>
            <Grid container spacing={2} justifyContent="center">
              {floorsData[selectedFloor].slice(0, 10).map(renderSpace)}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={2} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', alignItems: 'center', height: '100%' }}>
              <Typography variant="body1">ENTRY</Typography>
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ borderLeft: '2px dashed #ccc', height: '100%' }}></Box>
              </Box>
              <Typography variant="body1">EXIT</Typography>
            </Box>
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <Typography variant="body1">ENTRY</Typography>
              <Box sx={{ borderTop: '2px dashed #ccc', width: '100%', my: 1 }}></Box>
              <Typography variant="body1">EXIT</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Grid container spacing={2} justifyContent="center">
              {floorsData[selectedFloor].slice(10).map(renderSpace)}
            </Grid>
          </Grid>
        </Grid>

        <Modal open={open} onClose={handleClose}>
          <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', mt: 10 }}>
            {selectedSpace && (
              <>
                <Typography variant="h6">Space Details</Typography>
                <Typography>ID: {selectedSpace.id}</Typography>
                <Typography>Number: {selectedSpace.number}</Typography>
                <Typography>Occupied: {selectedSpace.occupied ? 'Yes' : 'No'}</Typography>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default ParkingLot;
