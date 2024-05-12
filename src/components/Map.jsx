import {
    useState,
    useCallback,
    memo
} from 'react'
import { 
    GoogleMap, 
    useJsApiLoader, 
    MarkerF
} from '@react-google-maps/api';

const containerStyle = {
  width: '60%',
  height: '500px',
  margin: '0 auto',
  marginTop: '30px'
};

const center = {
    lat: 52.23400351702403, 
    lng: 20.989625109083224
};

const points = [{
    lat: 40.757137308087444,
    lng: -73.98104053194496
  },{
    lat: 40.446947557953685, 
    lng: -3.6968993204106697
  },{
    lat: 52.23400351702403, 
    lng: 20.989625109083224
  },{
    lat: 52.513053006644334, 
    lng: 13.390755760522426
  },{
    lat: 40.426363158629044, 
    lng: -3.7003293910016444
  },
  {
    lat: 51.10689403195331, 
    lng: 17.02921002841518
  }
]


const MyComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(map => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(map => {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {
            points.map((point, id) => <MarkerF key={id} position={point} />)
        }
      </GoogleMap>
  ) : <></>
}

export default memo(MyComponent)