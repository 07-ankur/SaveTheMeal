/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DatePickerWithRange from "../ui/date-picker-with-range";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { addDays } from "date-fns";
import { fetchAdminDashboardData } from "../../services/api";
import { DateRange } from "react-day-picker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardData {
  donorCount: number;
  volunteerCount: number;
  ngoCount: number;
  totalDonation: number;
  donationAnalytics: { _id: string; totalDonation: number }[];
  donations: { status: string }[];
  donors: any[];
  volunteers: any[];
  ngos: any[];
  [key: string]: any; // To handle dynamic keys for different tab data
}

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 9, 1),
    to: addDays(new Date(), 20),
  });

  const [tabValue, setTabValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAdminDashboardData({
          from: dateRange?.from ?? undefined,
          to: dateRange?.to ?? undefined,
        });
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dateRange]);

  const donationChartData = {
    labels:
      dashboardData?.donationAnalytics.map((data) =>
        new Date(data._id).toLocaleDateString()
      ) || [],
    datasets: [
      {
        label: "Daily Donation",
        data:
          dashboardData?.donationAnalytics.map((data) => data.totalDonation) ||
          [],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const donationStatusData = {
    labels: ["Pending", "Completed", "Cancelled"],
    datasets: [
      {
        data: [
          dashboardData?.donations.filter((d) => d.status === "pending")
            .length || 0,
          dashboardData?.donations.filter((d) => d.status === "completed")
            .length || 0,
          dashboardData?.donations.filter((d) => d.status === "cancelled")
            .length || 0,
        ],
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
      },
    ],
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>

      <DatePickerWithRange date={dateRange} setDate={setDateRange} />


      <Tabs value={tabValue} onChange={handleTabChange} sx={{ marginY: 2 }}>
        <Tab label="Overview" />
        <Tab label="Donors" />
        <Tab label="Volunteers" />
        <Tab label="NGOs" />
        <Tab label="Donations" />
      </Tabs>

      {tabValue === 0 && (
        <>
          <Grid container spacing={2}>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <Grid item xs={12} md={3} key={idx}>
                  <Skeleton variant="rectangular" height={100} />
                </Grid>
              ))
            ) : (
              <>
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Total Donors</Typography>
                      <Typography variant="h4">
                        {dashboardData?.donorCount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Total Volunteers</Typography>
                      <Typography variant="h4">
                        {dashboardData?.volunteerCount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Total NGOs</Typography>
                      <Typography variant="h4">
                        {dashboardData?.ngoCount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Total Donation</Typography>
                      <Typography variant="h4">
                        ${dashboardData?.totalDonation}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Donation Trend" />
                <CardContent>
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={300} />
                  ) : (
                    <Line data={donationChartData} />
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Donation Status Distribution" />
                <CardContent>
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={300} />
                  ) : (
                    <Bar data={donationStatusData} />
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {(tabValue === 1 ||
        tabValue === 2 ||
        tabValue === 3 ||
        tabValue === 4) && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {/* Replace the columns based on the active tab */}
                <TableCell>Column 1</TableCell>
                <TableCell>Column 2</TableCell>
                <TableCell>Column 3</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))
                : dashboardData?.[
                    tabValue === 1
                      ? "donors"
                      : tabValue === 2
                      ? "volunteers"
                      : tabValue === 3
                      ? "ngos"
                      : "donations"
                  ]?.map((row: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell>{row.column1}</TableCell>
                      <TableCell>{row.column2}</TableCell>
                      <TableCell>{row.column3}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminDashboard;
