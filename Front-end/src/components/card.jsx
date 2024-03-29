import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useNavigate} from "react-router-dom";

interface AmenityCardProps {
    amenityId: string;
    description: string;
    location: string;
    name: string;
    openHours: string;
    status: boolean
}

export default function AmenityCard(props: AmenityCardProps) {
    var user = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate();
    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                // avatar={
                //     <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                //         R
                //     </Avatar>
                // }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={props.name}
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image="/static/slideshow_images/jacuzzi.webp"
                alt={props.name}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>

            <CardActions disableSpacing sx={{justifyContent: 'center'}}>
                <Button variant="contained" color="primary" endIcon={<SendIcon/>}
                        onClick={() => navigate(`/${user.role}/amenities/${props.amenityId}`, {replace: true})}>
                    Create Booking
                </Button>
            </CardActions>
        </Card>
    );
}