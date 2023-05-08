import {useState} from "react";
import {CssBaseline} from "@mui/material";
import {Route, Routes, useLocation} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./components/LandingPage";
import PeopleTable from "./pages/Admin/PeopleTable";
import Carousals from "./components/Carousels";
import Admin from "./pages/Admin/Admin";
import BookingTable from "./pages/Admin/BookingTable";
import Amenities from "./components/Amenities";
import Profile from "./components/Profile";
import AmenityBookingForm from "./components/AmenityBookingForm";
import ServiceRequestTable from "./pages/Admin/ServiceRequestTable";
import Staff from "./pages/Staff/Staff";
import Guest from "./pages/Guest/Guest";
import StaffServiceRequestTable from "./pages/Staff/StaffServiceRequestTable";
import GuestServiceRequestTable from "./pages/Guest/GuestServiceRequestTable";
import BookingConfirmationCard from "./components/BookingConfirmationCard";


function App() {
    const [auth, setAuth] = useState(false);
    const location = useLocation();

    return (
        <>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={<LandingPage setAuth={setAuth}/>}/>
                <Route path="/login" element={<Login setAuth={setAuth}/>}/>
                <Route path="/signup" element={<Signup setAuth={setAuth}/>}/>

                <Route path="/admin" element={<Admin component={<Carousals/>} setAuth={setAuth}/>}/>
                <Route path="/admin/people" element={<Admin component={<PeopleTable/>} setAuth={setAuth}/>}/>
                <Route path="/admin/bookings" element={<Admin component={<BookingTable/>} setAuth={setAuth}/>}/>
                <Route path="/admin/servicerequests"
                       element={<Admin component={<ServiceRequestTable/>} setAuth={setAuth}/>}/>
                <Route path="/admin/amenities" element={<Admin component={<Amenities/>} setAuth={setAuth}/>}/>
                <Route path="/admin/amenities/:amenityId"
                       element={<Admin component={<AmenityBookingForm/>} setAuth={setAuth}/>}/>
                <Route path="/admin/amenities/booking-confirmation/:booking_id"
                       element={<Admin component={<BookingConfirmationCard/>} setAuth={setAuth}/>}/>
                <Route path="/admin/profile" element={<Admin component={<Profile/>} setAuth={setAuth}/>}/>

                <Route path="/staff" element={<Staff component={<Carousals/>} setAuth={setAuth}/>}/>
                {/* <Route path="/admin/people" element={<Admin component={<PeopleTable/>} setAuth={setAuth}/>}/> */}
                {/* <Route path="/admin/bookings" element={<Admin component={<BookingTable/>} setAuth={setAuth}/>}/> */}
                <Route path="/staff/servicerequests"
                       element={<Staff component={<StaffServiceRequestTable/>} setAuth={setAuth}/>}/>
                {/* <Route path="/admin/amenities" element={<Admin component={<Amenities/>} setAuth={setAuth}/>}/> */}
                {/* <Route path="/admin/amenities/:amenityId" */}
                {/* element={<Admin component={<AmenityBookingForm/>} setAuth={setAuth}/>}/> */}
                {/* <Route path="/admin/profile" element={<Admin component={<Profile/>} setAuth={setAuth}/>}/> */}


                <Route path="/guest" element={<Guest component={<Carousals/>} setAuth={setAuth}/>}/>
                {/* <Route path="/admin/people" element={<Admin component={<PeopleTable/>} setAuth={setAuth}/>}/> */}
                {/* <Route path="/admin/bookings" element={<Admin component={<BookingTable/>} setAuth={setAuth}/>}/> */}
                <Route path="/guest/servicerequests"
                       element={<Guest component={<GuestServiceRequestTable/>} setAuth={setAuth}/>}/>
                <Route path="/guest/amenities" element={<Guest component={<Amenities/>} setAuth={setAuth}/>}/>

                <Route path="/guest/amenities/:amenityId"
                       element={<Guest component={<AmenityBookingForm/>} setAuth={setAuth}/>}/>


                {/* <Route path="/admin/amenities/:amenityId" */}
                {/* element={<Admin component={<AmenityBookingForm/>} setAuth={setAuth}/>}/> */}
                {/* <Route path="/admin/profile" element={<Admin component={<Profile/>} setAuth={setAuth}/>}/> */}


                {/*<Route*/}
                {/*    path="/"*/}
                {/*    element={*/}
                {/*        auth ? (*/}
                {/*            // <Home setAuth={setAuth} />*/}
                {/*            <Navigate to="/dashboard" state={{from: location}} replace/>*/}
                {/*        ) : (*/}
                {/*            // <Navigate to="/login" state={{ from: location }} replace />*/}
                {/*            <Navigate to="/" state={{from: location}} replace/>*/}
                {/*        )*/}
                {/*    }*/}
                {/*/>*/}

            </Routes>
        </>
    );
}

export default App;



