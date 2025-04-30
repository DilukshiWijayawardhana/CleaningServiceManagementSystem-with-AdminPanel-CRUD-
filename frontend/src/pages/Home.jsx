import React from "react";
import { Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Cleaning Service Management
      </Typography>
      <Link to="/login">
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
          Register
        </Button>
      </Link>
    </Container>
  );
};

export default Home;
