// import * as React from 'react';
// import {createTheme, ThemeProvider} from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import CustomPaginationActionsTable from "./Table";
// import Navbar from "./NavBar";
// import MenuBar from "./MenuBar";

// // Dummy data, replace with API call
// const requestData = [
//   { id: 1, amenity: "Extra Towels", status: "Received" },
//   { id: 2, amenity: "Room Service", status: "Completed" },
// ];

// function UserDashboard() {
//   const [amenity, setAmenity] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add logic to submit request and update requestData
//   };

//   return (
//     <>
//     <Navbar />
//     <Container>
//       <Typography variant="h4" align="center" gutterBottom>
//         Guest Dashboard
//       </Typography>
//       <Box mb={4}>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Request Amenity"
//             value={amenity}
//             onChange={(e) => setAmenity(e.target.value)}
//           />
//           <Button fullWidth variant="contained" type="submit">
//             Submit Request
//           </Button>
//         </form>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Amenity</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {requestData.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.amenity}</TableCell>
//                 <TableCell>{row.status}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//     </>
    
//   );
// }

// export default UserDashboard;
