import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {Flight, Pool, Event, AccessTime, Email, ConfirmationNumber} from '@mui/icons-material';
import BookingIcon from '@mui/icons-material/EventAvailable';
import {makeStyles} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import backend from '../utils/config';

const useStyles = makeStyles({
    root: {
        marginTop: 100,
        maxWidth: 500,
        margin: 'auto',
    },
    header: {
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        paddingBottom: 10,
    },
    icon: {
        backgroundColor: '#b3e5fc',
    },
    content: {
        paddingTop: 10,
    },
    field: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        marginRight: 8,
    },
});

const BookingConfirmationCard = () => {
    const {booking_id} = useParams();

    const classes = useStyles();
    const [bookingInfo, setBookingInfo] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        const fetchBookingInfo = async () => {
            try {
                const response = await backend.get(`amenityBookings/booking_info/${user.email}/${booking_id}`);
                setBookingInfo(response.data);
                console.log('Booking Info:', response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookingInfo();
    }, [booking_id]);

    return (
        <Card variant="outlined" className={classes.root}>
            <CardHeader
                avatar={<Avatar className={classes.icon}>
                    <BookingIcon/>
                </Avatar>}
                title={<Typography variant="h5">{bookingInfo?.amenityName}</Typography>}
                className={classes.header}
            />
            <CardContent className={classes.content}>
                <div className={classes.field}>
                    <Event className={classes.label}/>
                    <Typography>Booking Date : </Typography>

                    <Typography>{bookingInfo?.bookingDate}</Typography>
                </div>
                <div className={classes.field}>
                    <AccessTime className={classes.label}/>
                    <Typography>Slots : </Typography>
                    <Typography>{bookingInfo?.bookingTime.join(', ')}</Typography>
                </div>

                <div className={classes.field}>
                    <Email className={classes.label}/>
                    <Typography>Email : </Typography>
                    <Typography>{bookingInfo?.userEmail}</Typography>
                </div>
                <div className={classes.field}>
                    <ConfirmationNumber className={classes.label}/>
                    <Typography>BookingId : </Typography>
                    <Typography>{booking_id}</Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default BookingConfirmationCard;
