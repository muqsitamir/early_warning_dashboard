import React from 'react'
import HideAppBar from "../features/cover/HideAppBar";
import Button from "@mui/material/Button";
import SwipeableTextMobileStepper from "../features/cover/stepper";
import {Divider, Grid, Stack} from "@mui/material";
import ImageAvatars from "../reusable_components/ImageAvatar";

export default function Cover(){
    return(
        <>
            <HideAppBar/>
            <div id="lums-img" style={{position: 'relative', textAlign: 'center', color: 'white'}}>
                <img src={require("../images/lums.jpg")} style={{width: "100%", filter: 'brightness(60%)'}}/>
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <h1 className='disappear' style={{color: "white"}}> We build systems to detect animals. </h1>
                    <a href="#team-section">
                        <Button id='lums-img-button' sx={{fontFamily: 'Arial', padding: '10px 15px', backgroundColor: 'rgb(8, 35, 68)', color: 'white', marginTop: '15px', display: 'inline-block'}}>Meet the team</Button>
                    </a>
                    <a href='#about-section'>
                        <Button id='lums-img-button1' sx={{fontFamily: 'Arial', marginLeft: '20px', padding: '10px 15px', backgroundColor: 'white', color: '#555', marginTop: '15px', display: 'inline-block'}}>About project</Button>
                    </a>
                </div>
            </div>
            <div style={{backgroundColor: "white", padding: '35px'}}>
                <Grid style={{marginBottom: '26px'}} container alignItems='center' justifyContent='center' direction='column' spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <h2 > Events </h2>
                        <p style={{color: "#555"}}> A little bit about these events, explanation sort of. </p>
                        <SwipeableTextMobileStepper/>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid marginTop='35px' item xs={12} md={12} lg={12}>
                        <h2 id='team-section'>Team</h2>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Stack
                            sx={{paddingBottom: '30px', maxWidth: '900px'}}
                          direction="row-reverse"
                          divider={<Divider orientation="vertical" flexItem />}
                          spacing={2}
                        >
                          <span>
                            <h6> Dr. Murtaza </h6>
                            <p>out different ad text to see what brings in the most customers, and learn how to enhance your ads using features like ad extensions. If you run into any problems with your ads, find out how to tell if they're running and how to resolve approval issues.</p>
                          </span>
                          <span>
                            <ImageAvatars src={'lums.jpg'} />
                              <h4 style={{marginTop: '15px'}}>Program Director</h4>
                          </span>
                        </Stack>
                        <Divider variant="middle" />
                    </Grid>
                    <Grid paddingY='35px' item xs={12} md={12} lg={12}>
                        <Stack
                            sx={{maxWidth: '900px'}}
                          direction="row-reverse"
                          divider={<Divider orientation="vertical" flexItem />}
                          spacing={2}
                        >
                          <span>
                            <h6> Dr. Murtaza </h6>
                            <p>out different ad text to see what brings in the most customers, and learn how to enhance your ads using features like ad extensions. If you run into any problems with your ads, find out how to tell if they're running and how to resolve approval issues.</p>
                          </span>
                          <span>
                            <ImageAvatars src={'lums.jpg'} />
                              <h4 style={{marginTop: '15px'}}>Program Director</h4>
                          </span>
                        </Stack>
                    </Grid>
                    <Grid marginTop='20px' item xs={12} md={12} lg={12}>
                        <h2 id='about-section'>About Us</h2>
                    </Grid>
                    <Grid marginTop='20px' item xs={12} md={12} lg={12}>
                        <h6 style={{maxWidth: '900px', textAlign: 'center'}}> We have partnered with some of the leading education and financial institutions, and nonprofits to modernize the ways learning is accessed. Our online and ed-tech solutions are used by millions globally.
                                Learn more →
                                HealthCare
                                Our apps have been at the cornerstone of the technology revolution in the healthcare industry. From educating medical students to patient management in clinics, our experts have covered all.
                                Learn more →
                                Travel
                                Arbisoft has helped startups become leading travel & hospitality search engines with our dedicated team of software developers, and machine learning and data engineers.
                                Learn more →
                                Financial Services
                                Our data and software engineering teams have teamed up with startups to enterprise organizations to help them meet fast-paced changes in financial sector.
                                Learn more →
                            </h6>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}