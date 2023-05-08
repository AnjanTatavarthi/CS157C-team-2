import * as Yup from "yup";
import {useState} from "react";
import {Form, FormikProvider, useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {
    Box,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    IconButton,
    InputAdornment,
    Radio,
    RadioGroup,
    Stack,
    TextField,
} from "@mui/material";
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

const SignupForm = ({setAuth}) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const login = "/login";

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("First name required"),
        lastName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Last name required"),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters long.")
            .max(20, "Password must be at most 20 characters long.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."
            )
            .required("Password is required."),
        dateOfBirth: Yup.date()
            .max(new Date(), "Date of birth cannot be in the future.")
            .required("Date of birth is required."),
        role: Yup.string()
            .oneOf(["admin", "guest", "staff"], "Role must be admin, guest, or staff.")
            .required("Role is required.")

    });

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
            console.log("submitting registration form...");
            backend.post('/register', {
                email: form_values.email,
                password: form_values.password,
                firstName: form_values.firstName,
                lastName: form_values.lastName,
                role: form_values.role,
                dateOfBirth: form_values.dateOfBirth
            }).then((response) => {
                console.log(form_values)
                setAuth(true);
                navigate(login, {replace: true});
                localStorage.setItem("user", JSON.stringify(response.data))
            }).catch(() => {
            });
        },
    });

    const {errors, touched, handleSubmit, isSubmitting, getFieldProps} = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Stack
                        component={motion.div}
                        initial={{opacity: 0, y: 60}}
                        animate={animate}
                        direction={{xs: "column", sm: "row"}}
                        spacing={2}
                    >
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
                    </Stack>

                    <Stack
                        spacing={3}
                        component={motion.div}
                        initial={{opacity: 0, y: 40}}
                        animate={animate}
                    >
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
                            autoComplete="current-password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            {...getFieldProps("password")}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            <Icon
                                                icon={
                                                    showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                                                }
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                        />

                        <TextField
                            fullWidth
                            label="Date of Birth"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...getFieldProps("dateOfBirth")}
                            error={Boolean(touched.date && errors.date)}
                            helperText={touched.date && errors.date}
                        />


                        <FormControl component="fieldset" error={Boolean(touched.role && errors.role)}>
                            <FormLabel component="legend">Role</FormLabel>
                            <RadioGroup
                                aria-label="role"
                                name="role"
                                {...getFieldProps("role")}
                                row
                            >
                                <FormControlLabel
                                    value="admin"
                                    control={<Radio/>}
                                    label="Admin"
                                />
                                <FormControlLabel
                                    value="guest"
                                    control={<Radio/>}
                                    label="Guest"
                                />
                                <FormControlLabel
                                    value="staff"
                                    control={<Radio/>}
                                    label="Staff"
                                />
                            </RadioGroup>
                            {touched.role && errors.role && (
                                <FormHelperText>{errors.role}</FormHelperText>
                            )}
                        </FormControl>
                    </Stack>

                    <Box
                        component={motion.div}
                        initial={{opacity: 0, y: 20}}
                        animate={animate}
                    >
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            Sign up
                        </LoadingButton>
                    </Box>
                </Stack>
            </Form>
        </FormikProvider>
    );
};

export default SignupForm;
