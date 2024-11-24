export interface User {
  id: string;
  name: string;
  email: string;
  role: "donor" | "volunteer" |"ngo"| "admin";
}

export interface Vehicle {
  _id: string;
  type: string;
  licensePlate: string;
  capacity: string;
}

export interface Donation {
  _id: string;
  userId: string;
  driverId: string | null;
  pickupLocation: string;
  dropoffNGO: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
}

export interface Job extends Donation {
  estimatedEarnings: number;
}

export interface TrackingData {
  _id: string;
  user: string;
  pickupLocation: string;
  dropoffLocation: string;
  vehicleType: string;
  status: string; 
  price: number;
  createdAt: string;
  updatedAt: string;
  currentLocation: {
    type: string;
    coordinates: [number, number];
  };
  driver: string;
}

