import React, { useState, useEffect } from 'react';
import backend from '../../utils/config';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

const GuestServiceRequestTable = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);



  var guestEmail = JSON.parse(localStorage.getItem("user"))["email"]
  console.log("Guest!!!!!!!!!!!!!!!")
  console.log(guestEmail)

  
  useEffect(() => {
    fetchServiceRequests();
    fetchStaff();
  }, []);

  const fetchServiceRequests = async () => {
    try {
      // var guestEmail = JSON.parse(localStorage.getItem("user"))["email"]
      console.log("ASSGNIGNED")
      console.log(guestEmail)
      const response = await backend.get('/servicerequests/guest-email/'+guestEmail);
      console.log("service request")
      console.log(response.data)
      setServiceRequests(response.data);
    } catch (error) {
      console.error('Error fetching service requests:', error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await backend.get('/users/staff');
      console.log("STAFF:");
      console.log(response.data)
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const handleOpen = (requestId) => {
    console.log("setting open")
    console.log(requestId)
    setSelectedRequest(requestId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStaff(null);
  };


  const deleteServiceRequest = async(requestId) => {
    console.log("Deleting service request")
    console.log(requestId)
    // console.log(request.requestId)
    try {
      console.log('/servicerequests/'+requestId)
      const response = await backend.delete('/servicerequests/'+requestId);
      console.log("STAFF:");
      console.log(response.data)
      // setStaffList(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  }

  // const markAsComplete = async () => {
  //   // setSelectedStaff(staffEmail)
  //   // console.log(selectedRequest)
  //   console.log(selectedStaff)
  //   if (selectedRequest && staffEmail) {
  //     try {
  //       await backend.patch(`/servicerequests/${selectedRequest}`, {
  //         assignedStaff: staffEmail,
  //         status: 'closed',
  //       });
  //       fetchServiceRequests();
  //     } catch (error) {
  //       console.error('Error assigning staff:', error);
  //     }
  //   }
  //   handleClose();
  // };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Guest Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned Staff</TableCell>
              <TableCell>Actions</TableCell>
              {/* <TableCell>Actions1</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceRequests.map((request, index) => (
              <TableRow key={request.requestid}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{request.guestEmail}</TableCell>
                <TableCell>

                {request.status === 'open' && (
  <Chip label="Open" color="secondary" />
)}
{request.status === 'assigned' && (
  <Chip label="Assigned" color="warning" />
)}
{/* {request.status === 'in progress' && (
  <Chip label="In Progress" color="info" />
)} */}
{request.status === 'closed' && (
  <Chip label="Closed" color="success" />
)}


                </TableCell>
                <TableCell>
                  {request.assignedStaff || 'Unassigned'}
                </TableCell>
                <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => deleteServiceRequest(request.requestId)}
                    >
                      Delete
                    </Button>
                </TableCell>
                {/* <TableCell>
                  {request.requestId}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure?   </DialogTitle>
    {/* <DialogContent>
      <Autocomplete
        options={staffList}
        getOptionLabel={(option) => option.firstName+" "+option.lastName}
        onChange={(event, newValue) => {
          setSelectedStaff(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Staff" variant="outlined" />
        )}
      />
    </DialogContent> */}
    {/* <DialogActions>
      <Button onClick={handleClose} color="secondary">
        No
      </Button>
      <Button onClick={markAsComplete} color="primary">
        Yes
      </Button>
    </DialogActions> */}
  </Dialog>
</div>

);
};

export default GuestServiceRequestTable;