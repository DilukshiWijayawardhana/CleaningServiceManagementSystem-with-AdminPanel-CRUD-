import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AdminPanelSettings as AdminIcon,
  ExitToApp as LogoutIcon,
  Person as UserIcon,
  Create as CreateBookingIcon,
} from "@mui/icons-material";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate(user?.role === "ADMIN" ? "/admin" : "/dashboard");
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
          }}
        >
          Cleaning Service Management
        </Typography>

        {!user ? (
          <Box>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              startIcon={<UserIcon />}
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/register"
              sx={{ ml: 1 }}
            >
              Register
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {user.role === "USER" && (
              <Button
                color="inherit"
                component={Link}
                to="/create-booking"
                startIcon={<CreateBookingIcon />}
                sx={{ mr: 2 }}
              >
                New Booking
              </Button>
            )}

            <IconButton onClick={handleMenuOpen} color="inherit" sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem disabled>
                <Typography variant="subtitle1">{user.username}</Typography>
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleProfile}>
                <DashboardIcon sx={{ mr: 1 }} />
                {user.role === "ADMIN" ? "Admin Dashboard" : "My Dashboard"}
              </MenuItem>

              {user.role === "ADMIN" && (
                <MenuItem
                  component={Link}
                  to="/admin/services"
                  onClick={handleMenuClose}
                >
                  <AdminIcon sx={{ mr: 1 }} />
                  Manage Services
                </MenuItem>
              )}

              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
