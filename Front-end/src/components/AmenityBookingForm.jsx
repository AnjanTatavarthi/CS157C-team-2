import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Timeslots from "./Timeslots";

const useStyles = makeStyles({
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
        marginBottom: '20px',
    },
    textField: {
        marginBottom: '20px',
    },
    button: {
        marginBottom: '20px',
    },
});

interface AmenityBookingFormProps {
    amenityId: string;

}


function AmenityBookingForm(props: AmenityBookingFormProps) {
    const classes = useStyles();
    const [startDate, setStartDate] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log("Start date form: ", data.get("date"));
        setSubmitted(true);
    };

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>

                <TextField
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    type="date"
                    id="date"
                    name="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Button className={classes.button} variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>

            {submitted && (
                <Timeslots amenityId={props.amenityId} booking_date={startDate}/>
            )}
        </div>
    );
}

export default AmenityBookingForm;
