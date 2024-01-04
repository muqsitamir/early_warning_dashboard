import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Camera from '../features/cameras/Camera';
import { useDispatch, useSelector } from 'react-redux';
import { getCameras, selectCameras } from '../features/cameras/cameraSlice';
import { backend_url } from '../App';     
import MiniMap from './MiniMap'; 
export default function Cameras() {
 
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCameras());
  }, [dispatch]);
  
 
  
  const { results: cameras } = useSelector(selectCameras);
  const cameraCount = cameras.length;
  let location={ lat: 33.734457, lng: 73.045045 }
  const [center, setCenter] = useState({
   center:location,
    zoom: 5      
  }); 
  const updateMapCenter = (lat, lng) => {
    let location={ lat: lat, lng: lng } 
    setCenter({ center:location, zoom: 12 });
  };
  
  

  // Calculate the number of rows and columns for the L-shaped grid
  const numRows = Math.ceil(cameraCount/ 4);
  //const numCols = 4;

  const gridData = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    if (i === 0) {
      // First row displays two cameras per row
      row.push(cameras[9]);
      row.push(cameras[6]);
      row.push('');
    } else if(i===1) {
      // Subsequent rows display four cameras per row
      row.push(cameras[2]);
      row.push(cameras[3]);
      row.push(cameras[4]);
      row.push(cameras[5]);
      row.push(cameras[10]);
    }else if(i===2){
      
      row.push(cameras[8]);
      row.push(cameras[11]);
      row.push(cameras[7]);
      row.push(cameras[1]);
      row.push(cameras[0]);
    }
    gridData.push(row);
  }
    debugger
  return (
    <div className="page">
      <div className="page__content">
        <div className="main-wrapper">
        
          <header className="row db" style={{  marginLeft: '12%' }}>
            <div className="col s12">
              <h2 className="bold">Cameras</h2>
            </div>
          </header>
          <div className='grid-div-mobile grid-div'>
          <Grid container justify="center">
  {gridData.map((row, rowIndex) => {
    if (rowIndex === 0) {
      return (
        <Grid container item justify="center" key={rowIndex}>
          {row.map((camera, colIndex) => {
            if (colIndex === 2) {
              return ( null
                // <Grid item key={colIndex}>
                //   <div style={{width:'750px',height:'270px',marginTop: '10px',marginLeft:'12px'}}>
                //
                //   <MiniMap camera={cameras} defaultCenter={center}/> {/* Include the GoogleMap component here */}
                //   </div>
                // </Grid>
              );
            } else {
              return (
                <Grid item key={colIndex}>
                  {camera && (
                  <Camera
                  content={camera}
                  latestEvent={camera.latest_event ? `${backend_url}/media/${camera.latest_event}` : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png'}
                  updateMapCenter={updateMapCenter} // Pass the function
                />
                  )}
                </Grid>
              );
            }
          })}
        </Grid>
      );
    } else {
      return (
        <Grid container item justify="center" key={rowIndex}>
          {row.map((camera, colIndex) => {
            return (
              <Grid item key={colIndex}>
                {camera && (
                  <Camera
                  content={camera}
                  latestEvent={camera.latest_event ? `${backend_url}/media/events/${camera.latest_event}.gif` : 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png'}
                  updateMapCenter={updateMapCenter} // Pass the function
                />
                
                )}
              </Grid>
            );
          })}
        </Grid>
      );
    }
  })}
</Grid>
    </div>
          
        </div>
      </div>
    </div>
  );
}