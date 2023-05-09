import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import backend from "../utils/config";

const TabPanel = ({children, value, index}) => {
    return <div role="tabpanel" hidden={value !== index}>{value === index && <Box p={3}>{children}</Box>}</div>;
};

const BookingTable = () => {
    const [tabValue, setTabValue] = React.useState(0);
    const [bookings, setBookings] = useState([]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const cancelBooking = (bookingId) => {
        // Make API request to cancel the booking
        backend.delete(`/amenityBookings/${bookingId}`)
            .then(response => {
                console.log(response);
                // Remove the cancelled booking from the state
                setBookings(bookings.filter(booking => booking.bookingId !== bookingId));
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        // Make API request to retrieve bookings data

        var user = JSON.parse(localStorage.getItem("user"))
        var URL = "/amenityBookings";
        if(user.role=="guest"){
            URL = "/amenityBookings/guest-email/"+user.email;
        }
        console.log(URL)
        backend.get(URL)
            .then(response => {
                console.log(response);
                // Update state with bookings data
                setBookings(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Upcoming Bookings"/>
                <Tab label="Past Bookings"/>
            </Tabs>

            <TabPanel value={tabValue} index={0}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Booking ID</TableCell>
                                <TableCell>User Email</TableCell>
                                <TableCell>Booking Date</TableCell>
                                <TableCell>Booking Time</TableCell>
                                <TableCell>Amenity ID</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.bookingId}>
                                    <TableCell>{booking.bookingId}</TableCell>
                                    <TableCell>{booking.userEmail}</TableCell>
                                    <TableCell>{booking.bookingDate}</TableCell>
                                    <TableCell>{booking.bookingTime}</TableCell>
                                    <TableCell>{booking.amenityId}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary"
                                                onClick={() => cancelBooking(booking.bookingId)}>
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
            {/* Add TabPanel components for Staff and Admin */}
        </div>
    );
};

export default BookingTable;
