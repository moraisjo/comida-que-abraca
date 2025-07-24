import React from "react";
import { Box, Typography } from "@mui/material";
import ImagePageCampaing from "../../../assets/comida-que-abraca-banner.jpeg";

const Banner: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "70vh",
        margin: "0",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={ImagePageCampaing}
        alt="Banner"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "10%",
          transform: "translateY(-50%)",
          width: "40%",
          color: "#fff",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: "16px",
            fontFamily: "fontFamily",
          }}
        >
          Faça Parte Dessa Corrente de Amor
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "24px", fontFamily: "fontFamily" }}
        >
          Conheça as campanhas ativas do Comida que Abraça e transforme
          solidariedade em ação. Sua doação ajuda a levar alimento, afeto e
          dignidade a quem mais precisa. Participe e abrace essa causa com a
          gente.
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
