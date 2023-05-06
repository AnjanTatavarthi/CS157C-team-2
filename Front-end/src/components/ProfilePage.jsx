import React, {useState} from "react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as Yup from "yup";
import {Form, FormikProvider, useFormik} from "formik";
import backend from "../utils/config";
import {IconButton, InputAdornment} from "@mui/material";
import {Icon} from "@iconify/react";
import {useNavigate} from "react-router-dom";
import login from "../pages/Login";
import {LoadingButton} from "@mui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
        margin: "0 auto",
    },
    card: {
        maxWidth: 600,
        margin: "0 auto",
        width: "90%", // add this rule to change the width of the card
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        textTransform: "uppercase",
        width: 70,
        height: 70,
        margin: "10 auto",
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    fieldLabel: {
        fontWeight: "bold",
        marginBottom: theme.spacing(0.5),
    },
    fieldValue: {
        marginTop: theme.spacing(0.5),
    },
    editButton: {
        display: "block",
        margin: "0 auto",
    },
}));


function ProfilePage({user}) {
    const classes = useStyles();
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleSave = () => {
        formik.handleSubmit();
        setEditMode(false);
    };


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
            .required("Date of birth is required.")
    });

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            dateOfBirth: user.dateOfBirth
        },
        validationSchema: SignupSchema,
        onSubmit: (form_values) => {
            console.log("submitting registration form...");
            console.log(form_values)
            backend.put(`/users/${user.email}`, {
                email: form_values.email,
                password: form_values.password,
                firstName: form_values.firstName,
                lastName: form_values.lastName,
                role: form_values.role,
                dateOfBirth: form_values.dateOfBirth
            }).then((response) => {
                console.log("Response: ", response)
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
                <div className={classes.root}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar variant="rounded" className={classes.avatar}>
                                    {user.firstName.charAt(0)}
                                </Avatar>
                            }
                            title={
                                <Typography variant="h5" className={classes.title}>
                                    {user.firstName} {user.lastName}
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={1} sm={6}>
                                    <Typography variant="subtitle1" className={classes.fieldLabel}>
                                        First Name:
                                    </Typography>


                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        {...getFieldProps("firstName")}
                                        error={Boolean(touched.firstName && errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        disabled={!editMode}
                                    />

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" className={classes.fieldLabel}>
                                        Last Name:
                                    </Typography>


                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        {...getFieldProps("lastName")}
                                        error={Boolean(touched.lastName && errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        disabled={!editMode}
                                    />

                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" className={classes.fieldLabel}>
                                        Email:
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        autoComplete="username"
                                        type="email"
                                        variant="outlined"
                                        {...getFieldProps("email")}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                        disabled
                                    />


                                </Grid>

                                {/* <Grid item xs={12}>
                                    <Typography variant="subtitle1" className={classes.fieldLabel}>
                                        Password:
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        autoComplete="current-password"
                                        type={showPassword ? "text" : "password"}
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
                                        disabled={!editMode}
                                    />

                                </Grid> */}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" className={classes.fieldLabel}>
                                        Date of Birth:
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...getFieldProps("dateOfBirth")}
                                        error={Boolean(touched.date && errors.date)}
                                        helperText={touched.date && errors.date}
                                        disabled={!editMode}
                                    />

                                </Grid>

                            </Grid>
                        </CardContent>
                        <CardActions>
                            {editMode ? (
                                <>
                                    <Button variant="outlined" color="secondary" onClick={handleCancel}
                                            className={classes.editButton}>
                                        Cancel
                                    </Button>


                                    <Button variant="contained" color="primary" onClick={handleSave}
                                            className={classes.editButton}>
                                        Save
                                    </Button>


                                </>
                            ) : (
                                <Button variant="contained" color="primary" onClick={handleEdit}
                                        className={classes.editButton}>
                                    Update
                                </Button>
                            )}
                        </CardActions>
                    </Card>
                </div>
            </Form>
        </FormikProvider>);


}

export default ProfilePage;


