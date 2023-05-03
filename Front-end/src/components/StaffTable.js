import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const StaffTable = ({ staffMembers }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {staffMembers.map((staff, index) => (
  <TableRow key={staff.id}>
    <TableCell>{index + 1}</TableCell>
    <TableCell>{staff.firstName + " "+ staff.lastName}</TableCell>
    <TableCell>{staff.email}</TableCell>
  </TableRow>
))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StaffTable;
