import {useEffect, useState} from 'react';
import {
    Container,
    Grid,
    Typography,
    Button,
    makeStyles,
} from '@material-ui/core';
import backend from "../utils/config";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
    },
    slot: {
        border: '1px solid #ccc',
        borderRadius: 4,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#eee',
        },
    },

    slotSelected: {
        backgroundColor: '#4caf50',

        color: '#fff',
        '&:hover': {
            backgroundColor: '#4caf50',
        },
    },

    slotDisabled: {
        backgroundColor: '#808080',
        '&:hover': {
            cursor: 'not-allowed',
            backgroundColor: '#808080',
        },
    }
}));


interface TimingSlotsProps {
    amenityId: string;
    booking_date: Date;
}


function SlotTimingsLayout(props: TimingSlotsProps) {
    const classes = useStyles();
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [disabledSlots, setDisabledSlots] = useState([]);

    useEffect(() => {
        // Make API request to retrieve user data
        backend.get(`/amenityBookings/${props.amenityId}/${props.booking_date}`)
            .then(response => {
                // Update state with user data
                setDisabledSlots(response.data);
                console.log("Slots:", response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSlotClick = (slot) => {
        const index = selectedSlots.indexOf(slot);
        if (index === -1) {
            if (selectedSlots.length < 2) {
                setSelectedSlots([...selectedSlots, slot]);
            }
        } else {
            const newSelectedSlots = [...selectedSlots];
            newSelectedSlots.splice(index, 1);
            setSelectedSlots(newSelectedSlots);
        }
    };
    const startTime = '00:00'; // change this to your desired start time
    const endTime = '24:00'; // change this to your desired end time
    const renderSlots = () => {
        const slots = [];

        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        for (let i = startHour; i <= endHour; i++) {
            for (let j = 0; j < 60; j += 30) {
                if (i === startHour && j < startMinute) continue;
                if (i === endHour && j > endMinute) break;

                const hour = i < 10 ? `0${i}` : i;
                const minute = j === 0 ? '00' : '30';
                const slot = `${hour}:${minute}`;
                const isSelected = selectedSlots.includes(slot);
                const isDisabled = disabledSlots.includes(slot);
                slots.push(
                    <Grid item xs={0.5} key={slot}>
                        <Button
                            onClick={() => handleSlotClick(slot)}
                            className={`${classes.slot} ${isSelected ? classes.slotSelected : ''} ${isDisabled ? classes.slotDisabled : ''}`}
                            disabled={isDisabled}
                        >
                            <Typography variant="body2" color="textSecondary">
                                {slot}
                            </Typography>
                        </Button>
                    </Grid>
                );
            }
        }
        return slots;
    };


    return (
        <Container className={classes.container}>
            <Grid container spacing={1}>
                {renderSlots()}
            </Grid>
        </Container>
    );
}

export default SlotTimingsLayout;
