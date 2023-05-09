import React from 'react';
import { Typography, Box } from '@mui/material';

const Unauthorized = () => {
    return (
        <Box sx={{ bgcolor: 'background.default', p: 2 }}>
            <Typography variant="h5" color="error">
                Unauthorized Access
            </Typography>
            <Typography variant="body1">
                Sorry, you are not authorized to view this page.
            </Typography>
        </Box>
    );
};

export default Unauthorized;
