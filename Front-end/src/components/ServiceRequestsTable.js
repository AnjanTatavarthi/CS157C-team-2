import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from '@mui/material';

const ServiceRequestsTable = ({ serviceRequests, staffMembers, onStaffAssignment }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Amenity ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Assigned Staff</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serviceRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.amenityId}</TableCell>
              <TableCell>{request.description}</TableCell>
              <TableCell>
                <Select
                  value={request.assignedStaff || ''}
                  onChange={(e) => onStaffAssignment(request.id, e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {staffMembers.map((staff) => (
                    <MenuItem key={staff.id} value={staff.id}>
                      {staff.name}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServiceRequestsTable;
