import React from "react";
import HeaderMenu from "../../shared/components/HeaderMenu";
import colors from "../../shared/theme/colors";
import { Box, Divider, Typography } from "@mui/material";
import DonatorsList from "./components/DonatorsList";
import Footer from "../../shared/components/Footer/Footer";

const RankingPage: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <HeaderMenu />

        <Typography
          color={colors.primary}
          variant="h6"
          sx={{ mt: 2, mb: 2, ml: 2 }}
        >
          Ranking de doadores
        </Typography>
        <Divider sx={{ borderWidth: 1.6, marginBottom: 2 }} />
        <Box
          sx={{
            width: "80vw",
            margin: "20px auto",
            flexGrow: 1,
          }}
        >
          <DonatorsList />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default RankingPage;
