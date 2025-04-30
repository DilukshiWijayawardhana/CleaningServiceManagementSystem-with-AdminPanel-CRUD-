import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  CleaningServices,
  Schedule,
  VerifiedUser,
  Star,
} from "@mui/icons-material";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant={isMobile ? "h4" : "h3"}
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "primary.main",
              mb: 3,
            }}
          >
            Professional Cleaning Services
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Book trusted cleaners for your home or office with just a few clicks
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              sx={{ px: 4 }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              size="large"
              sx={{ px: 4 }}
            >
              Register
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section with Colorful Boxes */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 8,
            color: "text.primary",
            fontSize: { xs: "1.5rem", md: "2rem" },
            position: "relative",
            "&:after": {
              content: '""',
              display: "block",
              width: "80px",
              height: "4px",
              bgcolor: "secondary.main",
              mx: "auto",
              mt: 2,
              borderRadius: "2px",
            },
          }}
        >
          Why Choose Our Services?
        </Typography>

        <Grid container spacing={{ xs: 4, md: 8 }} justifyContent="center">
          {[
            {
              icon: <CleaningServices />,
              title: "Expert Cleaners",
              text: "Our professionals undergo rigorous training and background checks",
              color: "#E3F2FD", // Light blue
            },
            {
              icon: <Schedule />,
              title: "Flexible Booking",
              text: "Schedule anytime with our 24/7 online reservation system",
              color: "#E8F5E9", // Light green
            },
            {
              icon: <VerifiedUser />,
              title: "Fully Insured",
              text: "Complete peace of mind with our service guarantee",
              color: "#FFF3E0", // Light orange
            },
            {
              icon: <Star />,
              title: "Premium Service",
              text: "Consistently top-rated by thousands of satisfied clients",
              color: "#F3E5F5", // Light purple
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  p: 4,
                  borderRadius: 4,
                  bgcolor: feature.color,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "rgba(255,255,255,0.3)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    "&:before": {
                      width: "100%",
                    },
                  },
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "0%",
                    height: "4px",
                    bgcolor: "primary.main",
                    transition: "width 0.4s ease",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "white",
                    borderRadius: "50%",
                    mb: 3,
                    color: "primary.main",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    "& svg": {
                      fontSize: "2rem",
                    },
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "text.primary",
                    fontSize: "1.25rem",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: "1rem",
                    lineHeight: 1.7,
                  }}
                >
                  {feature.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Call to Action */}
      <Box
        sx={{
          py: 6,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Ready to experience spotless living?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Join thousands of satisfied customers today
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "background.paper",
              color: "primary.main",
              px: 6,
              "&:hover": {
                bgcolor: "background.default",
              },
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
