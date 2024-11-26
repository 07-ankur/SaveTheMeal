/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { useToast } from "../../hooks/use-toast";
import api from "../../services/api";

const LocationUpdate: React.FC = () => {
  const { toast } = useToast();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currentJob, setCurrentJob] = useState<any>(null);

  const fetchCurrentJob = useCallback(async () => {
    try {
      const response = await api.get("/volunteers/current-job");
      setCurrentJob(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCurrentJob();
  }, [fetchCurrentJob]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put("/volunteers/update-location", { latitude, longitude });
      toast({
        title: "Location Updated",
        description: "Your location has been successfully updated.",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        () => {
          toast({
            title: "Error",
            description: "Unable to retrieve your location.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Update Location
      </Typography>

      {currentJob && (
        <Card sx={{ mb: 1 }}>
          <CardHeader
            title={<Typography variant="h6">Current Job</Typography>}
          />
          <CardContent>
            <Typography>
              <strong>Donation ID:</strong> {currentJob._id}
            </Typography>
            <Typography>
              <strong>From:</strong> {currentJob.pickupLocation}
            </Typography>
            <Typography>
              <strong>To:</strong> {currentJob.dropoffNGO}
            </Typography>
            <Typography>
              <strong>Status:</strong> {currentJob.status}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader
          title={<Typography variant="h6">Update Your Location</Typography>}
          subheader="Enter your current coordinates or use GPS"
        />
        <Divider />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" gap={2}>
                <TextField
                  id="latitude"
                  label="Latitude"
                  variant="outlined"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  id="longitude"
                  label="Longitude"
                  variant="outlined"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  fullWidth
                  required
                />
              </Box>

              <Button
                variant="outlined"
                onClick={getCurrentLocation}
                sx={{ mt: 1, borderColor:'black', color:'black' }}
              >
                Get Current Location
              </Button>
              <Button type="submit" variant="contained" fullWidth sx={{bgcolor:'black'}}>
                Update Location
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LocationUpdate;
