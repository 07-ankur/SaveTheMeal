import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Layout from "./components/Shared/Layout";
import Home from "./components/User/Home";
import "./App.css"
import SignupForm from "./components/Auth/SignupForm";
import LoginForm from "./components/Auth/LoginForm";
import AdminDashboard from "./components/Admin/AdminDashboard";
import VolunteerDashboard from "./components/Volunteer/VolunteerDashboard";
import DonationForm from "./components/Donation/DonationForm";
import MyDonation from "./components/Donation/MyDonation"
import UserProfile from "./components/User/UserProfile";
import TrackingComponent from "./components/Tracking/TrackingComponent";
import LocationUpdate from "./components/Volunteer/LocationUpdate";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        {user && (
          <>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/tracking" element={<TrackingComponent />} />
            {user.role === "donor" && (
              <>
                <Route path="/donate" element={<DonationForm />} />
                <Route path="/donations" element={<MyDonation />} />
              </>
            )}
            {user.role === "volunteer" && (
              <>
                <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
                <Route
                  path="/volunteer/update-location"
                  element={<LocationUpdate />}
                />
              </>
            )}
            {user.role === "admin" && (
              <Route path="/admin" element={<AdminDashboard />} />
            )}
          </>
        )}
      </Routes>
    </Layout>
  );
};

export default App;
