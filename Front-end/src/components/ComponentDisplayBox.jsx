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
import BookingConfirmationCard from "./BookingConfirmationCard";
import {useContext} from "react";
import {ComponentContext} from "./Dashboard";


export default function ComponentDisplayBox() {


    const [displayComponent, setDisplayComponent] = useContext(ComponentContext);
    console.log("Display Component:", displayComponent);
    const bookingDetails = {
        "bookingId": "bbb2d1e4-d925-4793-825f-8967e5c455fa",
        "userEmail": "anjan@example.com",
        "bookingDate": "2023-05-02",
        "bookingTime": "12:30:00",
        "amenityId": "123344"
    };


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
            {/*}}/>*/}

            {/* <CustomPaginationActionsTable/> */}
            {/* <Timeslots amenityId={'123344'} booking_date={'2023-05-02'}/> */}
            {/* <AmenityBookingForm amenityId={'123344'}/> */}


            <div>
               <BookingConfirmationCard bookingDetails={bookingDetails} />
            </div>
            {/*<Carousals/>*/}


            <div>
                {(() => {
                    var userData = JSON.parse(localStorage.getItem("user"));
                    console.log(userData);
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

    </Box>);
}
