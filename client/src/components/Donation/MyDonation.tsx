// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   Typography,
//   Button,
//   Chip,
// } from "@mui/material";
// import { useToast } from "@/hooks/use-toast";
// import api from "../../services/api";
// import { Donation } from "../../types";

// const MyDonations: React.FC = () => {
//   const { toast } = useToast();
//   const [donations, setDonations] = useState<Donation[]>([]);

//   const fetchDonations = useCallback(async () => {
//     try {
//       const response = await api.get(
//         `/dontions/user/${localStorage.getItem("userId")}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       setDonations(response.data);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch donations. Please try again.",
//         variant: "destructive",
//       });
//     }
//   }, [toast]);

//   useEffect(() => {
//     fetchDonations();
//   }, [fetchDonations]);

//   const cancelDonation = async (donationId: string) => {
//     try {
//       await api.put(`/dontions/${donationId}/cancel`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       toast({
//         title: "Donation Cancelled",
//         description: "Your donation has been successfully cancelled.",
//       });
//       fetchDonations();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to cancel donation. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" fontWeight="bold" mb={3}>
//         My Donations
//       </Typography>
//       {donations.map((donation) => (
//         <Card key={donation._id} sx={{ mb: 3 }}>
//           <CardHeader
//             title={`Ride to ${donation.dropoffNGO}`}
//             subheader={`Booking ID: ${donation._id}`}
//           />
//           <CardContent>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Box>
//                 <Typography>
//                   <strong>From:</strong> {donation.pickupLocation}
//                 </Typography>
//                 <Typography>
//                   <strong>To:</strong> {donation.dropoffNGO}
//                 </Typography>
//                 <Typography>
//                   <strong>Date & Time:</strong>{" "}
//                   {new Date(donation.createdAt).toLocaleString()}
//                 </Typography>
//               </Box>
//               <Chip
//                 label={donation.status}
//                 color={donation.status === "completed" ? "success" : "default"}
//                 variant="outlined"
//               />
//             </Box>
//             {donation.status === "pending" && (
//               <Button
//                 variant="contained"
//                 color="error"
//                 sx={{ mt: 2 }}
//                 onClick={() => cancelDonation(donation._id)}
//               >
//                 Cancel Ride
//               </Button>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export default MyDonations;
