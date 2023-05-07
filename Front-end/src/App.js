import {useState} from "react";
import {CssBaseline} from "@mui/material";
import {Route, Routes, useLocation} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./components/LandingPage";
import PeopleTable from "./components/PeopleTable/PeopleTable";
import Carousals from "./components/Carousels";
import Admin from "./pages/Admin/Admin";
import BookingTable from "./components/BookingTable";
import Amenities from "./components/Amenities";
import Profile from "./components/Profile";
import AmenityBookingForm from "./components/AmenityBookingForm";
import ServiceRequestTable from "./components/PeopleTable/ServiceRequestTable";


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
                <Route path="/admin/servicerequests" element={<Admin component={<ServiceRequestTable/>} setAuth={setAuth}/>}/>
                <Route path="/admin/amenities" element={<Admin component={<Amenities/>} setAuth={setAuth}/>}/>
                <Route path="/admin/amenities/:amenityId"
                       element={<Admin component={<AmenityBookingForm/>} setAuth={setAuth}/>}/>
                <Route path="/admin/profile" element={<Admin component={<Profile/>} setAuth={setAuth}/>}/>


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



