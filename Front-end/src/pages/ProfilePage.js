import React, { useState } from "react";
import Navbar from "./Navbar";
import { Container, TextField, Button, Typography } from "@mui/material";

function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update user profile
  };

  return (
    <>
    <Navbar />
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button fullWidth variant="contained" type="submit">
          Update Profile
        </Button>
      </form>
    </Container>
    </>
    
  );
}

export default ProfilePage;
