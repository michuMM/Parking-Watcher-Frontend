import { useState, useCallback, memo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow } from '@react-google-maps/api';
import { parkings } from '../assets/parkings';

const containerStyle = {
  width: '60%',
  height: '500px',
  margin: '0 auto',
  marginTop: '30px'
};

const center = {
  lat: 51.1657, 
  lng: 10.4515
};

const points = parkings.map(parking => ({
  ...parking,
  lat: parseFloat(parking.latitude),
  lng: parseFloat(parking.longitude)
}));

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const onLoad = useCallback(map => {
    const bounds = new window.google.maps.LatLngBounds();
    points.forEach(point => bounds.extend({ lat: point.lat, lng: point.lng }));
    map.fitBounds(bounds);

    setMap(map);
  }, [points]);

  const onUnmount = useCallback(map => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
      onLoad={onLoad}
      onUnmount={onUnmount}
      clickableIcons={false}
    >
      {points.map((point, id) => (
        <MarkerF
          key={id}
          position={{ lat: point.lat, lng: point.lng }}
          onClick={() => setSelectedPoint(point)}
        />
      ))}

      {selectedPoint && (
        <InfoWindow
          position={{ lat: selectedPoint.lat, lng: selectedPoint.lng }}
          onCloseClick={() => setSelectedPoint(null)}
        >
          <div>
            <h2>{selectedPoint.name}</h2>
            <p>{selectedPoint.address}</p>
            <p>{selectedPoint.country}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>;
};

export default memo(Map);
