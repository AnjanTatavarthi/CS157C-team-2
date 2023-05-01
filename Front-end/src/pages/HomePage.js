import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "./Navbar";

function HomePage() {
    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Typography variant="h3" align="center" gutterBottom>
                    Welcome to AmenityHub
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    AmenityHub is your one-stop solution for managing hotel amenities and enhancing your stay experience.
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Our platform connects hotel guests, staff, and management to streamline the process of requesting and managing amenities. Whether you are a guest looking for a comfortable and enjoyable stay, a staff member seeking to provide exceptional service, or a hotel manager aiming to optimize operations, AmenityHub is the perfect solution for you.
                </Typography>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                    <Button variant="contained" color="primary" component={RouterLink} to="/login">
                        Login
                    </Button>
                    <Button variant="outlined" color="primary" component={RouterLink} to="/signup" style={{ marginLeft: "1rem" }}>
                        Sign Up
                    </Button>
                </div>
            </Container>
        </>
    );
}

export default HomePage;
