import React from "react";
import { Box, Typography } from "@mui/material";
import BannerDoacoes from "../../../assets/banner-doacoes.jpg";

const BannerInfo: React.FC = () => {
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
        src={BannerDoacoes}
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
          Sua Doação Pode Mudar Vidas Hoje{" "}
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "24px", fontFamily: "fontFamily" }}
        >
          Cada contribuição leva alimento, esperança e dignidade para famílias
          que precisam de um abraço nesse momento. Junte-se a nós e faça parte
          dessa rede de solidariedade que transforma necessidades em sorrisos.
        </Typography>
      </Box>
    </Box>
  );
};

export default BannerInfo;
