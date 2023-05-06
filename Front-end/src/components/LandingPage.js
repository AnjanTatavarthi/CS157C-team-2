import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Typography, Button, AppBar, Toolbar } from '@mui/material';
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

const mdTheme = createTheme();

function LandingPage() {
    return (
        <ThemeProvider theme={mdTheme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        AmenityHub
                    </Typography>
                    <Button color="inherit" href="/signup">Sign Up</Button>
                    <Button color="inherit" href="/login">Log In</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography variant="h2" component="h1">
                    Welcome to AmenityHub
                </Typography>
            </Box>
        </ThemeProvider>
    );
}

export default LandingPage;
