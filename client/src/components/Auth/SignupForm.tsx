/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Alert,
} from "@mui/material";
import api from "../../services/api";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    ngoInfo: {
      type: "",
      licenseNumber: "",
      capacity: "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleNgoInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      ngoInfo: { ...formData.ngoInfo, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <Box
      className="flex items-center justify-center"
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: 400, padding: 2 }}>
        <CardHeader
          title={<Typography variant="h5">Sign Up</Typography>}
          subheader={
            <Typography variant="body2" color="textSecondary">
              Create a new account to use the platform.
            </Typography>
          }
        />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box mb={2}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                placeholder="Enter your name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                select
                fullWidth
                id="role"
                name="role"
                label="Role"
                value={formData.role}
                onChange={handleRoleChange}
                required
              >
                <MenuItem value="donorr">Donor</MenuItem>
                <MenuItem value="volunteer">Volunteer</MenuItem>
                <MenuItem value="ngo">NGO</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </Box>
            {formData.role === "ngo" && (
              <>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="type"
                    name="type"
                    label="NGO Type"
                    placeholder="Enter NGO type"
                    variant="outlined"
                    value={formData.ngoInfo.type}
                    onChange={handleNgoInfoChange}
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="licenseNumber"
                    name="licenseNumber"
                    label="License Number"
                    placeholder="Enter license number"
                    variant="outlined"
                    value={formData.ngoInfo.licenseNumber}
                    onChange={handleNgoInfoChange}
                    required
                  />
                </Box>
                {/* <Box mb={2}>
                  <TextField
                    fullWidth
                    id="capacity"
                    name="capacity"
                    label="Vehicle Capacity"
                    placeholder="Enter vehicle capacity"
                    variant="outlined"
                    value={formData.ngoInfo.capacity}
                    onChange={handleNgoInfoChange}
                    required
                  />
                </Box> */}
              </>
            )}
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            type="submit"
            sx={{bgcolor:'black'}}
          >
            Sign Up
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default SignupForm;
