import React from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Typography from '@mui/material/Typography';
import {CardMedia} from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";



export default function Camera(props){
    let content = props.content;
    let live = content.live ? "success" : "disabled";
    return(
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 2,
              width: 360,
              height: 510,
              '&:hover': {
                opacity: [0.9, 0.8, 0.7],
              },
            },
          }}
        >
          <Paper elevation={4} sx={{overflow: 'auto'}} >
                <div style={{position:"relative"}}>
                    <FiberManualRecordIcon color={live} sx={{position: 'absolute', top:10, right:10, bottom:0 }} />
                </div>
                <Typography variant="h6" gutterBottom component="div" marginTop={1} marginLeft={2}>
                    {content.description}
                </Typography>
                <CardMedia
                component="img"
                height="194"
                image={require('../../images/placeholder.jpg')}
                alt="Camera Image"
                />
                <div>
                    <div className='camera-info' >
                        <Typography variant="subtitle2" gutterBottom component="span">
                            Created:
                          </Typography>
                        <Typography variant="body2" gutterBottom component="span" sx={{marginLeft: 1}}>
                            {content.created_at}
                        </Typography>
                    </div>
                    <div className='camera-info' >
                        <Typography variant="subtitle2" gutterBottom component="span">
                            Last Report:
                        </Typography>
                        <Typography variant="body2" gutterBottom component="span" sx={{marginLeft: 1}}>
                            {content.last_reported_at}
                        </Typography>
                    </div>
                    <div className='camera-info' >
                        <Typography variant="subtitle2" gutterBottom component="span">
                            Test:
                        </Typography>
                        <Typography variant="body2" gutterBottom component="span" sx={{marginLeft: 1}}>
                            {content.test ? 'True' : 'False'}
                        </Typography>
                    </div>
                    <div className='camera-info' style={{marginTop: 5}} >
                        <div>
                            <Typography variant="subtitle2" gutterBottom component="span">
                                Location:
                            </Typography>
                        </div>
                        <div className='camera-sub-info' >
                            <Typography variant="subtitle2" gutterBottom component="span">
                                Latitude:
                            </Typography>
                            <Typography variant="body2" gutterBottom component="span" sx={{marginLeft: 1}}>
                                {content.latitude}
                            </Typography>
                        </div>
                        <div className='camera-sub-info'>
                            <Typography variant="subtitle2" gutterBottom component="span">
                                Longitude:
                            </Typography>
                            <Typography variant="body2" gutterBottom component="span" sx={{marginLeft: 1}}>
                                {content.longitude}
                            </Typography>
                        </div>
                    </div>
                    <div className='camera-info' style={{border: "none", marginTop: 5}} >
                        <div>
                            <Typography variant="subtitle2" gutterBottom component="span">
                                Solar Time:
                            </Typography>
                        </div>
                        <div className='camera-sub-info'>
                            <Typography variant="subtitle2" gutterBottom component="span">
                                Sunrise:
                            </Typography>
                            <Typography variant="body2" gutterBottom component="span" sx={{marginLeft: 1}}>
                                {content.sunrise}
                            </Typography>
                        </div>
                        <div className='camera-sub-info'>
                            <Typography variant="subtitle2" gutterBottom component="span">
                                Sunset:
                            </Typography>
                            <Typography variant="body2" gutterBottom component="span" sx={{marginLeft: 1}}>
                                {content.sunset}
                            </Typography>
                        </div>
                    </div>
                </div>
          </Paper>
        </Box>
    );
}