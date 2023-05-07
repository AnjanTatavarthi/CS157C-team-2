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


const mdTheme = createTheme();

function UserDashboard() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const primaryMenuItems = [
        {
            label: 'Dashboard',
            icon: <DashboardIcon/>,
            onClick: () => {

            }
        },
        {
            label: 'Bookings',
            icon: <ShoppingCartIcon/>,
            onClick: () => {

            }
        },
        {
            label: 'Amenities',
            icon: <ShoppingCartIcon/>,
            onClick: () => {

            }
        },
        {
            label: 'Service Requests',
            icon: <PeopleIcon/>,
            onClick: () => {

            }
        },
        {
            label: 'Guests',
            icon: <BarChartIcon/>,
            onClick: () => {

            }
        },
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
                        <Carousals/>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default UserDashboard;
