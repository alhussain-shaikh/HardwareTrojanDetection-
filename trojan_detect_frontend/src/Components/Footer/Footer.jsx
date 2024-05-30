import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const footerStyle = {
  padding: '20px', // Adjust the padding as needed
  background: '#2196F3', // Change the color as needed
  position: 'fixed',
  bottom: 0,
  width: '100%',
};

const Footer = () => {
  return (
    <>
      <footer style={footerStyle}>
        <Typography variant="body2" color="text.secondary" align="center">
          Copyright 2023 - All rights Reserved
        </Typography>
      </footer>
</>
  );
};

export default Footer;
