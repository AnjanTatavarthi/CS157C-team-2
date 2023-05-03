import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CustomPaginationActionsTable from "./Table";
import Navbar from "./NavBar";
import MenuBar from "./MenuBar";
import AdminDashboard from './AdminDashboard';


const drawerWidth = 240;


const mdTheme = createTheme();


function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const [role, setRole] = React.useState(localStorage.getItem("role"));

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
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box sx={{ display: 'flex'}}>
                    <Navbar open={open} toggleDrawer={toggleDrawer} sx={{ flexGrow: 1 }} />
                    <MenuBar open={open} toggleDrawer={toggleDrawer} sx={{ minWidth: '200px' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' , marginTop: '5%'}}>
                    {renderComponent()}
                </Box>
            </Box>
        </ThemeProvider>
    );
}


export default Dashboard;
