import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import SlideshowIcon from '@mui/icons-material/Slideshow';

const MovieHeader = () => {
  return (
    <AppBar position="sticky" color="inherit" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <SlideshowIcon 
        color='success'
        fontSize="large"/>
        <Typography variant="h6" component="div" sx={{ flexGrow: 3, color: 'white',fontWeight:900 ,fontSize:"xlarge", paddingLeft:2}}>
          Movie Site
        </Typography>
        <Button color="primary" sx={{ color: 'white',fontWeight:600 }}>Home</Button>
        <Button color="primary" sx={{ color: 'white',fontWeight:600 }}>Movies</Button>
        <Button color="primary" sx={{ color: 'white',fontWeight:600 }}>Sign In</Button>
      </Toolbar>
    </AppBar>
  );
};

export default MovieHeader;
