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

const parkingLots = [
  { id: '1', name: '55 West 46th Street - Valet Garage, New York', country: 'Stany Zjednoczone' },
  { id: '2', name: 'Raimundo Fernández Villaverde 57 bajo, 28003 Madrid', country: 'Hiszpania' },
  { id: '3', name: 'Royal Tulip (Warsaw) Grzybowska 49, Warszawa', country: 'Polska' },
  { id: '4', name: 'Tiefgarage Friedrichstadt-Passagen (Q 206) Taubenstraße 14, Berlin', country: 'Niemcy' },
  { id: '5', name: 'Barceló (Madrid) Barceló s/n, 28004 Madrid', country: 'Hiszpania' },
  { id: '6', name: 'Parking NFM Wrocław (Wrocław) Plac Wolności 1, 50-071 Wrocław', country: 'Polska' },
];

const ParkingLot = () => {
  const [selectedParkingLot, setSelectedParkingLot] = useState(parkingLots[0].id);
  const [selectedFloor, setSelectedFloor] = useState('ground');
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [open, setOpen] = useState(false);
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleParkingLotChange = (event) => {
    setSelectedParkingLot(event.target.value);
  };

  const handleSpaceClick = (space) => {
    setSelectedSpace(space);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSpace(null);
  };

  const handleReserve = () => {
    alert(`Space ${selectedSpace.number} reserved!`);
    handleClose();
  };

  const applyFilters = () => {
    setFiltersApplied(true);
  };

  const isSpaceAvailable = (space) => {
    if (!startDateTime || !endDateTime) return true;

    const reservationStart = new Date(startDateTime);
    const reservationEnd = new Date(endDateTime);

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
    if (!filtersApplied) return null;

    const pillars = Array.from(new Set(floorsData[selectedFloor].map(space => space.pillar)));
    return (
      <Grid container spacing={2} justifyContent="center" sx={{ width: '100%', mt: 2 }}>
        {pillars.map((pillar, index) => (
          <Grid item xs={12} sm={6} md={3} key={pillar}>
            <Typography marginBottom={2} variant="h6" align="center">Pillar {pillar}</Typography>
            <Grid container spacing={2} justifyContent="center">
              {floorsData[selectedFloor].filter(space => space.pillar === pillar).map(renderSpace)}
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Grid container spacing={2} justifyContent="center" sx={{ width: '100%' }}>
        <Grid item xs={12} sm={6} lg={3}>
          <FormControl fullWidth>
            <InputLabel id="parking-lot-select-label">Parking</InputLabel>
            <Select
              value={selectedParkingLot}
              onChange={handleParkingLotChange}
            >
              {parkingLots.map((lot) => (
                <MenuItem key={lot.id} value={lot.id}>{lot.name} ({lot.country})</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          {
            filtersApplied && 
            <FormControl fullWidth>
              <InputLabel id="floor-select-label">Piętro</InputLabel>
              <Select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
              >
                <MenuItem value="ground">Parter</MenuItem>
                <MenuItem value="first">Pierwsze piętro</MenuItem>
                <MenuItem value="second">Drugie piętro</MenuItem>
              </Select>
            </FormControl>

          }
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2, width: '100%' }}>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField
            label="Data i godzina rozpoczęcia"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField
            label="Data i godzina zakończenia"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm={6} 
          lg={3} 
          sx={{ mt: { xs: 2, lg: 0 }, display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={applyFilters}
            sx={{ height: '100%', width: { xs: '100%', sm: '100%', lg: 'auto' } }}
          >
            Zastosuj filtry
          </Button>
        </Grid>
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
              <Typography variant="h6">Szczegóły miejsca</Typography>
              <Typography>ID: {selectedSpace.id}</Typography>
              <Typography>Numer: {selectedSpace.number}</Typography>
              <Typography>Zajęte: {selectedSpace.occupied ? 'Tak' : 'Nie'}</Typography>
              {!selectedSpace.occupied ? (
                <Box component="form" sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Twoje imię"
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Twój email"
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Data rezerwacji"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Godzina rozpoczęcia"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Godzina zakończenia"
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
                    Zarezerwuj
                  </Button>
                </Box>
              ) : (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  To miejsce jest obecnie zajęte. Następne dostępne miejsce będzie wolne wkrótce.
                </Typography>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ParkingLot;