import React from "react";
import { Box, Typography, Button } from "@mui/material";
import FoodImage from "../../../assets/about-us-page_food.jpg";
import { ArrowUpRight } from "react-feather";

const BannerAboutUsPage: React.FC = () => {
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
        src={FoodImage}
        alt="Banner"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.8,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "10%",
          transform: "translateY(-50%)",
          width: "40%",
        }}
      >
        <Typography
          variant="h3"
          color="#424242"
          sx={{
            fontWeight: "bold",
            marginBottom: "16px",
            fontFamily: "fontFamily",
          }}
        >
          Sobre nós
        </Typography>
        <Typography
          variant="body1"
          color="#424242"
          sx={{ marginBottom: "24px", fontFamily: "fontFamily" }}
        >
          Descubra como transformamos alimentos em abraços de solidariedade. O
          projeto{" "}
          <Box component="span" fontWeight="bold">
            Comida Que Abraça
          </Box>{" "}
          conecta doadores, voluntários e quem precisa para combater o
          desperdício e a fome com amor e ação.
        </Typography>

        <Button
          variant="contained"
          startIcon={<ArrowUpRight />}
          sx={{
            backgroundColor: "#F2821A",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "10px 20px",
            "&:hover": { backgroundColor: "#CC6F15" },
            fontFamily: "fontFamily",
          }}
          href="https://comidaqueabraca.org/site/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Conheça nosso site
        </Button>
      </Box>
    </Box>
  );
};

export default BannerAboutUsPage;
