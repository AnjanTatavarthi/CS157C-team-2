import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {AppBar, Box, Button, Container, Link, Toolbar, Typography} from "@mui/material";
import styled from "@emotion/styled";
import LoginForm from "../components/LoginForm";
import {motion} from "framer-motion";

const RootStyle = styled("div")({
    background: "rgb(249, 250, 251)",
    height: "100vh",
    display: "grid",
    placeItems: "center",
});

const HeadingStyle = styled(Box)({
    textAlign: "center",
});

const ContentStyle = styled("div")({
    maxWidth: 480,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: {duration: 0.6, ease: easing},
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing,
        },
    },
};

const Login = ({setAuth}) => {

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        AmenityHub
                    </Typography>
                    <Button color="inherit" href="/signup">Sign Up</Button>
                    <Button color="inherit" href="/login">Log In</Button>
                </Toolbar>
            </AppBar>
            <RootStyle>

                <Container maxWidth="sm">
                    <ContentStyle>
                        <HeadingStyle component={motion.div} {...fadeInUp}>
                            {/*<Logo />*/}
                            <Typography sx={{color: "text.primary", mb: 5}}>
                                Login
                            </Typography>
                        </HeadingStyle>
                        <LoginForm setAuth={setAuth}/>
                        <Typography
                            component={motion.p}
                            {...fadeInUp}
                            variant="body2"
                            align="center"
                            sx={{mt: 3}}
                        >
                            Don’t have an account?{" "}
                            <Link variant="subtitle2" component={RouterLink} to="/signup">
                                Sign up
                            </Link>
                        </Typography>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </div>

    );
};

export default Login;
