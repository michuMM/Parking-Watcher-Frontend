import React, { useState } from 'react';
import { Box, Grid, Typography, Modal, Select, MenuItem, FormControl, InputLabel, TextField, Button } from '@mui/material';

const floorsData = {
  ground: [
    { id: 1, number: 'P1', occupied: false, pillar: 1, reservations: [
      { start: '2024-06-08T08:00', end: '2024-06-08T10:00' },
      { start: '2024-06-08T12:00', end: '2024-06-08T14:00' }
    ] },
    { id: 2, number: 'P2', occupied: true, pillar: 1, reservations: [
      { start: '2024-06-08T09:00', end: '2024-06-08T11:00' }
    ] },
    { id: 3, number: 'P3', occupied: false, pillar: 1, reservations: [] },
    { id: 4, number: 'P4', occupied: true, pillar: 1, reservations: [] },
    { id: 5, number: 'P5', occupied: false, pillar: 1, reservations: [] },
    { id: 6, number: 'P6', occupied: false, pillar: 1, reservations: [] },
    { id: 7, number: 'P7', occupied: true, pillar: 1, reservations: [
      { start: '2024-06-08T10:00', end: '2024-06-08T12:00' },
      { start: '2024-06-08T10:00', end: '2024-06-08T12:00' },
      { start: '2024-06-08T10:00', end: '2024-06-08T12:00' },
      { start: '2024-06-08T10:00', end: '2024-06-08T12:00' },
      { start: '2024-06-08T10:00', end: '2024-06-08T12:00' }
    ] },
    { id: 8, number: 'P8', occupied: false, pillar: 1, reservations: [] },
    { id: 9, number: 'P9', occupied: true, pillar: 1, reservations: [] },
    { id: 10, number: 'P10', occupied: false, pillar: 1, reservations: [] },
    { id: 11, number: 'S1', occupied: false, pillar: 2, reservations: [] },
    { id: 12, number: 'S2', occupied: true, pillar: 2, reservations: [] },
    { id: 13, number: 'S3', occupied: false, pillar: 2, reservations: [] },
    { id: 14, number: 'S4', occupied: true, pillar: 2, reservations: [] },
    { id: 15, number: 'S5', occupied: true, pillar: 2, reservations: [] },
    { id: 16, number: 'S6', occupied: false, pillar: 2, reservations: [] },
    { id: 17, number: 'S7', occupied: true, pillar: 2, reservations: [] },
    { id: 18, number: 'S8', occupied: true, pillar: 2, reservations: [] },
    { id: 19, number: 'S9', occupied: true, pillar: 2, reservations: [] },
    { id: 20, number: 'S10', occupied: false, pillar: 2, reservations: [] },
    { id: 21, number: 'T1', occupied: false, pillar: 3, reservations: [] },
    { id: 22, number: 'T2', occupied: true, pillar: 3, reservations: [] },
    { id: 23, number: 'T3', occupied: false, pillar: 3, reservations: [] },
    { id: 24, number: 'T4', occupied: true, pillar: 3, reservations: [] },
    { id: 25, number: 'T5', occupied: false, pillar: 3, reservations: [] },
    { id: 26, number: 'T6', occupied: false, pillar: 3, reservations: [] },
    { id: 27, number: 'T7', occupied: true, pillar: 3, reservations: [] },
    { id: 28, number: 'T8', occupied: false, pillar: 3, reservations: [] },
    { id: 29, number: 'T9', occupied: true, pillar: 3, reservations: [] },
    { id: 30, number: 'T10', occupied: false, pillar: 3, reservations: [] },
    { id: 31, number: 'U1', occupied: false, pillar: 4, reservations: [] },
    { id: 32, number: 'U2', occupied: true, pillar: 4, reservations: [] },
    { id: 33, number: 'U3', occupied: false, pillar: 4, reservations: [] },
    { id: 34, number: 'U4', occupied: true, pillar: 4, reservations: [] },
    { id: 35, number: 'U5', occupied: false, pillar: 4, reservations: [] },
    { id: 36, number: 'U6', occupied: false, pillar: 4, reservations: [] },
    { id: 37, number: 'U7', occupied: true, pillar: 4, reservations: [] },
    { id: 38, number: 'U8', occupied: false, pillar: 4, reservations: [] },
    { id: 39, number: 'U9', occupied: true, pillar: 4, reservations: [] },
    { id: 40, number: 'U10', occupied: false, pillar: 4, reservations: [] },
  ],
  // Analogicznie dla pozostałych pięter...
};

