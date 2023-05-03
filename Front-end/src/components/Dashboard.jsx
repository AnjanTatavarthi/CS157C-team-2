import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CustomPaginationActionsTable from "./Table";
import Navbar from "./NavBar";
import MenuBar from "./MenuBar";
import AdminDashboard from './AdminDashboard';
import ComponentDisplayBox from "./ComponentDisplayBox";



const mdTheme = createTheme();


function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const [displayComponent, setDisplayComponent]  = React.useState();
    const [role, setRole] = React.useState(localStorage.getItem("role"));

    const loggedInUserInfo = localStorage.getItem("user");
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const renderComponent = () => {
        var myrole = JSON.parse(localStorage.getItem("user")).role;
        console.log("RENDERING")
        console.log(myrole);

        switch (myrole) {
            case 'admin':
                return <AdminDashboard />;
            // case 'staff':
            //     return <StaffDashBoard />;
            // case 'user':
            //     return <UserDashBoard />;
            default:
                return <CustomPaginationActionsTable />;
        }
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <Navbar open={open} toggleDrawer={toggleDrawer}/>
                <MenuBar open={open} toggleDrawer={toggleDrawer}/>
                <ComponentDisplayBox/>

            </Box>
        </ThemeProvider>
    );
}


export default Dashboard;
