import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import DisplayAmenities from "./AmenitiesPage";
import * as React from "react";
import Timeslots from "./Timeslots";
import ProfilePage from "./ProfilePage";
import Carousals from "./Carousels";
import Table from "@mui/material/Table";
import CustomPaginationActionsTable from "./Table";
import AmenityBookingForm from "./AmenityBookingForm";



export default function ComponentDisplayBox() {

    return (<Box
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
        <Toolbar/>

        <Box p={3}>

            {/*<ProfilePage user={{*/}
            {/*    "firstName": "Sasanka",*/}
            {/*    "lastName": "Kosuru",*/}
            {/*    "dateOfBirth": "2022-03-12",*/}
            {/*    "password": "Sasanka@1234",*/}
            {/*    "email": "sasanka@gmail.com",*/}
            {/*    "role": "user"*/}
            {/*}} />*/}

            {/*<Timeslots amenityId={'123344'} booking_date={'2023-05-02'}/>*/}
            <AmenityBookingForm amenityId={'123344'}/>
        </Box>

    </Box>);
}
