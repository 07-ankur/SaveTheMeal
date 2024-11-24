// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Box,
// } from "@mui/material";
// import { useToast } from "@/hooks/use-toast";
// import { useAuth } from "../../hooks/useAuth";
// import api from "../../services/api";

// const UserProfile: React.FC = () => {
//   const { toast } = useToast();
//   const { user } = useAuth();

//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//   });
//   const [password, setPassword] = useState({
//     current: "",
//     new: "",
//     confirm: "",
//   });

//   useEffect(() => {
//     if (user) {
//       setProfile({
//         name: user.name,
//         email: user.email,
//       });
//     }
//   }, [user]);

//   const handleProfileUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.put(
//         "/users/profile",
//         profile,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       toast({
//         title: "Profile Updated",
//         description: "Your profile has been successfully updated.",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update profile. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handlePasswordChange = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password.new !== password.confirm) {
//       toast({
//         title: "Error",
//         description: "New passwords do not match.",
//         variant: "destructive",
//       });
//       return;
//     }
//     try {
//       await api.put(
//         "/users/change-password",
//         {
//           currentPassword: password.current,
//           newPassword: password.new,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       toast({
//         title: "Password Changed",
//         description: "Your password has been successfully changed.",
//       });
//       setPassword({ current: "", new: "", confirm: "" });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to change password. Please check your current password and try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <Box sx={{ p: 4, maxWidth: "800px", mx: "auto" }}>
//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         User Profile
//       </Typography>

//       {/* Profile Update Section */}
//       <Card sx={{ mb: 4 }}>
//         <CardHeader
//           title="Personal Information"
//           subheader="Update your personal details"
//         />
//         <CardContent>
//           <form onSubmit={handleProfileUpdate}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="name"
//                   label="Name"
//                   value={profile.name}
//                   onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="email"
//                   label="Email"
//                   type="email"
//                   value={profile.email}
//                   onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button type="submit" variant="contained" color="primary" fullWidth>
//                   Update Profile
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </CardContent>
//       </Card>

//       {/* Password Change Section */}
//       <Card>
//         <CardHeader
//           title="Change Password"
//           subheader="Update your account password"
//         />
//         <CardContent>
//           <form onSubmit={handlePasswordChange}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="currentPassword"
//                   label="Current Password"
//                   type="password"
//                   value={password.current}
//                   onChange={(e) =>
//                     setPassword({ ...password, current: e.target.value })
//                   }
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="newPassword"
//                   label="New Password"
//                   type="password"
//                   value={password.new}
//                   onChange={(e) =>
//                     setPassword({ ...password, new: e.target.value })
//                   }
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="confirmPassword"
//                   label="Confirm New Password"
//                   type="password"
//                   value={password.confirm}
//                   onChange={(e) =>
//                     setPassword({ ...password, confirm: e.target.value })
//                   }
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button type="submit" variant="contained" color="primary" fullWidth>
//                   Change Password
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default UserProfile;
