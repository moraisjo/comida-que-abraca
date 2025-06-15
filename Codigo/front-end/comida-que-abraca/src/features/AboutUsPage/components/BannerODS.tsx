import React from "react";
import { Box } from "@mui/material";
import BannerODSImage from "../../../assets/BannerODS.jpg";

const BannerODS: React.FC = () => {
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
        src={BannerODSImage}
        alt="Banner"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.8,
        }}
      />
    </Box>
  );
};

export default BannerODS;
