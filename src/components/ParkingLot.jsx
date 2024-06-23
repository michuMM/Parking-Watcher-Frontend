import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Modal, Select, MenuItem, FormControl, InputLabel, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';

const ParkingLot = ({ userData }) => {
  const [selectedParkingLot, setSelectedParkingLot] = useState('');
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [open, setOpen] = useState(false);
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [parkingLots, setParkingLots] = useState(null);
  const [freePlaces, setFreePlaces] = useState(null);
  const [parkingPlaces, setParkingPlaces] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'error' });
  const [loading, setLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState({ open: false, message: '', severity: 'error' });

  const navigate = useNavigate();

  const fetchParkings = async () => {
    const parkings = await axios.get('/parkings');
    setParkingLots(parkings.data);
  };

  useEffect(() => {
    fetchParkings();
    console.log(parkingLots);
  }, []);

  const handleParkingLotChange = (event) => {
    setSelectedParkingLot(event.target.value);
    setFreePlaces(null);
    setFiltersApplied(false);
  };

  const handleSpaceClick = (space) => {
    setSelectedSpace(space);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSpace(null);
  };

  const handleReserve = async () => {
    try {
      const reservationData = {
        parking_place_id: selectedSpace.id,
        start_time: `${startDateTime.split('T')[0]} ${startDateTime.split('T')[1]}`,
        end_time: `${endDateTime.split('T')[0]} ${endDateTime.split('T')[1]}`,
      };
      console.log(reservationData);
      await axios.post(`parkings/${selectedParkingLot}/reservation`, reservationData);
      setErrorPopup({ open: true, message: 'Reservation created successfully!', severity: 'success' });

      setParkingPlaces((prevParkingPlaces) =>
        prevParkingPlaces.map((place) =>
          place.id === selectedSpace.id ? { ...place, occupied: true } : place
        )
      );
    } catch (error) {
      setErrorPopup({ open: true, message: 'Failed to create reservation.', severity: 'error' });
    }
    handleClose();
  };

  const fetchParkingPlaces = async () => {
    setLoading(true);
    const response = await axios.get(`/parkings/${selectedParkingLot}`);
    const data = response.data.parking_places.map(place => ({
      ...place,
      occupied: false,
    }));
    setParkingPlaces(data);
    const start = `${startDateTime.split('T')[0]} ${startDateTime.split('T')[1]}`;
    const end = `${endDateTime.split('T')[0]} ${endDateTime.split('T')[1]}`;
    const freePlacesResponse = await axios.get(`/parkings/${selectedParkingLot}/free-places`, {
      params: {
        start_time: start,
        end_time: end,
      },
    });
    setFreePlaces(freePlacesResponse.data);
    setLoading(false);
  };

  const applyFilters = () => {
    if (!selectedParkingLot) {
      setErrorPopup({ open: true, message: 'Parking lot must be selected.', severity: 'error' });
      return;
    }

    if (!startDateTime || !endDateTime) {
      setErrorPopup({ open: true, message: 'Both start time and end time are required.', severity: 'error' });
      return;
    }

    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const now = new Date();

    if (start >= end) {
      setErrorPopup({ open: true, message: 'Start time must be earlier than end time.', severity: 'error' });
      return;
    }

    if (start < now) {
      setErrorPopup({ open: true, message: 'Start time must be from the current date and time onwards.', severity: 'error' });
      return;
    }

    if (end - start < 30 * 60 * 1000) {
      setErrorPopup({ open: true, message: 'The time difference between start and end time must be at least 30 minutes.', severity: 'error' });
      return;
    }

    setFiltersApplied(true);
    setErrorPopup({ open: false, message: '', severity: 'error' });

    fetchParkingPlaces();
  };

  const findMissingIds = (parkingPlaces, freePlaces) => {
    if (!Array.isArray(parkingPlaces) || !Array.isArray(freePlaces)) {
      return [];
    }

    let missingIds = [];

    parkingPlaces.forEach(place => {
      let idInFreePlaces = freePlaces.some(freePlace => freePlace.id === place.id);
      if (!idInFreePlaces) {
        missingIds.push(place.id);
      }
    });

    return missingIds;
  };

  const calculatePrice = () => {
    if (!startDateTime || !endDateTime) return 0;

    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    const diffMs = end - start;

    const diffHours = diffMs / (1000 * 60 * 60);

    let price = 0;
    if (diffHours <= 2) {
      price = diffHours * 5;
    } else {
      price = 2 * 5 + (diffHours - 2) * 3;
    }
    return price.toFixed(2);
  };

  const renderSpace = (sp) => {
    const space = sp;
    console.log(sp);
    const missingIds = findMissingIds(parkingPlaces, freePlaces);
    if (missingIds.includes(space.id)) {
      space.occupied = true;
    }
    return (
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
        {space.id}
      </Box>
    );
  };

  const renderPillars = () => {
    if (!filtersApplied || loading || !parkingPlaces.length || !freePlaces || !freePlaces.length) {
      return null;
    }

    const missingIds = findMissingIds(parkingPlaces, freePlaces);

    const pillars = Array.from(new Set(parkingPlaces.map(space => space.pillar))).sort((a, b) => a - b);
    return (
      <Grid container spacing={2} justifyContent="center" sx={{ width: '100%', mt: 2 }}>
        {pillars.map((pillar, index) => (
          <Grid item xs={12} sm={6} md={3} key={pillar}>
            <Typography marginBottom={2} variant="h6" align="center">Pillar {pillar}</Typography>
            <Grid container spacing={2} justifyContent="center">
              {parkingPlaces.filter(space => space.pillar === pillar).map(space => {
                if (missingIds.includes(space.id)) {
                  space.occupied = true;
                }
                return renderSpace(space);
              })}
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  };

  const now = new Date();
  const formattedNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Grid container spacing={2} justifyContent="center" sx={{ width: '100%' }}>
        <Grid item xs={12} sm={6} lg={3}>
          <FormControl fullWidth>
            <InputLabel id="parking-lot-select-label">Parking Lot</InputLabel>
            <Select
              value={selectedParkingLot}
              onChange={handleParkingLotChange}
            >
              {parkingLots ? parkingLots.map((lot) => (
                <MenuItem key={lot.id} value={lot.id}>{lot.name} ({lot.country})</MenuItem>
              )) : (
                <MenuItem>Loading...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2, width: '100%' }}>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField
            label="Start Date and Time"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            fullWidth
            inputProps={{ min: formattedNow }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField
            label="End Date and Time"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            fullWidth
            inputProps={{ min: formattedNow }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
          sx={{ mt: { xs: 2, lg: 0 }, display: 'flex', alignItems: 'center' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={applyFilters}
            sx={{ height: '100%', width: { xs: '100%', sm: '100%', lg: 'auto' } }}
          >
            Apply Filters
          </Button>
        </Grid>
        {renderPillars()}
      </Grid>

      <Modal
        open={errorPopup.open}
        onClose={() => {
          setErrorPopup({ open: false, message: '', severity: 'error' });
        }}
      >
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
          <Typography variant="h6" color={errorPopup.severity === 'error' ? 'red' : 'green'}>
            {errorPopup.message}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              setErrorPopup({ open: false, message: '', severity: 'error' });
              if (errorPopup.severity === 'success') {
                navigate('/dashboard/reservations');
              }
            }}
          >
            Go to reservations
          </Button>
        </Box>
      </Modal>

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
              <Typography>Pillar: {selectedSpace.pillar}</Typography>
              <Typography>Occupied: {selectedSpace.occupied ? 'Yes' : 'No'}</Typography>
              <Typography>Parking: {selectedParkingLot}</Typography>
              <br />

              {selectedSpace.occupied ? (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  The space is currently occupied. It will be free soon.
                </Typography>
              ) : (
                <>
                  <Typography variant='title'>
                    First 2 hours: $5 per hour.
                    Each additional hour: $3 per hour.
                  </Typography>
                  <Typography>Price: ${calculatePrice()}</Typography>
                  <Box sx={{ mt: 2, textAlign: 'left' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Email:</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{userData.email}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Name:</Typography>
                    <Typography variant="body2">{userData.name}</Typography>
                  </Box>
                  <Box component="form" sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      label="Starting date of reservation"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={startDateTime}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      value={endDateTime}
                      label="End date of reservation"
                      type="datetime-local"
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
                </>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ParkingLot;
