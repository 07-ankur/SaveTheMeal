/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  TextField,
  Button
} from "@mui/material";
import { useToast } from "../../hooks/use-toast";
import api from "../../services/api";

const DonationForm: React.FC = () => {
  const { toast } = useToast();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [food, setFood] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/donations",
        {
          pickupLocation: pickup,
          dropoffNGO: dropoff,
          foodDetails: food
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      toast({
        title: "Donation Successful",
        description: `Your donation ID is ${response.data.donation._id}`,
      });
      navigate("/mydonations");
    } catch (error) {
      toast({
        title: "Donation Failed",
        description:
          "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2 }}>
      <CardHeader
        title="Donate Food"
        subheader="Enter your details below."
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Pickup Location"
            variant="outlined"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
          <TextField
            label="Dropoff NGO"
            variant="outlined"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
          />
          <TextField
            label="Food Details"
            variant="outlined"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            required
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Donate Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default DonationForm;
