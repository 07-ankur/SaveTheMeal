// /* eslint-disable  @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   Card,
//   CardContent,
//   Skeleton,
//   Tabs,
//   Tab,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import DatePickerWithRange from "../ui/date-picker-with-range";
// // import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { addDays } from "date-fns";
// import { fetchAdminDashboardData } from "../../services/api";
// import { DateRange } from "react-day-picker";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface DashboardData {
//   donorCount: number;
//   volunteerCount: number;
//   ngoCount: number;
//   totalDonation: number;
//   donationAnalytics: { _id: string; totalDonation: number }[];
//   donations: { _id: string; user: any; status: string; amount: number }[];
//   donors: { name: string; email: string; createdAt: string }[];
//   volunteers: { name: string; email: string; createdAt: string }[];
//   ngos: { name: string; contact: string; createdAt: string }[];
// }

// const AdminDashboard: React.FC = () => {
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [dateRange, setDateRange] = useState<DateRange | undefined>({
//     from: new Date(2024, 9, 1),
//     to: addDays(new Date(), 20),
//   });
//   const [tabValue, setTabValue] = useState<number>(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchAdminDashboardData({
//           from: dateRange?.from ?? undefined,
//           to: dateRange?.to ?? undefined,
//         });
//         setDashboardData(data);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [dateRange]);

//   const tableData = [
//     { label: "Donors", dataKey: "donors", columns: ["Name", "Email", "Created At"] },
//     { label: "Volunteers", dataKey: "volunteers", columns: ["Name", "Email", "Created At"] },
//     { label: "NGOs", dataKey: "ngos", columns: ["Name", "Contact", "Created At"] },
//     { label: "Donations", dataKey: "donations", columns: ["User", "Status", "Amount"] },
//   ];

//   const currentTab = tableData[tabValue];

//   const renderTableRows = () => {
//     if (isLoading) {
//       return Array.from({ length: 5 }).map((_, idx) => (
//         <TableRow key={idx}>
//           {currentTab.columns.map((_, colIdx) => (
//             <TableCell key={colIdx}>
//               <Skeleton />
//             </TableCell>
//           ))}
//         </TableRow>
//       ));
//     }

//     return (
//       dashboardData?.[currentTab.dataKey]?.map((row: any, idx: number) => (
//         <TableRow key={idx}>
//           {currentTab.columns.map((column: string, colIdx: number) => (
//             <TableCell key={colIdx}>
//               {row[column.toLowerCase().replace(/ /g, "")] || "N/A"}
//             </TableCell>
//           ))}
//         </TableRow>
//       )) || (
//         <TableRow>
//           <TableCell colSpan={currentTab.columns.length}>No Data Available</TableCell>
//         </TableRow>
//       )
//     );
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         Admin Dashboard
//       </Typography>

//       <DatePickerWithRange date={dateRange} setDate={setDateRange} />

//       <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ marginY: 2 }}>
//         {tableData.map((tab, index) => (
//           <Tab key={index} label={tab.label} />
//         ))}
//       </Tabs>

//       {tabValue === 0 && (
//         <>
//           <Grid container spacing={2}>
//             {isLoading ? (
//               Array.from({ length: 4 }).map((_, idx) => (
//                 <Grid item xs={12} md={3} key={idx}>
//                   <Skeleton variant="rectangular" height={100} />
//                 </Grid>
//               ))
//             ) : (
//               <Grid item xs={12} md={3}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6">Total Donors</Typography>
//                     <Typography variant="h4">
//                       {dashboardData?.donorCount}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             )}
//           </Grid>
//         </>
//       )}

//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {currentTab.columns.map((column, idx) => (
//                 <TableCell key={idx}>{column}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>{renderTableRows()}</TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default AdminDashboard;