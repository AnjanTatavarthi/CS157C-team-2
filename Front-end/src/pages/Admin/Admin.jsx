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
import BookingTable from "../../components/BookingTable";

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
            }
        },
        {
            label: 'Bookings',
            icon: <ShoppingCartIcon/>,
            onClick: () => {
                navigate("/admin/bookings", {replace: true});
            }
        },
        {
            label: 'Amenities',
            icon: <ShoppingCartIcon/>,
            onClick: () => {
                navigate("/admin/amenities", {replace: true});
            }
        },
        {
            label: 'Service Requests',
            icon: <PeopleIcon/>,
            onClick: () => {
                navigate("/admin/serviceRequests", {replace: true});
            }
        },
        {
            label: 'People',
            icon: <PeopleIcon/>,
            onClick: () => {
                navigate("/admin/people", {replace: true});
            }
        }
    ];

    const secondaryMenuItems = [
        {
            label: 'Rating & Feedback',
            icon: <AssignmentIcon/>,
            onClick: () => {
            },
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
