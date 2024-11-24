// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardActions,
//   CardHeader,
//   TextField,
//   Typography,
//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import { useToast } from "@/hooks/use-toast";
// import api from "../../services/api";

// const DonationForm: React.FC = () => {
//   const { toast } = useToast();
//   const [pickup, setPickup] = useState("");
//   const [dropoff, setDropoff] = useState("");
//   const [vehicleType, setVehicleType] = useState("");
//   const [distance, setDistance] = useState<number>(0);
//   const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
//   const navigate = useNavigate();

//   // Simulated price calculation based on vehicle type and a random distance
//   const calculateEstimatedPrice = useCallback(
//     (vehicleType: string) => {
//       const basePrice =
//         {
//           standard: 10,
//           premium: 15,
//           suv: 20,
//         }[vehicleType] || 10;

//       return basePrice * distance;
//     },
//     [distance]
//   );

//   useEffect(() => {
//     if (vehicleType) {
//       const price = calculateEstimatedPrice(vehicleType);
//       setEstimatedPrice(price);
//     }
//   }, [vehicleType, calculateEstimatedPrice]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!estimatedPrice) {
//       toast({
//         title: "Error",
//         description: "Please select a vehicle type to get an estimated price.",
//         variant: "destructive",
//       });
//       return;
//     }
//     try {
//       const response = await api.post(
//         "/donations",
//         {
//           pickupLocation: pickup,
//           dropoffNGO: dropoff,
//           vehicleType,
//           price: estimatedPrice,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       console.log(response.data);
//       toast({
//         title: "Donation Successful",
//         description: `Your donation ID is ${response.data.donation._id}`,
//       });
//       navigate("/donations");
//     } catch (error) {
//       toast({
//         title: "Donation Failed",
//         description:
//           "There was an error processing your donation. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <Card sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2 }}>
//       <CardHeader
//         title="Donate Food"
//         subheader="Enter your food details below."
//       />
//       <CardContent>
//         <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
//           <TextField
//             label="Pickup Location"
//             variant="outlined"
//             value={pickup}
//             onChange={(e) => setPickup(e.target.value)}
//             required
//           />
//           <TextField
//             label="Dropoff NGO"
//             variant="outlined"
//             value={dropoff}
//             onChange={(e) => setDropoff(e.target.value)}
//             required
//           />
//           {/* <TextField
//             label="Distance (in km)"
//             type="number"
//             variant="outlined"
//             value={distance}
//             onChange={(e) => setDistance(Number(e.target.value))}
//             required
//           /> */}
//           {/* <FormControl fullWidth required>
//             <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
//             <Select
//               labelId="vehicle-type-label"
//               value={vehicleType}
//               onChange={(e) => setVehicleType(e.target.value)}
//               label="Vehicle Type"
//             >
//               <MenuItem value="standard">Standard</MenuItem>
//               <MenuItem value="premium">Premium</MenuItem>
//               <MenuItem value="suv">SUV</MenuItem>
//             </Select>
//           </FormControl>
//           {estimatedPrice !== null && (
//             <Box sx={{ mt: 2 }}>
//               <Typography variant="subtitle1">Estimated Price</Typography>
//               <Typography variant="h5" fontWeight="bold">
//                 ₹{estimatedPrice.toFixed(2)}
//               </Typography>
//             </Box>
//           )} */}
//         </Box>
//       </CardContent>
//       <CardActions>
//         <Button
//           fullWidth
//           variant="contained"
//           color="primary"
//           type="submit"
//           onClick={handleSubmit}
//         >
//           Donate Now
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default DonationForm;
