import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Form, FormikProvider, useFormik} from "formik";
import * as Yup from "yup";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {Box, IconButton, InputAdornment, Stack, TextField,} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Icon} from "@iconify/react";
import {motion} from "framer-motion";
import backend from "../utils/config";

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.6,
        ease: easing,
        delay: 0.16,
    },
};

const LoginForm = ({setAuth}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dashboard = "/dashboard";

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Provide a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: (form_values) => {
            console.log("submitting...");
            backend.post('/login', {
                email: form_values.email,
                password: form_values.password
            }).then((response) => {
                var responseData = response.data;
                console.log(responseData);
                if (!responseData.success) {
                    formik.resetForm();
                    toast.error('Guest not found!', {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else {
                    setAuth(true);
                    localStorage.setItem("user", JSON.stringify(response.data))
                    console.log(response.data)
                    navigate("/"+response.data.role, {replace: true});
                }

            }).catch(() => {
            });
        },
    });

    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} =
        formik;

    return (
        <>
            <ToastContainer/>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Box
                        component={motion.div}
                        animate={{
                            transition: {
                                staggerChildren: 0.55,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                            }}
                            component={motion.div}
                            initial={{opacity: 0, y: 40}}
                            animate={animate}
                        >
                            <TextField
                                fullWidth
                                autoComplete="username"
                                type="email"
                                label="Email Address"
                                {...getFieldProps("email")}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />

                            <TextField
                                fullWidth
                                autoComplete="current-password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                {...getFieldProps("password")}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword((prev) => !prev)}
                                            >
                                                {showPassword ? (
                                                    <Icon icon="eva:eye-fill"/>
                                                ) : (
                                                    <Icon icon="eva:eye-off-fill"/>
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        <Box
                            component={motion.div}
                            initial={{opacity: 0, y: 20}}
                            animate={animate}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{my: 2}}
                            >

                            </Stack>

                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                            >
                                {isSubmitting ? "loading..." : "Login"}
                            </LoadingButton>
                        </Box>
                    </Box>
                </Form>
            </FormikProvider>
        </>

    );
};

export default LoginForm;
