/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Box, TextField, Button, Typography, Alert, Card, CardContent, CardActions, CardHeader } from "@mui/material";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setError(null);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Box
      className="flex items-center justify-center"
      sx={{
        backgroundColor: "#f5f5f5",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: 400, padding: 2 }}>
        <CardHeader
          title={<Typography variant="h5">Login</Typography>}
          subheader={
            <Typography variant="body2" color="textSecondary">
              Enter your credentials to access the platform.
            </Typography>
          }
        />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box mb={2}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
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
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{backgroundColor:'black'}}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default LoginForm;
