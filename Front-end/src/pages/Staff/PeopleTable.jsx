import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GuestTable from './GuestTable';
import StaffTable from '../../components/PeopleTable/StaffTable';
import AdminTable from './AdminTable';

const TabPanel = ({children, value, index}) => {
    return <div role="tabpanel" hidden={value !== index}>{value === index && <Box p={3}>{children}</Box>}</div>;
};

const PeopleTable = () => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Guest"/>
                <Tab label="Staff"/>
                <Tab label="Admin"/>
            </Tabs>

            <TabPanel value={tabValue} index={0}>
                <GuestTable/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <StaffTable/>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <AdminTable/>
            </TabPanel>
        </div>
    );
};

export default PeopleTable;
