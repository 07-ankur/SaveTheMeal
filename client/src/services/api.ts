import axios from "axios";
import { User } from "../types";
import { DateRange } from "react-day-picker";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URI;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token might be expired, log out user
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;

    localStorage.setItem("userId", user.id);
    localStorage.setItem('token', token);

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/logout');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get("/users/profile");
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const getTrackingInfo = async (donationId: string) => {
  const response = await api.get(`/tracking/${donationId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const updateTracking = async (
  donationId: string,
  data: { status: string; latitude: number; longitude: number }
) => {
  const response = await api.put(`/tracking/${donationId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const fetchAdminDashboardData = async (dateRange: DateRange | undefined) => {
  const response = await api.get(
    "/admin/dashboard",
    {
      params: {
        startDate: dateRange?.from?.toISOString(),
        endDate: dateRange?.to?.toISOString(),
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export default api;
