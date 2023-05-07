import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import * as React from "react";
import {useContext} from "react";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {ComponentContext} from "./Dashboard";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

interface MenuProps {
    open: boolean;
    toggleDrawer: () => boolean;

}

export default function MenuBar(props: MenuProps) {

    const [displayComponent, setDisplayComponent] = useContext(ComponentContext);

    const primaryMenuItems = [
        {
            label: 'Dashboard',
            icon: <DashboardIcon/>,
            onClick: () => {
                window.history.replaceState(null, "Dashboard", "/dashboard");
                setDisplayComponent('Carousal')
            }
        },
        {
            label: 'Bookings',
            icon: <ShoppingCartIcon/>,
            onClick: () => {
                window.history.replaceState(null, "Bookings", "/bookings");
                setDisplayComponent('Bookings')
            }
        },
        {
            label: 'Amenities',
            icon: <ShoppingCartIcon/>,
            onClick: () => {
                window.history.replaceState(null, "Amenities", "/amenities");
                setDisplayComponent('Amenities');
            }
        },
        {
            label: 'Service Requests',
            icon: <PeopleIcon/>,
            onClick: () => {
                window.history.replaceState(null, "Amenities", "/amenities");
                setDisplayComponent('Service Requests');
            }
        },
        {
            label: 'Guests',
            icon: <BarChartIcon/>,
            onClick: () => {
                setDisplayComponent('Guests');
            }
        },
    ];

    const secondaryMenuItems = [

        {
            label: 'Rating & Feedback',
            icon: <AssignmentIcon/>,
            onClick: () => setDisplayComponent('Rating & Feedback'),
        },
    ];

    return (<Drawer variant="permanent" open={props.open}>
        <Toolbar
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
            }}
        >
            <IconButton onClick={props.toggleDrawer}>
                <ChevronLeftIcon/>
            </IconButton>
        </Toolbar>
        <Divider/>
        <List component="nav">
            <List component="nav">
                {primaryMenuItems.map(({label, icon, onClick}) => (
                    <ListItemButton key={label} onClick={onClick}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={label}/>
                    </ListItemButton>
                ))}
                <Divider sx={{my: 1}}/>
                {secondaryMenuItems.map((item) => (
                    <ListItemButton key={item.label}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label}/>
                    </ListItemButton>
                ))}
            </List>
        </List>
    </Drawer>);
}
