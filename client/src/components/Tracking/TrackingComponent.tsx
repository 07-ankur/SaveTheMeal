/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
  Badge as MuiBadge,
} from "@mui/material";
import { useToast } from "../../hooks/use-toast";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import { TrackingData } from "../../types";

const TrackingComponent: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [donationId, setDonationId] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const fetchTrackingData = useCallback(async () => {
    if (!donationId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/tracking/${donationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTrackingData(response.data.data);
      setStatus(response.data.data.status);
    } catch (error) {
      setError(
        "Failed to fetch tracking data. Please check the booking ID and try again."
      );
      toast({
        title: "Error",
        description:
          "Failed to fetch tracking data. Please check the booking ID and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [donationId, toast]);

  useEffect(() => {
    if (trackingData) {
      const interval = setInterval(fetchTrackingData, 30000);
      return () => clearInterval(interval);
    }
  }, [trackingData, fetchTrackingData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrackingData();
  };

  const handleUpdateTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationId || !status || !latitude || !longitude) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.put(
        `/tracking/${donationId}`,
        {
          status,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTrackingData(response.data.data);
      toast({
        title: "Success",
        description: "Tracking information updated successfully",
      });
    } catch (error) {
      setError("Failed to update tracking data. Please try again.");
      toast({
        title: "Error",
        description: "Failed to update tracking data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        () => {
          toast({
            title: "Error",
            description: "Unable to retrieve your location",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
    }
  };

  return (
    <div style={{ padding: "16px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Track Your Ride
      </Typography>

      {/* Donation ID Card */}
      <Card>
        <CardContent>
          <Typography variant="h6">Enter Donation ID</Typography>
          <Typography variant="body2" color="textSecondary">
            Provide your donation ID to track your ride.
          </Typography>
          <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
            <TextField
              label="Donation ID"
              variant="outlined"
              fullWidth
              value={donationId}
              onChange={(e) => setDonationId(e.target.value)}
              required
              style={{ marginBottom: "16px" }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {loading ? <CircularProgress size={24} /> : "Track"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" style={{ marginTop: "16px" }}>
          {error}
        </Alert>
      )}

      {/* Tracking Update (Driver) */}
      {user && user.role === "volunteer" && trackingData && (
        <Card style={{ marginTop: "16px" }}>
          <CardContent>
            <Typography variant="h6">Update Tracking Information</Typography>
            <form onSubmit={handleUpdateTracking}>
              <TextField
                select
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
                required
                style={{ marginBottom: "16px" }}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </TextField>
              <TextField
                label="Latitude"
                variant="outlined"
                fullWidth
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
                style={{ marginBottom: "16px" }}
              />
              <TextField
                label="Longitude"
                variant="outlined"
                fullWidth
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
                style={{ marginBottom: "16px" }}
              />
              <div style={{ display: "flex", gap: "16px" }}>
                <Button variant="outlined" onClick={getCurrentLocation}>
                  Get Current Location
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {loading ? <CircularProgress size={24} /> : "Update Tracking"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tracking Data Display */}
      {trackingData && (
        <Card style={{ marginTop: "16px" }}>
          <CardContent>
            <Typography variant="h6">Tracking Information</Typography>
            <Typography variant="body2" color="textSecondary">
              Donation ID: {trackingData._id}
            </Typography>
            <div style={{ marginTop: "16px" }}>
              <Typography>
                <strong>Status:</strong>{" "}
                <MuiBadge color="secondary">{trackingData.status}</MuiBadge>
              </Typography>
              <Typography>
                <strong>Current Location:</strong>{" "}
                {trackingData.currentLocation?.coordinates?.join(", ") ||
                  trackingData.pickupLocation}
              </Typography>
              <Typography>
                <strong>Last Updated:</strong>{" "}
                {new Date(trackingData.updatedAt).toLocaleString()}
              </Typography>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrackingComponent;
