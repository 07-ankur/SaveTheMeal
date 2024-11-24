import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import FoodBankIcon from "@mui/icons-material/FoodBank";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar>
          {/* Logo Section */}
          <Box display="flex" flexGrow={1 / 6}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                <FoodBankIcon sx={{ fontSize: 50, color: "charcoal" }} />
                <Typography variant="h5" color="charcoal">
                  SaveTheMeal
                </Typography>
              </Box>
            </Link>
          </Box>

          {/* Center Navigation Links */}
          <Box display="flex" flexGrow={1} gap={2}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button color="inherit">About Us</Button>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button color="inherit">Gallery</Button>
            </Link>
            {user && user.role === "donor" && (
              <>
                <Link to="/donatefood" style={{ textDecoration: "none" }}>
                  <Button color="inherit">Donate Food</Button>
                </Link>
                <Link to="/mydonations" style={{ textDecoration: "none" }}>
                  <Button color="inherit">My Donations</Button>
                </Link>
              </>
            )}
            {user && user.role === "volunteer" && (
              <Link
                to="/volunteer/dashboard"
                style={{ textDecoration: "none" }}
              >
                <Button color="inherit">Volunteer Dashboard</Button>
              </Link>
            )}
            {user && user.role === "ngo" && (
              <Link to="/ngo/dashboard" style={{ textDecoration: "none" }}>
                <Button color="inherit">Ngo Dashboard</Button>
              </Link>
            )}
            {user && user.role === "admin" && (
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <Button color="inherit">Admin Dashboard</Button>
              </Link>
            )}
            {user && (
              <Link to="/tracking" style={{ textDecoration: "none" }}>
                <Button color="inherit">Tracking</Button>
              </Link>
            )}
          </Box>

          {/* Right-aligned User Section */}
          <Box display="flex" alignItems="center">
            {user ? (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <Avatar alt={user.name} src="/placeholder-avatar.jpg">
                    {user.name.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <Box px={2} py={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.email}
                    </Typography>
                  </Box>
                  <Divider />
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    Log out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box display="flex" gap={1}>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#333333",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "black",
                      color: "black",
                      "&:hover": {
                        borderColor: "#333333",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
