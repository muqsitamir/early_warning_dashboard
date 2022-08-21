import React, {useEffect} from 'react';
import { Grid } from '@mui/material';
import Camera from "../features/cameras/Camera";
import {useDispatch, useSelector} from "react-redux";
import {getCameras, selectCameras} from "../features/cameras/cameraSlice";
import {selectSiteData} from "../reusable_components/site_data/siteDataSlice";
import SideNav from "../Headers/SideNav/SideNav";



export default function Cameras() {
    const { side_nav: side_nav_check } = useSelector(selectSiteData);
    let side_nav = side_nav_check ? <SideNav/> : null;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCameras())
    }, []);
    const {results: cameras} = useSelector(selectCameras);
    return(
        <div className="page">
            <div className="page__content">
                <div className="main-wrapper">
                    {side_nav}
                    <header className="row db" style={{marginTop: 25, marginLeft: '10%'}}>
                        <div className="col s12">
                            <h1 className="bold">Cameras</h1>
                        </div>
                    </header>
                    <div className='grid-div-mobile grid-div'>
                        <Grid container justify="center" spacing={2}>
                            {cameras.map((camera) => (
                                <Camera content={camera}/>
                            ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
}
