import React from "react";
import { Box, Container, Divider, Typography, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailIcon from '@mui/icons-material/Mail';

const Footer: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          pb: 1,
          background: "linear-gradient(to bottom, #242F2B, #0F734F)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          bottom: 0,
          // position:"sticky"
        }}
      >
        <Container
          sx={{
            mt: 2,
            background: "linear-gradient(to bottom, #242F2B, #0F734F)",
            padding: "2rem",
            borderRadius: "10px",
          }}
        >
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Box display="flex" flexDirection="column">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box display="flex" flexDirection="column">
                  <Typography variant="h3" color="white">
                    "Together, Turning
                  </Typography>
                  <Typography variant="h2" color="yellow">
                    Surplus into Smiles"
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" color="#CBEBDB" sx={{ my: 1 }}>
                    A Small Act, A Big Impact.
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                  >
                      <IconButton key={1}>
                        <TelegramIcon sx={{color:'white'}}/>
                      </IconButton>
                      <IconButton key={2}>
                        <TwitterIcon sx={{color:'white'}}/>
                      </IconButton>
                      <IconButton key={3}>
                        <InstagramIcon sx={{color:'white'}}/>
                      </IconButton>
                      <IconButton key={4}>
                        <MailIcon sx={{color:'white'}}/>
                      </IconButton>
                  </Stack>
                </Box>
              </Box>
              <Typography variant="subtitle1" color="#CBEBDB">
                A platform dedicated to reducing food waste and fighting hunger
                by connecting surplus food from donors to those in need. By
                bridging the gap between excess and necessity, SaveTheMeal
                ensures that no meal goes to waste and every donation brings
                hope to someone’s table. Together, we’re building a sustainable,
                compassionate future—one rescued meal at a time.
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" flexGrow={1}></Box>
        </Container>

        <Divider
          sx={{
            width: "95%",
            height: "1.1px",
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
              <FoodBankIcon sx={{ fontSize: 36, color: "yellow" }} />{" "}
              {/* Adjusted fontSize */}
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
