import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AmenitiesTable = ({ amenities }) => {
    console.log(amenities);
  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Open hours</TableCell>
            <TableCell>Availabiity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {amenities.map((amenity, index) => (
            <TableRow key={amenity.id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{amenity.name}</TableCell>
              <TableCell>{amenity.location}</TableCell>
              <TableCell>{amenity.openHours}</TableCell>
              <TableCell>{amenity.status+""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default AmenitiesTable;
