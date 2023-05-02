import { useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    Button,
    makeStyles,
} from '@material-ui/core';

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

function SlotTimingsLayout() {
    const classes = useStyles();
    const [selectedSlots, setSelectedSlots] = useState([]);
    const disabledSlots = ['09:00', '10:00', '11:00'];

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

    const renderSlots = () => {
        const slots = [];
        for (let i = 0; i < 24; i++) {
            const hour = i < 10 ? `0${i}` : i;
            for (let j = 0; j < 2; j++) {
                const minute = j === 0 ? '00' : '30';
                const slot = `${hour}:${minute}`;
                const isSelected = selectedSlots.includes(slot);
                const isDisabled = disabledSlots.includes(slot);
                slots.push(
                    <Grid item xs={0.5} key={slot}>
                        <Button
                            onClick={() => handleSlotClick(slot)}
                            className={`${classes.slot} ${
                                isSelected ? classes.slotSelected : ''
                            } ${isDisabled ? classes.slotDisabled : ''}`}
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
