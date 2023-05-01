import React from "react";
import Navbar from "./Navbar";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";

// import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import backend from "../utils/config";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Minimum 8 characters").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  dateOfBirth: Yup.date().required("Required"),
});

const SignupPage = ({ setAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // var from = location.state?.from?.pathname || "/";


  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      dateOfBirth: ""
    },
    validationSchema: SignupSchema,
    onSubmit: (form_values) => {
      console.log("submitting...");
      console.log({
        email: form_values.email,
        password: form_values.password,
        firstName: form_values.firstName,
        lastName: form_values.lastName,
        role: form_values.role,
        dateOfBirth: form_values.dateOfBirth

      });
      backend.post('api/v1/register', {
        email: form_values.email,
        password: form_values.password,
        firstName: form_values.firstName,
        lastName: form_values.lastName,
        role: form_values.role,
        dateOfBirth: form_values.dateOfBirth

      }).then((response) => {
        var responseData = response.data;
        console.log(responseData);
        if (!responseData.success) {
          formik.resetForm();
          toast.error("User already exists. Please login");
        }
        else {
          console.log("IN ELSE");
          setAuth(true);
          console.log("/"+form_values.role);
          navigate("/"+form_values.role);//, { replace: true });
        }
      }).catch(() => { });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Navbar />
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

            <TextField
              fullWidth
              label="First name"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="bday"
              type="date"
              label="Date of Birth"
              {...getFieldProps("dateOfBirth")}
              error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
              helperText={touched.dateOfBirth && errors.dateOfBirth}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type="password"
              label="Password"
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Role"
              select
              {...getFieldProps("role")}
              onChange={formik.handleChange}
              SelectProps={{
                native: true,
              }}
              error={Boolean(touched.role && errors.role)}
              helperText={touched.role && errors.role}
            >
              <option value=""></option>
              <option value="guest">Guest</option>
              <option value="staff">Staff</option>
              <option value="management">Management</option>
            </TextField>
            <Button fullWidth variant="contained" type="submit">
              Sign Up
            </Button>
        </Form>
      </FormikProvider>
    </Container >
    <ToastContainer />
    </>
  );
}

export default SignupPage;
