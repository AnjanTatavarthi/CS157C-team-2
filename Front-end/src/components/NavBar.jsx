import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import * as React from "react";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {Menu, MenuItem} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import {ExitToApp} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface NavbarProps {
    open: boolean;
    toggleDrawer: () => boolean;

}

export default function Navbar(props: NavbarProps) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleSignOut = () => {
        localStorage.clear();
        navigate("/login", {replace: true});
    }
    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        navigate("/admin/profile", {replace: true});
    };
    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="absolute" open={props.open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(props.open && {display: 'none'}),
                    }}
                >
                    <MenuIcon/>
                </IconButton>

                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{flexGrow: 1}}
                >
                    Amenity Hub
                </Typography>

                {/* <Typography color="inherit" variant="subtitle1" sx={{mr: 0.5}}>
                    welcome Anjan!
                </Typography> */}


                <div>
                    <IconButton color="inherit" onClick={handleProfileClick}>
                        <PersonIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleProfileClose}>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <Typography variant="inherit">Profile</Typography>
                        </MenuItem>

                        <MenuItem onClick={handleSignOut}>
                            <ListItemIcon>
                                <ExitToApp/>
                            </ListItemIcon>
                            <Typography variant="inherit">Sign Out</Typography>
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}