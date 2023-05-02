import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
} from "@mui/material";

// Dummy data, replace with API call
const requestData = [
  { id: 1, amenity: "Extra Towels", status: "Received" },
  { id: 2, amenity: "Room Service", status: "Completed" },
];

function GuestDashboard() {
  const [amenity, setAmenity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit request and update requestData
  };

  return (
    <>
    <Navbar />
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Guest Dashboard
      </Typography>
      <Box mb={4}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Request Amenity"
            value={amenity}
            onChange={(e) => setAmenity(e.target.value)}
          />
          <Button fullWidth variant="contained" type="submit">
            Submit Request
          </Button>
        </form>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Amenity</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.amenity}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </>
    
  );
}

export default GuestDashboard;
