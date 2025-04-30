import React from "react";
import { Link } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography, Box } from "@mui/material";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Cleaning Service Management
        </Typography>

        {!user ? (
          <Box>
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/register">
              <Button color="inherit">Register</Button>
            </Link>
          </Box>
        ) : (
          <Box>
            <Typography variant="subtitle1" component="span" sx={{ mr: 2 }}>
              Welcome, {user.username}
            </Typography>
            {user.role === "ADMIN" && (
              <Link to="/admin">
                <Button color="inherit">Admin Panel</Button>
              </Link>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
