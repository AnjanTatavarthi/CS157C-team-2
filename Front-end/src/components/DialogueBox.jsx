import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Ratings from './Ratings';
import Card from '@mui/material/Card';
import { blue } from '@mui/material/colors';



function SimpleDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };
    const sendData = (val)=>{
        // do not forget to bind getData in constructor
        console.log(val);
    }

    return (
        <Dialog className = 'vd' height = '500px' onClose={handleClose} open={open}>
            <Ratings sendData={sendData}></Ratings>
            <center>
                <Button variant="contained" color="success" onClick={handleClose}>
                    Submit
                </Button>
            </center>
            <br></br>
        </Dialog>
    );
}

export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
            <Typography variant="subtitle1" component="div">
            </Typography>
            <br />
            <Button variant="outlined" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <SimpleDialog
                style={{ width: 600, height: 500}}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}