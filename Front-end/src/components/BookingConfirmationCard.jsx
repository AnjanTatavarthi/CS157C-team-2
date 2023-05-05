import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {Flight, Pool, Event, AccessTime, Email, ConfirmationNumber} from '@mui/icons-material';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
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

const BookingConfirmationCard = ({bookingDetails}) => {
    const {
        bookingId,
        userEmail,
        bookingDate,
        bookingTime,
        amenityId,
    } = bookingDetails;

    const classes = useStyles();

    return (
        <Card variant="outlined" className={classes.root}>
            <CardHeader
                avatar={<Avatar className={classes.icon}><Pool/></Avatar>}
                title={<Typography variant="h5" >Swimming Pool</Typography>}
                className={classes.header}
            />
            <CardContent className={classes.content}>
                <div className={classes.field}>
                    <Event className={classes.label}/>
                    <Typography>{bookingDate}</Typography>
                </div>
                <div className={classes.field}>
                    <AccessTime className={classes.label}/>
                    <Typography>{bookingTime}</Typography>
                </div>
                <div className={classes.field}>
                    <Email className={classes.label}/>
                    <Typography>{userEmail}</Typography>
                </div>
                <div className={classes.field}>
                    <ConfirmationNumber className={classes.label}/>
                    <Typography>{bookingId}</Typography>
                </div>
                <div className={classes.field}>
                    <Flight className={classes.label}/>
                    <Typography>{amenityId}</Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default BookingConfirmationCard;
