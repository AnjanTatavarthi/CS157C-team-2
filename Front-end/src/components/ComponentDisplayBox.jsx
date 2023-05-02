import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import DisplayAmenities from "./AmenitiesPage";
import * as React from "react";
import Timeslots from "./Timeslots";


export default function ComponentDisplayBox() {

    return (<Box
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

        <Box p={4}>

        </Box>

    </Box>);
}
