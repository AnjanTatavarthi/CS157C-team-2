import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Container, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("customer");

  const handleChangeRole = (newRole) => {
    setRole(newRole);
};

  const navigate = useNavigate();

  // Check for user session data
  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const parsedUserSession = JSON.parse(userSession);
      setUsername(parsedUserSession.username);
      setPassword(parsedUserSession.password);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to authenticate user and redirect based on role
    const userSessionData = {
      username,
      password,
      role,
    };
    localStorage.setItem("userSession", JSON.stringify(userSessionData));
    if (role === "customer") {
      navigate("/guest");
    } else if (role === "staff") {
      navigate("/staff");
    }
  };

  return (
    <>
    <Navbar />
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth variant="contained" type="submit">
          Login
        </Button>
      </form>


      <Typography variant="body1" align="center" gutterBottom>
      Don't have an account?{" "}
      <Link component={RouterLink} to="/signup">
        Sign Up
      </Link>
    </Typography>
    
    <Box display="flex" justifyContent="center" marginTop="1rem">
          <Button
            variant={role === "customer" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleChangeRole("customer")}
          >
            Customer
          </Button>
          <Button
            variant={role === "staff" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleChangeRole("staff")}
            style={{ marginLeft: "1rem" }}
          >
            Hotel Staff
          </Button>
        </Box>


    </Container>
    </>
    
  );
}


export default LoginPage;