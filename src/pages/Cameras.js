import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Camera from '../features/cameras/Camera';
import { useDispatch, useSelector } from 'react-redux';
import { getCameras, selectCameras } from '../features/cameras/cameraSlice';
import MiniMap from './MiniMap';

export default function Cameras() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCameras());
  }, [dispatch]);

  const { results: cameras } = useSelector(selectCameras);
  let location = { lat: 33.734457, lng: 73.045045 };
  const [center, setCenter] = useState({ center: location, zoom: 5 });

  const updateMapCenter = (lat, lng) => {
    let location = { lat: lat, lng: lng };
    setCenter({ center: location, zoom: 12 });
  };

  const getGridItems = () => {
    const gridItems = cameras.map((camera, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Camera
          content={camera}
          updateMapCenter={updateMapCenter}
        />
      </Grid>
    ));

    gridItems.splice(2, 0, (
      <Grid item xs={12} sm={6} md={5} key="map">
        <div style={{ width: '100%', maxWidth: '120%', height: '270px', marginTop: "10px", marginLeft: '18px', borderRadius: '25px', overflow: 'hidden'}}>
          <MiniMap camera={cameras} defaultCenter={center} />
        </div>
      </Grid>
    ));

    return gridItems;
  };

  return (
    <div className="page">
      <div className="page__content">
        <div className="main-wrapper">
          <header className="row db" style={{ marginLeft: '12%' }}>
            <div className="col s12">
              <h2 className="bold">Cameras</h2>
            </div>
          </header>
          <div className='grid-div-mobile grid-div'>
            <Grid container justify="center">
              {getGridItems()}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
