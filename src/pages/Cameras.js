import React, { useEffect, useState } from 'react';
import { Grid, MenuItem } from '@mui/material';
import Camera from '../features/cameras/Camera';
import { useDispatch, useSelector } from 'react-redux';
import { getCameras, selectCameras } from '../features/cameras/cameraSlice';
import MiniMap from './MiniMap';
import {Button,Dialog,Select,Tabs,Tab,DialogTitle} from "@mui/material";
export default function Cameras() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCameras());
  }, [dispatch]);

  const { results: cameras } = useSelector(selectCameras);
  let location = { lat: 33.734457, lng: 73.045045 };
  const [center, setCenter] = useState({ center: location, zoom: 5 });
  const [showLive, setShowLive] = useState(false);
  const [showOfline,setShowOfline]=useState(false);
  const [state, setState] = useState({ open: false });
  const [tab, setTab] = useState(0);
  const [selectedArea, setSelectedArea] = useState(null);
  const [headingArea, setheadingArea] = useState(null);
  const [filter,setfilter]=useState(false);
  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
    if(event.target.value==="Bheri"){
      setheadingArea("Kashmir");
    }else{
      setheadingArea(event.target.value);
    }
    
    setfilter(true);
    handleClose();
  };

  const handleLiveFilter = () => {
    setShowLive(true);
    setShowOfline(false);
  };
  const handleResetFilter = () => {
    setShowLive(false);
    setShowOfline(false);
  };
  const handleOflineFilter = () => {
    setShowLive(false);
    setShowOfline(true);
  };

  const updateMapCenter = (lat, lng) => {
    let location = { lat: lat, lng: lng };
    setCenter({ center: location, zoom: 12 });
  };
  const handleClose = () => {
    setState({open: false})
}
const handleOpen = (e) => {
    setState({open: true})
}
const handleFilter=()=>{
  setfilter(false);
  setSelectedArea("All");
  setheadingArea(null);
}
  const getFilteredCameras = () => {
    let filteredCameras = cameras;

    if (showLive) {
      filteredCameras = filteredCameras.filter((camera) => camera.live === true);
    }
    if (showOfline) {
      filteredCameras = filteredCameras.filter((camera) => camera.live === false);
    }
    if (selectedArea && selectedArea !== "All") {
      filteredCameras = filteredCameras.filter((camera) => {
        if(selectedArea==="Khyber"){
         if(camera.description.includes("Put Dasht")||camera.description.includes("Kunduringe")||camera.description.includes("Shhunuk")){
          return camera;
          }else if(camera.description.includes(selectedArea)){
          return camera;
          }
        }if(selectedArea==="Bheri"){
          if(camera.description.includes("Bheri")||camera.description.includes("Behri")){
            return camera;
          }else if(camera.description.includes(selectedArea)){
           return camera;
          }
        }else{
         if(camera.description.includes(selectedArea)){
          return camera;
         }
        }
        });
    }

    return filteredCameras;
  };

  const getGridItems = () => {
    const filteredCameras = getFilteredCameras();
  //  console.log("size:"+filteredCameras.length);
    if (filteredCameras.length===0) {
      return (
        <Grid item xs={12} key="no-live-cameras-msg">
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>No live cameras in the selected area.</p>
          </div>
        </Grid>
      )}else{
    const gridItems = filteredCameras.map((camera, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Camera content={camera} updateMapCenter={updateMapCenter} />
      </Grid>
    ));

    gridItems.splice(2, 0, (
      <Grid item xs={12} sm={6} md={5} key="map">
        <div style={{ width: '100%', maxWidth: '120%', height: '270px', marginTop: "10px", marginLeft: '18px', borderRadius: '25px', overflow: 'hidden' }}>
          <MiniMap camera={filteredCameras} defaultCenter={center} />
        </div>
      </Grid>
    ));
    return gridItems;
  }
    
  };

  return (
    <div className="page">
      <div className="page__content">
        <div className="main-wrapper">
          <header className="row db" style={{ marginLeft: '12%' }}>
            <div className="col s12">
              <h2 className="bold">{headingArea!==null? headingArea+" Cameras":"Cameras"} </h2></div>
          </header>
          <div className='grid-div-mobile grid-div'>
            <div>
              <Tabs value={tab} onChange={(e, v) => setTab(v)} aria-label="basic tabs example" sx={{ flex: 9.3 }}>
                <Tab label="All" onClick={handleResetFilter} />
                <Tab label="Live" onClick={handleLiveFilter} />
                <Tab label="Offline" onClick={handleOflineFilter} />
               {!filter?(<Button variant="text" sx={{ position: 'absolute', right: 45, top: 5 }}
                onClick={handleOpen}> Filter</Button>):( <Button variant="text" sx={{ position: 'absolute', right: 45, top: 5 }}
                onClick={handleFilter}> Reset</Button>)} 
                
               
              </Tabs>
             <Dialog 
              open={state.open}
              onClose={handleClose}
              closeAfterTransition>
                <DialogTitle>Select an Area</DialogTitle>
                <Select  label="Area" onChange={handleAreaChange}>
                <MenuItem value="All">All Areas</MenuItem>
                <MenuItem value="Margala">Margala</MenuItem>
                <MenuItem value="Khyber">Khyber</MenuItem>
                <MenuItem value="Karimabad">Karimabad</MenuItem>
                <MenuItem value="Bheri">Kashmir</MenuItem>
                <MenuItem value="HikTrap">Unnamed</MenuItem>
                </Select>
                

                </Dialog>
            </div>

            <Grid container justify="center">
              {getGridItems()}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}