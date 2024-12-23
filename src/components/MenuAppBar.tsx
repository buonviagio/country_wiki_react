import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Collapse, Menu } from "@mui/material";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [auth, setAuth] = React.useState(false);
  const [openMenuList, setOpenMenuList] = React.useState(false);
  const menuAnchorRef = React.useRef(null);

  const navigationToTheLoginPage = useNavigate();
  const navigateToProfilePage = useNavigate();

  const { user, loader, logout } = useContext(AuthContext);

  const handleAuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event.target :>> ", event.target.checked);
    if (event.target.checked && user === null) {
      navigationToTheLoginPage("/login");
    } else {
      //setAuth(false);
      logout();
    }
    /*  if (event.target.checked && user !== null) {
      console.log("handleAuthChange BLOCK IF ");
      setAuth(true);
    } */
    console.log("CLOSE CLOSE :>> handleAuthChange");
    setAuth(event.target.checked);
  };

  // Toggle function to open/close the dropdown menu
  const handleMenuToggle = () => {
    console.log("CLOSE CLOSE :>> handleMenuToggle");
    setOpenMenuList((prevOpen) => !prevOpen);
  };

  // Close function to close the menu when clicking away
  const handleCloseMenuList = (event: Event | React.SyntheticEvent) => {
    console.log("CLOSE CLOSE :>> handleCloseMenuList");
    if (
      menuAnchorRef.current &&
      menuAnchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpenMenuList(false);
    //logout();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log("CLOSE CLOSE :>> handleMenu");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    navigateToProfilePage("/profile");
    console.log("CLOSE CLOSE :>> handleClose");
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const value = user?.email ? true : false;
    setAuth(value);
  }, [user]);

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleAuthChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Login" : "Logout"}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            // Open/close the dropdown menu on click
            onClick={handleMenuToggle}
            // Set reference for Popper positioning
            ref={menuAnchorRef}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user?.email ? "Loged in" : "Loged out"}
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "50px" }}>
        {/* //TODO check collapse behaviour. should be uncollapsed in big screen. and disply vertical when uncollapsed in small screen */}
        <Collapse in={openMenuList} timeout="auto" unmountOnExit>
          <Paper>
            <MenuList
              autoFocusItem={openMenuList}
              sx={{
                display: "flex", // Make items horizontal
                flexDirection: "row", // Align items in a row
                justifyContent: "center", // Center items horizontally
                padding: 0, // Remove extra padding
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleCloseMenuList}>
                Home
              </MenuItem>
              {!user && (
                <MenuItem
                  component={Link}
                  to="/register"
                  onClick={handleCloseMenuList}
                >
                  Sign Up / Sign In
                </MenuItem>
              )}
              {/* show log out only if user logged in */}
              {user && (
                <MenuItem
                  onClick={(e) => {
                    handleCloseMenuList(e);
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              )}
            </MenuList>
          </Paper>
        </Collapse>
      </Box>
    </Box>
  );
}
