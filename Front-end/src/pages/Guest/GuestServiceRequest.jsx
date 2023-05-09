import React, { useState, useEffect } from 'react';
import backend from '../../utils/config';
import GuestServiceRequestTable from './GuestServiceRequestTable';
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

const GuestServiceRequest = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [openNewRequest, setOpenNewRequest] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [comment, setComment] = useState('');

  var guestEmail = JSON.parse(localStorage.getItem("user"))["email"];
  console.log("Guest!!!!!!!!!!!!!!!");
  console.log(guestEmail);

  useEffect(() => {
    fetchServiceRequests();
    // fetchStaff();
    fetchAmenities();
  }, []);

  // ... (existing functions)

  const handleNewRequestOpen = () => {
    setOpenNewRequest(true);
  };

  const handleNewRequestClose = () => {
    setOpenNewRequest(false);
  };

  const fetchAmenities = async () => {
    try {
      const response = await backend.get('/amenities');
      setAmenities(response.data);
    } catch (error) {
      console.error('Error fetching amenities:', error);
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const response = await backend.get('/servicerequests/guest-email/' + guestEmail);
      setServiceRequests(response.data);
    } catch (error) {
      console.error('Error fetching service requests:', error);
    }
  };



  const createNewServiceRequest = async () => {
    console.log("creating new request:")
    console.log(selectedAmenity)
    try {
      await backend.post('/servicerequests', {
        guestEmail: guestEmail,
        amenityId: selectedAmenity.id,
        comments: comment,
      });
      window.location.reload()
      // handleNewRequestClose();
    } catch (error) {
      console.error('Error creating new service request:', error);
    }
  };

  return (
    <div>
      {/* ... (existing JSX) */}


      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1%' }}>
      <Typography variant="h4" component="h1">
        Service Requests
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewRequestOpen}
        style={{ marginTop: '1rem' }}
      >
        New Service Request
      </Button>
    </div>

      <Dialog open={openNewRequest} onClose={handleNewRequestClose}>
        <DialogTitle>New Service Request</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={amenities}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
              setSelectedAmenity(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Amenity" variant="outlined" fullWidth />
            )}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Comment"
            variant="outlined"
            fullWidth
            multiline
           
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewRequestClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={createNewServiceRequest} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <GuestServiceRequestTable/>
    </div>
    
)};

export default GuestServiceRequest;    