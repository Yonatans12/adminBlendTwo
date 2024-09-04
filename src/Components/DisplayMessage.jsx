import { Box, Typography } from '@mui/material';
import React from 'react';

const DisplayMessage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <Box>
        <Typography sx={{fontSize:"30px"}}>Under Development !</Typography>
      </Box>
    </div>
  );
};

export default DisplayMessage;
