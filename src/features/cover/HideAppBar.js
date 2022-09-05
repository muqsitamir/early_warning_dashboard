import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar(props: Props) {
    const handleLoginClick = () => {
        window.location = '/login';
    }

    return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar sx={{backgroundColor: "whitesmoke"}}>
          <Toolbar sx={{position: "relative"}}>
            <span style={{marginLeft: "10%"}}>
              <img width='50' src={require("../../images/wwf_logo.png")} alt="Project Logo"/>
            </span>
            <Typography variant="h5" component="span" sx={{ display: { xs: 'none', sm: 'block' } }} color={"#082344"} fontWeight={"bold"} marginLeft={"20px"}>
                Early Warning System
            </Typography>
             <Button onClick={handleLoginClick} style={{color: "#082344", fontWeight: "bold", fontSize: "large", position: "fixed", right: "5%"}}>Login</Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
