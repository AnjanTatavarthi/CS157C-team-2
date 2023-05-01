import React from "react";
import Navbar from "./Navbar";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import backend from "../utils/config";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = ({ setAuth }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (form_values) => {
      console.log("submitting...");
      console.log({
        email: form_values.email,
        password: form_values.password
      });
      backend.post('api/v1/login', {
        email: form_values.email,
        password: form_values.password
      }).then((response) => {
        var responseData = response.data;
        console.log(responseData);
        if (!responseData.success) {
          formik.resetForm();
          toast.error("User does not exists. Please try again");
        }
        else {
          console.log("IN ELSE");
          setAuth(true);
          console.log("/"+responseData.role);
          navigate("/"+responseData.role);//, { replace: true });
        }
      }).catch(() => { });
    },
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button fullWidth variant="contained" type="submit">
            Login
          </Button>
        </form>
      </Container>
      <ToastContainer />
    </>
  );
}

export default LoginPage;