const ParkingLot = () => {
  const [selectedFloor, setSelectedFloor] = useState('ground');
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [open, setOpen] = useState(false);
  const [reservationDate, setReservationDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSpaceClick = (space) => {
    setSelectedSpace(space);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSpace(null);
  };

  const handleReserve = () => {
    // Tutaj możesz dodać logikę rezerwacji miejsca
    alert(`Space ${selectedSpace.number} reserved!`);
    handleClose();
  };

  const handleDateChange = (event) => {
    setReservationDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const isSpaceAvailable = (space) => {
    if (!reservationDate || !startTime || !endTime) return true;

    const reservationStart = new Date(`${reservationDate}T${startTime}`);
    const reservationEnd = new Date(`${reservationDate}T${endTime}`);

    for (const reservation of space.reservations) {
      const resStart = new Date(reservation.start);
      const resEnd = new Date(reservation.end);

      if (
        (reservationStart >= resStart && reservationStart < resEnd) ||
        (reservationEnd > resStart && reservationEnd <= resEnd) ||
        (reservationStart <= resStart && reservationEnd >= resEnd)
      ) {
        return false;
      }
    }

    return true;
  };

  const renderSpace = (space) => {
    const available = isSpaceAvailable(space);
    return (
      <Box
        key={space.id}
        sx={{
          width: { xs: 50, sm: 70, md: 100 },
          height: { xs: 70, sm: 70, md: 100 },
          backgroundColor: available ? (space.occupied ? '#ff6666' : '#66ff66') : '#cccccc',
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
  };

  const renderPillars = () => {
    const pillars = Array.from(new Set(floorsData[selectedFloor].map(space => space.pillar)));
    return pillars.map((pillar, index) => (
      <React.Fragment key={pillar}>
        <Grid item xs={12} sm={2}>
          <Typography marginBottom={2} variant="h6" align="center">Pillar {pillar}</Typography>
          <Grid container spacing={2} justifyContent="center">
            {floorsData[selectedFloor].filter(space => space.pillar === pillar).map(renderSpace)}
          </Grid>
        </Grid>
        {index < pillars.length - 1 && (
          <Grid item xs={12} sm={1} key={`separator-${pillar}`}>
            <Box sx={{ borderLeft: '2px dashed #ccc', height: '100%' }}></Box>
          </Grid>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Box sx={{ height: '100%', overflowY: 'auto' }}>
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Reservation Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={reservationDate}
            onChange={handleDateChange}
          />
          <TextField
            label="Start Time"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            value={startTime}
            onChange={handleStartTimeChange}
          />
          <TextField
            label="End Time"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </Box>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            {renderPillars()}
          </Grid>

          <Modal open={open} onClose={handleClose}>
            <Box 
              sx={{
                p: 4,
                backgroundColor: 'white',
                width: '80%',
                maxWidth: 400,
                margin: 'auto',
                borderRadius: 2,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {selectedSpace && (
                <>
                  <Typography variant="h6">Space Details</Typography>
                  <Typography>ID: {selectedSpace.id}</Typography>
                  <Typography>Number: {selectedSpace.number}</Typography>
                  <Typography>Occupied: {selectedSpace.occupied ? 'Yes' : 'No'}</Typography>
                  {!selectedSpace.occupied ? (
                    <Box component="form" sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        margin="normal"
                        required
                      />
                      <TextField
                        fullWidth
                        label="Your Email"
                        margin="normal"
                        required
                      />
                      <TextField
                        fullWidth
                        label="Reservation Date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        required
                      />
                      <TextField
                        fullWidth
                        label="Start Time"
                        type="time"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        required
                      />
                      <TextField
                        fullWidth
                        label="End Time"
                        type="time"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        required
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleReserve}
                      >
                        Reserve
                      </Button>
                    </Box>
                  ) : (
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      This space is currently occupied. The next available space will be free soon.
                    </Typography>
                  )}
                </>
              )}
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default ParkingLot;
