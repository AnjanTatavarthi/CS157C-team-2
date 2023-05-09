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
import {Email} from "@mui/icons-material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";

const TabPanel = ({children, value, index}) => {
    return <div role="tabpanel" hidden={value !== index}>{value === index && <Box p={3}>{children}</Box>}</div>;
};

const BookingTable = () => {
    const [tabValue, setTabValue] = React.useState(0);
    const [bookings, setBookings] = useState([]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const currentDate = new Date();

    const updated_bookings = bookings.map(booking => {

        const [year, month, day] = booking.bookingDate.split('-');
        const bookingDate = new Date(year, month, day, 0, 0, 0, 0);

        let isGreaterThanOrEqual;
        if (currentDate.getMonth() <= bookingDate.getMonth() && currentDate.getDate() <= bookingDate.getDate() + 1
            && currentDate.getFullYear() <= bookingDate.getFullYear()) {
            isGreaterThanOrEqual = true;
        } else {
            isGreaterThanOrEqual = false;
        }
        booking.upcoming = isGreaterThanOrEqual;
        return booking;
    });

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
    }

    const handleRatingChange = (bookingId, newRating) => {
        // Make API request to update the rating for the booking with the bookingId
        backend.put(`/amenityBookings/${bookingId}`, {rating: newRating})
            .then(response => {
                console.log(response);
                // Update the booking in the state with the new rating
                setBookings(prevBookings => {
                    const updatedBookings = prevBookings.map(booking => {
                        if (booking.bookingId === bookingId) {
                            return {
                                ...booking,
                                rating: newRating,
                            };
                        }
                        return booking;
                    });
                    return updatedBookings;
                });
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        // Make API request to retrieve bookings data

        var user = JSON.parse(localStorage.getItem("user"))
        var URL = "/amenityBookings";
        if (user.role === "guest") {
            URL = "/amenityBookings/guest-email/" + user.email;
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
                                <TableCell>Amenity Name</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Booking Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {updated_bookings.filter((booking) => {
                                return booking.upcoming === true
                            }).sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate)).map(booking => (
                                <TableRow key={booking.bookingId}>
                                    <TableCell>{booking.bookingId.slice(0, 5)}</TableCell>
                                    <TableCell>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Email sx={{marginRight: '0.5rem'}}/>
                                            <span>{booking.userEmail}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <EventIcon sx={{marginRight: '0.5rem'}}/>
                                            <span>{booking.bookingDate}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {booking.bookingTime.map(time => (
                                            <div
                                                key={time}
                                                style={{display: 'flex', alignItems: 'center'}}
                                            >
                                                <AccessTimeIcon sx={{marginRight: '0.5rem'}}/>
                                                <span>{time}</span>
                                            </div>
                                        ))}
                                    </TableCell>
                                    <TableCell>{booking.amenityName}</TableCell>
                                    <TableCell>
                                        <Rating
                                            name={`rating-${booking.bookingId}`}
                                            value={booking.rating}
                                            onChange={(event, newRating) => handleRatingChange(booking.bookingId, newRating)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {booking.canceled === false && (
                                            <Chip label="Confirmed" color="success"/>
                                        )}
                                        {booking.canceled === true && (
                                            <Chip label="Cancelled" color="warning"/>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            key={booking.bookingId}
                                            variant="contained"
                                            color="secondary"
                                            disabled={booking.canceled}
                                            onClick={() =>
                                                cancelBooking(booking.userEmail, booking.bookingId)
                                            }
                                        >
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Booking ID</TableCell>
                                <TableCell>User Email</TableCell>
                                <TableCell>Booking Date</TableCell>
                                <TableCell>Booking Time</TableCell>
                                <TableCell>Amenity Name</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Booking Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {updated_bookings.filter((booking) => {
                                return booking.upcoming === false
                            }).sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)).map(booking => (
                                <TableRow key={booking.bookingId}>
                                    <TableCell>{booking?.bookingId?.slice(0, 5)}</TableCell>
                                    <TableCell>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Email sx={{marginRight: '0.5rem'}}/>
                                            <span>{booking.userEmail}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <EventIcon sx={{marginRight: '0.5rem'}}/>
                                            <span>{booking.bookingDate}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {booking.bookingTime.map(time => (
                                            <div
                                                key={time}
                                                style={{display: 'flex', alignItems: 'center'}}
                                            >
                                                <AccessTimeIcon sx={{marginRight: '0.5rem'}}/>
                                                <span>{time}</span>
                                            </div>
                                        ))}
                                    </TableCell>
                                    <TableCell>{booking.amenityName}</TableCell>
                                    <TableCell>
                                        <Rating
                                            name={`rating-${booking.bookingId}`}
                                            value={booking.rating}
                                            onChange={(event, newRating) => handleRatingChange(booking.bookingId, newRating)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {booking.canceled === false && (
                                            <Chip label="Confirmed" color="success"/>
                                        )}
                                        {booking.canceled === true && (
                                            <Chip label="Cancelled" color="warning"/>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
        </div>
    );
};

export default BookingTable;
