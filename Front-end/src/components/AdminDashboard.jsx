import React, { useState, useEffect } from 'react';
import { Container, Typography, Tab, Tabs, Box } from '@mui/material';
import AmenitiesTable from './AmenitiesTable';
import ServiceRequestsTable from './ServiceRequestsTable';
import StaffTable from './StaffTable';
import backend from '../utils/config';

const AdminDashboard = () => {
  const [amenities, setAmenities] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchAmenities = async () => {
      const response = await backend.get('/amenities/');
      setAmenities(response.data);
    };

    const fetchServiceRequests = async () => {
      // const response = await backend.get('/api/v1/service-requests');
      // setServiceRequests(response.data);
    };

    const fetchStaffMembers = async () => {
      const response = await backend.get('/users/staff');
      setStaffMembers(response.data);
    };

    fetchAmenities();
    fetchServiceRequests();
    fetchStaffMembers();
  }, []);

  const handleStaffAssignment = async (requestId, staffId) => {
    await backend.patch(`/api/v1/service-requests/${ requestId }`, {
      assignedStaff: staffId,
    });

    setServiceRequests((prevServiceRequests) =>
      prevServiceRequests.map((request) =>
        request.id === requestId ? { ...request, assignedStaff: staffId } : request
      )
    );
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Management Dashboard
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Amenities" />
            <Tab label="Service Requests" />
            <Tab label="Staff Members" />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          {selectedTab === 0 && (
            <>
              <Typography variant="h5" gutterBottom>
                Amenities
              </Typography>
              <AmenitiesTable amenities={amenities} />
            </>
          )}
          {selectedTab === 1 && (
            <>
              <Typography variant="h5" gutterBottom>
                Service Requests
              </Typography>
              <ServiceRequestsTable
                serviceRequests={serviceRequests}
                staffMembers={staffMembers}
                onStaffAssignment={handleStaffAssignment}
              />
            </>
          )}
          {selectedTab === 2 && (
            <>
              <Typography variant="h5" gutterBottom>
                Staff Members
              </Typography>
              <StaffTable staffMembers={staffMembers} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default AdminDashboard;
