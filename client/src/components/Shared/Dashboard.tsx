import React from "react";
import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => {
  return (
    <Card elevation={3} sx={{ borderRadius: 2, padding: 2 }}>
      <CardHeader
        title={
          <Typography variant="subtitle2" component="div">
            {title}
          </Typography>
        }
        action={icon && <Box sx={{ display: "flex", alignItems: "center" }}>{icon}</Box>}
        sx={{ paddingBottom: 0 }}
      />
      <CardContent>
        <Typography variant="h5" component="div" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
