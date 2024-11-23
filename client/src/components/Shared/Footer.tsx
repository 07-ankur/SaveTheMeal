import React from "react";
import {
  Box,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import FoodBankIcon from "@mui/icons-material/FoodBank";

const Footer: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          pb: 1,
          bgcolor: "#04945F",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          bottom:0,
          position:"sticky"
        }}
      >
        <Container>

        </Container>
        <Divider
          sx={{
            width: "95%",
            height: "1.1px",
            mt: 3,
            mb: 2,
            backgroundColor: "white",
          }}
          variant="middle"
        />
        <Container>
          <Stack
            sx={{ justifyContent: "space-between" }}
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ mx: 4 }}>
              <Typography variant="subtitle1" color="#CBEBDB">
                © 2023 SaveTheMeal, All Rights Reserved.
              </Typography>
            </Box>
            <Box sx={{ mx: 4, display: "flex", alignItems: "center" }}>
              <FoodBankIcon sx={{ fontSize: 36, color: "white" }} /> {/* Adjusted fontSize */}
              <Typography variant="h6" color="white">
                SaveTheMeal
              </Typography>
            </Box>
            <Box sx={{ mx: 4 }}>
              <Typography variant="subtitle1" color="#CBEBDB">
                Made with ❤️ by
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/07-ankur"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {" "}
                  07-ankur
                </a>
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
