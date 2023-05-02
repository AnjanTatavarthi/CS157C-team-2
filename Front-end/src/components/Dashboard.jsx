import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CustomPaginationActionsTable from "./Table";
import Navbar from "./NavBar";
import MenuBar from "./MenuBar";


const drawerWidth = 240;


const mdTheme = createTheme();


function DashboardContent() {
    const [open, setOpen] = React.useState(true);

    const loggedInUserInfo = localStorage.getItem("user");
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <Navbar open={open} toggleDrawer={toggleDrawer}/>
                <MenuBar open={open} toggleDrawer={toggleDrawer}/>
                <CustomPaginationActionsTable/>
            </Box>
        </ThemeProvider>
    );
}


export default function Dashboard() {
    return <DashboardContent/>;
}