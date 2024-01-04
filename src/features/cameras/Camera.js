import React from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import {Button,Tooltip} from "@mui/material";
//import CameraDetailsPage from "../../pages/CameraDetailsPage";
import {Link} from 'react-router-dom';


export default function Camera(props){
    debugger
    let content = props.content;
    let live = content.live ? "success" : "disabled";
let location='Lat:'+content.latitude+' ,Lng:'+content.longitude;
    const getDate=(dateString)=>{
        const date = new Date(dateString);
    // Extract the time components
    const hours = date.getHours();
    // Add 5 hours
    date.setHours(hours + 5);
    // Format the updated date and time
    const updatedDate = date.toISOString().slice(0, 16).replace("T", " ");
    
   // console.log("Original Date:", dateString);
    //console.log("Updated Date:", updatedDate);
    return updatedDate;
      };
      const scrollToTop = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      };
    const formatDate=(inputDate)=> {
        const date = new Date(inputDate);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Months are 0-based
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        const timeZoneOffset = (date.getTimezoneOffset() / 60) * -1; // Convert to positive offset
      
        const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} GMT ${timeZoneOffset > 0 ? '+' : ''}${timeZoneOffset}:00`;
      
        return formattedDate;
      } 
      
   return(
       <div className="card rounded my-3 shadow-lg back-card" style={{width:"230px",margin:'10px',height:"fit-content",maxHeight: '460px'}}>
        <Typography variant="subtitle2" gutterBottom component="div" marginTop={1} marginLeft={2} style={{display: 'inline-flex',
    marginLeft: '10px',
    justifyContent: 'center',alignItems:'flex-start'}}>
          
                <div >
                    <FiberManualRecordIcon color={live} sx={{position: 'absolute', top:10, right:10, bottom:0 }} />
                </div>
                <span>{content.description}</span>                
                </Typography>
                <Typography  style={{borderTop:'groove',borderBottom:'groove',display:'flex',justifyContent:'center',marginBottom:'5px'}}><span  style={{fontSize:'12px'}}>{getDate(content.created_at)}</span>   </Typography>               
               <div style={{display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
               {props.latestEvent === 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-300x225.png' || props.latestEvent == null ? (
  <img
    src='/video.png'
    alt=""
    className="card-img-top time"
    style={{
      width: '150px',
      height: '150px',
      borderRadius: '15px'
    }}
  />
) : (
  <img
    src={props.latestEvent}
    alt=""
    className="card-img-top time"
    style={{
      width: '150px',
      height: '150px',
      borderRadius: '15px'
    }}
  />
)} </div>
               
               
                <div style={{display: 'flex',alignItems: 'center', justifyContent: 'space-around',margin:'5px'}}>
                <Tooltip title={location} placement="top">
                <Button size="small"  component="span" style={{ border: '1px solid',color:'black',opacity:'0.8' ,fontSize:'12px'}}
                 onClick={() => {
                  scrollToTop(); // Scroll to the top of the page
                  props.updateMapCenter(content.latitude, content.longitude); // Call the original function
                }}>
                <LocationOnIcon/>Location
                </Button>
                </Tooltip>
                 <Button size="small"  component={Link} to={`/statistics/${content.id}`} style={{border:'1px solid',color:'black',opacity:'0.8' ,fontSize:'12px'}}>
               <LeaderboardIcon/>  Statistics
                 </Button>
                 </div>
                
          
        </div>
    );
}