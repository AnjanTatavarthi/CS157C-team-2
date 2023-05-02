import React, { useState } from "react";
import Navbar from "./Navbar";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/config"; // Add this import

function SignupPage() {
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {
      email,
      dateOfBirth,
      firstName,
      lastName,
      password,
      role,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        // If the registration was successful, redirect to the login page
        navigate("/guest");
      } else {
        // Handle errors (e.g., display an error message or handle specific error codes)
        console.error("Error occurred during registration:", await response.json());
      }

    } catch (error) {
      console.error("Error occurred during registration:", error);
    }
  };

    return (
        <>
        <Navbar />
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Date of Birth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Role"
                    select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    SelectProps={{
                        native: true,
                    }}
                >
                    <option value=""></option>
                    <option value="guest">Guest</option>
                    <option value="staff">Staff</option>
                    <option value="management">Management</option>
                </TextField>
                <Button fullWidth variant="contained" type="submit">
                    Sign Up
                </Button>
            </form>
        </Container>
        </>
        
    );
}

export default SignupPage;
