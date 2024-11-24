import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 bg-gradient-to-b from-[#a7f4df] to-[#FFFFFF] p-8 min-h-screen">
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          p: 2,
          mx: 2,
        }}
      >
        <Box>
          <Typography variant="h2" color="text.primary" fontWeight={500}>
            Rescue Food
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
            <Typography variant="h1" color="green">
              _
            </Typography>
            <Typography variant="h1" color="text.primary">
              Restore Hope
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Description Section */}
      <Typography variant="h6" color="text.primary">
        The one-stop solution to minimize food waste and fight hunger by
        connecting surplus food donors with volunteers and NGOs.
      </Typography>

      {/* Conditional Rendering Based on User Role */}
      {user ? (
        <Grid container spacing={3}>
          {user.role === "donor" && (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      Donate Food
                    </Typography>
                    <Typography color="textSecondary">
                      Have surplus food? Donate it now.
                    </Typography>
                    <Typography paragraph>
                      Help minimize food waste by sharing it with those in need.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to="/donatefood"
                      variant="contained"
                    >
                      Donate Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      My Donations
                    </Typography>
                    <Typography color="textSecondary">
                      View your donation history
                    </Typography>
                    <Typography paragraph>
                      Check the details and status of your past contributions.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to="/mydonations"
                      variant="outlined"
                    >
                      View Donations
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </>
          )}
          {user.role === "volunteer" && (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      Volunteer Dashboard
                    </Typography>
                    <Typography color="textSecondary">
                      Manage your activities
                    </Typography>
                    <Typography paragraph>
                      Accept transport requests, update your location, and help
                      with food distribution.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to="/volunteer/dashboard"
                      variant="contained"
                    >
                      Go to Dashboard
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      Manage Requests
                    </Typography>
                    <Typography color="textSecondary">
                      Track donation pickups
                    </Typography>
                    <Typography>
                      View assigned tasks and coordinate pickups and deliveries.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to="/volunteer/requests"
                      variant="outlined"
                    >
                      Manage Requests
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </>
          )}
          {user.role === "admin" && (
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Admin Dashboard
                  </Typography>
                  <Typography color="textSecondary">
                    Manage the entire system
                  </Typography>
                  <Typography>
                    Oversee donations, volunteers, and overall operations.
                  </Typography>
                  <CardActions>
                    <Button component={Link} to="/admin" variant="contained">
                      Go to Dashboard
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      ) : (
        <Card sx={{ maxWidth: 400, mt: 4, p:1 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Get Started
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Join our community of donors and volunteers
            </Typography>
            <Typography>
              Sign up or log in to help us minimize food waste and fight hunger.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{ mr: 2, bgcolor:'black' }}
            >
              Log In
            </Button>
            <Button sx={{borderColor:'black', color:'black'}} component={Link} to="/signup" variant="outlined">
              Sign Up
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default Home;
