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
import {useContext} from "react";
import {ComponentContext} from "./Dashboard";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}


const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


interface AmenityCardProps {
    amenityId: string;
    description: string;
    location: string;
    name: string;
    openHours: string;
    status: boolean
}

export default function AmenityCard(props: AmenityCardProps) {


    // const [displayComponent, setDisplayComponent] = useContext(ComponentContext);

    console.log(props.props);
    const [expanded, setExpanded] = React.useState(false);

    console.log("Name Props" + props.name);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                <Button variant="contained" color="primary" endIcon={<SendIcon/>} >
                    Create Booking
                </Button>
            </CardActions>
        </Card>
    );
}