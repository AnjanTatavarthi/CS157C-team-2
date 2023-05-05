import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Timeslots from './Timeslots';
import backend from "../utils/config";


const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // marginBottom: '20px',
    },

    button: {
        marginTop: '20px',
        marginBottom: '20px',
    },
}));


interface AmenityBookingFormProps {
    amenityId: string;
}

function AmenityBookingForm(props: AmenityBookingFormProps) {
    const classes = useStyles();
    const [bookingDate, setBookingDate] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [timeslotsKey, setTimeslotsKey] = useState(0);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {
        // Make API request to retrieve user data
        backend.get('amenities')
            .then(response => {
                // Update state with user data
                setAmenities(response.data);
                console.log("Amenity Names:", response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const handleSlotChange = (selectedSlots) => {
        setSelectedSlots(selectedSlots);
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        const data = new FormData(event.currentTarget);
        setBookingDate(data.get('date'));
        setSubmitted(true);
        setTimeslotsKey((prevKey) => prevKey + 1);
    };

    const createBooking = (event) => {
        event.preventDefault();
        console.log("Submitting create booking form...");
        console.log(selectedSlots);
        setSubmitted(false);

        selectedSlots.forEach((slot) => {
                backend.post('/amenityBookings', {
                    userEmail: user.email,
                    bookingDate: bookingDate,
                    bookingTime: slot,
                    amenityId: props.amenityId
                }).then((response) => {
                    console.log("booking successful: " + response);
                }).catch(() => {
                })
            }
        );
    };

    return (
        <div className={classes.root}>
            <div className={classes.form}>
                <TextField
                    fullWidth
                    variant="outlined"

                    type="date"
                    id="date"
                    name="date"
                    value={bookingDate}
                    onChange={(event) => {
                        setBookingDate(event.target.value);
                        setSubmitted(true);
                        setTimeslotsKey((prevKey) => prevKey + 1);
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

            </div>

            {submitted &&
                <div>
                    <Timeslots key={timeslotsKey} amenityId={props.amenityId} booking_date={bookingDate}
                               onSlotChange={handleSlotChange}/>

                    <container>
                        <form className={classes.form} onSubmit={createBooking}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={selectedSlots.length === 0}
                            >
                                Book Slots
                            </Button>
                        </form>
                    </container>

                </div>

            }
        </div>
    );
}

export default AmenityBookingForm;
