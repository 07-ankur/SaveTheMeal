import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardActions, Typography } from "@mui/material";

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: 350,
          textAlign: "center",
          padding: "16px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Error
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            An unexpected error has occurred.
          </Typography>
          <Typography variant="body1" style={{ margin: "16px 0" }}>
            We're sorry, but something went wrong. Please try again later or contact support if the problem persists.
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
