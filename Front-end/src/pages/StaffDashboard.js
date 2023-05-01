import React from "react";
import Navbar from "./Navbar";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

// Dummy data, replace with API call
const assignedRequests = [
  { id: 1, guestName: "John Doe", amenity: "Extra Towels", status: "Assigned" },
  { id: 2, guestName: "Jane Smith", amenity: "Room Service", status: "In Progress" },
];

function StaffDashboard() {
  return (



    <>
    <Navbar />
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Staff Dashboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Guest Name</TableCell>
              <TableCell>Amenity</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignedRequests.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.guestName}</TableCell>
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

export default StaffDashboard;
