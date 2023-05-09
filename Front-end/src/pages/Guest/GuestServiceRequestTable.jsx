import React, {useState, useEffect} from 'react';
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

    const [selectedDetails, setSelectedDetails] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);


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
            const response = await backend.get('/servicerequests/guest-email/' + guestEmail);
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


    const deleteServiceRequest = async (requestId) => {
        console.log("Deleting service request")
        console.log(requestId)
        // console.log(request.requestId)
        try {
            console.log('/servicerequests/' + requestId)
            const response = await backend.delete('/servicerequests/' + requestId);
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

    const handleDetailsOpen = (request) => {
        setSelectedDetails(request);
        setOpenDetails(true);
    };

    const handleDetailsClose = () => {
        setOpenDetails(false);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Assigned Staff</TableCell>
                            <TableCell>Status</TableCell>
                            {/* <TableCell>Assigned Staff</TableCell> */}
                            {/* <TableCell>View Details</TableCell> */}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {serviceRequests.map((request, index) => (
                            <TableRow key={request.requestid}>
                                {/* ... (existing cell JSX) */}
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {request.assignedStaff || 'Unassigned'}
                                </TableCell>
                                <TableCell>

                                    {request.status === 'open' && (
                                        <Chip label="Open" color="secondary"/>
                                    )}
                                    {request.status === 'assigned' && (
                                        <Chip label="Assigned" color="warning"/>
                                    )}
                                    {/* {request.status === 'in progress' && (
  <Chip label="In Progress" color="info" />
)} */}
                                    {request.status === 'closed' && (
                                        <Chip label="Closed" color="success"/>
                                    )}


                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleDetailsOpen(request)}
                                    >
                                        Details
                                    </Button>

                                    <Button style={{marginLeft: '1rem'}}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => deleteServiceRequest(request.requestId)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDetails} onClose={handleDetailsClose}>
                <DialogTitle>Service Request Details</DialogTitle>
                <DialogContent>
                    {selectedDetails && (
                        <div>
                            <Typography variant="body1">ID: {selectedDetails.requestId}</Typography>
                            <Typography variant="body1">Guest Email: {selectedDetails.guestEmail}</Typography>
                            <Typography variant="body1">Comments: {selectedDetails.comments}</Typography>
                            <Typography variant="body1">Status: {selectedDetails.status}</Typography>
                            <Typography variant="body1">Assigned
                                Staff: {selectedDetails.assignedStaff || 'Unassigned'}</Typography>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDetailsClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
};

export default GuestServiceRequestTable;