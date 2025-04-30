import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          403 - Unauthorized Access
        </Typography>
        <Typography variant="h5" color="text.secondary">
          You don't have permission to access this page.
        </Typography>
      </Box>
      <Button
        component={Link}
        to="/"
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
      >
        Return to Home
      </Button>
    </Container>
  );
};

export default Unauthorized;
