import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Carousals from "../../components/Carousels";
import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {useNavigate} from "react-router-dom";


const mdTheme = createTheme();

function Admin(props) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const primaryMenuItems = [
        {
            label: 'Dashboard',
            icon: <DashboardIcon/>,
            onClick: () => {
                navigate("/admin", {replace: true});
            },
            path: '/admin'
        },
        {
            label: 'Bookings',
            icon: <ShoppingCartIcon/>,
            onClick: () => {
                navigate("/admin/bookings", {replace: true});
            },
            path: '/admin/bookings'
        },
        {
            label: 'Amenities',
            icon: <ShoppingCartIcon/>,
            onClick: () => {
                navigate("/admin/amenities", {replace: true});
            },
            path: '/admin/amenities'
        },
        {
            label: 'Service Requests',
            icon: <PeopleIcon/>,
            onClick: () => {
                navigate("/admin/servicerequests", {replace: true});
            },
            path: '/admin/servicerequests'
        },
        {
            label: 'People',
            icon: <PeopleIcon/>,
            onClick: () => {
                navigate("/admin/people", {replace: true});
            },
            path: '/admin/people'
        }
    ];

    const secondaryMenuItems = [
        {
            label: 'Rating & Feedback',
            icon: <AssignmentIcon/>,
            onClick: () => {
            },
            path: '/admin/rating'
        },
    ];

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>

                <Navbar open={open}
                        toggleDrawer={toggleDrawer}
                />
                <MenuBar open={open}
                         toggleDrawer={toggleDrawer}
                         secondaryMenuItems={secondaryMenuItems}
                         primaryMenuItems={primaryMenuItems}
                />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar/>
                    <Box p={3}>
                        {props.component}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Admin;
