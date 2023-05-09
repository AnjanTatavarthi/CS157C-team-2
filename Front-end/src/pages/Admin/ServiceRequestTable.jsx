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
import TablePagination from "@mui/material/TablePagination";

const ServiceRequestTable = () => {
    const [serviceRequests, setServiceRequests] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchServiceRequests();
        fetchStaff();
    }, []);

    const fetchServiceRequests = async () => {
        try {
            const response = await backend.get('/servicerequests');
            console.log('service request');
            console.log(response.data);
            setServiceRequests(response.data);
        } catch (error) {
            console.error('Error fetching service requests:', error);
        }
    };

    const fetchStaff = async () => {
        try {
            const response = await backend.get('/users/staff');
            console.log('STAFF:');
            console.log(response.data);
            setStaffList(response.data);
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    };

    const handleOpen = async (requestId) => {
        console.log('setting open');
        console.log(requestId);
        setSelectedRequest(requestId);
        setOpen(true);
        const selectedRequest = serviceRequests.find(
            (request) => request.requestId === requestId
        );
        if (selectedRequest && selectedRequest.comments) {
            setComments(selectedRequest.comments);
        } else {
            setComments('');
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedStaff(null);
        setShowComments(false);
    };

    const assignStaff = async () => {
        console.log(selectedRequest);
        console.log(selectedStaff);
        if (selectedRequest && selectedStaff) {
            try {
                await backend.patch(`/servicerequests/${selectedRequest}`, {
                    assignedStaff: selectedStaff.email,
                    status: 'assigned',
                });
                fetchServiceRequests();
            } catch (error) {
                console.error('Error assigning staff:', error);
            }
        }
        handleClose();
    };

    const handleShowComments = () => {
        setShowComments(!showComments);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Apply pagination and filtering
    const filteredRequests = serviceRequests
        .filter((request) =>
            request.guestEmail.toLowerCase().includes(filter.toLowerCase())
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((request, index) => (
            <TableRow key={request.requestid}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{request.guestEmail}</TableCell>
                <TableCell>
                    {request.status === 'open' && (
                        <Chip label="Open" color="secondary"/>
                    )}
                    {request.status === 'assigned' && (
                        <Chip label="Assigned" color="warning"/>
                    )}
                    {request.status === 'in progress' && (
                        <Chip label="In Progress" color="info"/>
                    )}
                    {request.status === 'closed' && (
                        <Chip label="Closed" color="success"/>
                    )}
                </TableCell>
                <TableCell>
                    {request.assignedStaff || 'Unassigned'}
                </TableCell>
                <TableCell>
                    {request.status === 'open' && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpen(request.requestId)}
                        >
                            Assign Staff
                        </Button>
                    )}
                </TableCell>
                <TableCell>
                    <Typography variant="body2">
                        {request.comments}
                    </Typography>
                </TableCell>
            </TableRow>
        ));

    return (
        <div>
            <Typography variant="h4" component="h1">
                Service Requests
            </Typography>
            <TextField
                label="Filter by Email"
                variant="outlined"
                value={filter}
                onChange={handleFilterChange}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Guest Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Assigned Staff</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell>Comments</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRequests}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={serviceRequests.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Assign Staff</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        options={staffList}
                        getOptionLabel={(option) =>
                            option.firstName + ' ' + option.lastName
                        }
                        onChange={(event, newValue) => {
                            setSelectedStaff(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Staff" variant="outlined"/>
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={assignStaff} color="primary">
                        Assign
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ServiceRequestTable;