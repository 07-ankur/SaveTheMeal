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
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar>
          {/* Logo Section */}
          <Box display="flex" flexGrow={1}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ mx: 1, display: "flex", alignItems: "center" }}>
              <FoodBankIcon sx={{ fontSize: 36, color: "charcoal" }} /> {/* Adjusted fontSize */}
              <Typography variant="h6" color="charcoal">
                SaveTheMeal
              </Typography>
            </Box>
            </Link>
          </Box>

          {/* Navigation Links */}
          <Box display="flex" justifyContent={"center"} gap={1}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button color="inherit">Home</Button>
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
              <Link to="/volunteer/dashboard" style={{ textDecoration: "none" }}>
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

          {/* User Section */}
          <Box display="flex" alignItems="center" ml={2}>
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
                    <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
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
                  <Button variant="contained" color="primary">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button variant="outlined" color="primary">
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
