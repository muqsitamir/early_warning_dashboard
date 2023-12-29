import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

import {  googleMapsApiKey } from '../App';

import { useDispatch, useSelector } from 'react-redux';
import { getCameras, selectCameras } from '../features/cameras/cameraSlice';
export default function GoogleMaps() {
    const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCameras());
    fetchData();
  }, []);
  const handleMapLoad = (map) => {
    setMap(map);
  };
  const { results: cameras } = useSelector(selectCameras);
  const fetchData=     () => {
     const cameraMarkers = cameras.map((camera) => ({
          id: camera.id, // Assuming you have a unique identifier for each camera
          position: { lat: camera.latitude, lng: camera.longitude },
        }));
  
        setMarkers(cameraMarkers);

  };

  

  

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap onLoad={handleMapLoad}  mapContainerStyle={{ height: '300px', width: '585px' }}
    >
      {/* Show the camera markers */}
      {markers.map((marker) => (
        <Marker
          key={marker.id} // Use a unique key for each marker
          position={marker.position}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 20),
          }}
        />
      ))}
    </GoogleMap>
  );
}
