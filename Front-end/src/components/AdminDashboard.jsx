import React, { useState, useEffect } from 'react';
import { Container, Typography, Tab, Tabs, Box } from '@mui/material';
import AmenitiesTable from './AmenitiesTable';
import ServiceRequestsTable from './ServiceRequestsTable';
import StaffTable from './StaffTable';
import backend from '../utils/config';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from "./NavBar";
import MenuBar from "./MenuBar";
import {ComponentContext} from "./Dashboard";

import ComponentDisplayBox from "./ComponentDisplayBox";
import {createContext} from "react";
import {useContext} from "react";


import ProfilePage from "./ProfilePage";

import Carousals from "./Carousels";
import DisplayAmenities from "./AmenitiesPage";

// export const ComponentContext = createContext();
const mdTheme = createTheme();

const AdminDashboard = () => {
  console.log("In admin")
  const [open, setOpen] = React.useState(true);
  const [amenities, setAmenities] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [displayComponent, setDisplayComponent] = useContext(ComponentContext);
  // const [displayComponent, setDisplayComponent] = React.useState("carousal");

  const toggleDrawer = () => {
    setOpen(!open);
};


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
      // <ComponentContext.Provider value={[displayComponent, setDisplayComponent]}>
      //       <ThemeProvider theme={mdTheme}>
      //           <Box sx={{display: 'flex'}}>
      //               <CssBaseline/>
      //               <Navbar open={open} toggleDrawer={toggleDrawer}/>
      //               <MenuBar open={open} toggleDrawer={toggleDrawer}/>
      //               <ComponentDisplayBox/>
      //           </Box>
      //       </ThemeProvider>
      //   </ComponentContext.Provider>
      // <ComponentDisplayBox displayComponent={displayComponent}/>
	  <Box
        component="main"
        sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        }}
    >
        {/* <Toolbar/> */}

        <Box p={3}>

            {/*<ProfilePage user={{*/}
            {/*    "firstName": "Sasanka",*/}
            {/*    "lastName": "Kosuru",*/}
            {/*    "dateOfBirth": "2022-03-12",*/}
            {/*    "password": "Sasanka@1234",*/}
            {/*    "email": "sasanka@gmail.com",*/}
            {/*    "role": "user"*/}
            {/*}}/>*/}

            {/* <CustomPaginationActionsTable/> */}
            {/* <Timeslots amenityId={'123344'} booking_date={'2023-05-02'}/> */}
            {/* <AmenityBookingForm amenityId={'123344'}/> */}


            {/* <div>
               <BookingConfirmationCard bookingDetails={bookingDetails} />
            </div> */}
            {/*<Carousals/>*/}


            <div>
                {(() => {
                    var userData = JSON.parse(localStorage.getItem("user"));
                    console.log(userData);
                    console.log("displayComponent")
                    console.log(displayComponent)
                    switch (displayComponent) {
                        case "Carousal":
                            return <Carousals/>;
                        case "Profile":
                            return <ProfilePage user={{
                                "firstName": userData.firstName,
                                "lastName": userData.lastName,
                                "dateOfBirth": userData.dateOfBirth,
                                "password": userData.password,
                                "email": userData.email,
                                "role": userData.role
                            }}/>;
                        case "Amenities":
                            return <DisplayAmenities/>;
                        default:
                            return <span>Other</span>;
                    }
                })()}
            </div>
        </Box>
    </Box>
  );
};

export default AdminDashboard;
