/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Switch,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { useToast } from "../../hooks/use-toast";
import api from "../../services/api";
import { Job } from "../../types";

const VolunteerDashboard: React.FC = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await api.get("/volunteers/jobs/available", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch jobs. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchMyJobs = useCallback(async () => {
    try {
      const response = await api.get("/volunteers/jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMyJobs(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch jobs. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchVolunteerStatus = useCallback(async () => {
    try {
      const response = await api.get("/volunteers/status");
      setIsAvailable(response.data.isAvailable);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
    fetchMyJobs();
    fetchVolunteerStatus();
  }, [fetchJobs, fetchMyJobs, fetchVolunteerStatus]);

  const toggleAvailability = async () => {
    try {
      setIsAvailable(!isAvailable);
      toast({
        title: "Status Updated",
        description: `You are now ${
          isAvailable ? "unavailable" : "available"
        } for new jobs.`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const acceptJob = async (jobId: string) => {
    try {
      await api.put(`/volunteers/jobs/${jobId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast({
        title: "Job Accepted",
        description: "You have successfully accepted the job.",
      });
      fetchJobs();
      fetchMyJobs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept job. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Volunteer Dashboard
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardHeader
          title={<Typography variant="h6">Availability</Typography>}
          subheader="Toggle your availability for new jobs"
        />
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <Switch
              checked={isAvailable}
              onChange={toggleAvailability}
              color="primary"
            />
            <Typography>{isAvailable ? "Available" : "Unavailable"}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>
        My Jobs
      </Typography>
      <Divider />
      {myJobs.map((job) => (
        <Card key={job._id} sx={{ mb: 3 }}>
          <CardHeader
            title={`Job to ${job.dropoffNGO}`}
            subheader={`Booking ID: ${job._id}`}
          />
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography>
                  <strong>From:</strong> {job.pickupLocation}
                </Typography>
                <Typography>
                  <strong>To:</strong> {job.dropoffNGO}
                </Typography>
                {/* <Typography>
                  <strong>Estimated Earnings:</strong> ₹{job.price.toFixed(2)}
                </Typography> */}
              </Box>
              <Chip
                label={job.status}
                color={job.status === "completed" ? "success" : "default"}
                variant="outlined"
                sx={{ textTransform: "capitalize" }}
              />
            </Box>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h5" fontWeight="bold" mt={4} mb={2}>
        Available Jobs
      </Typography>
      <Divider />
      {jobs.map((job) => (
        <Card key={job._id} sx={{ mb: 3 }}>
          <CardHeader
            title={`Job to ${job.dropoffNGO}`}
            subheader={`Booking ID: ${job._id}`}
          />
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography>
                  <strong>From:</strong> {job.pickupLocation}
                </Typography>
                <Typography>
                  <strong>To:</strong> {job.dropoffNGO}
                </Typography>
                {/* <Typography>
                  <strong>Estimated Earnings:</strong> ₹{job.price.toFixed(2)}
                </Typography> */}
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => acceptJob(job._id)}
              >
                Accept Job
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default VolunteerDashboard;
