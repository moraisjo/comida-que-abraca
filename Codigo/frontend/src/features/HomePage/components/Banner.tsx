import React from "react";
import { Box, Typography, Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ImageHomePage from "../../../assets/homepage_comidaqueabraca.jpeg";

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
        src={ImageHomePage}
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
          Comida que Abraça
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "24px", fontFamily: "fontFamily" }}
        >
          Nós buscamos resgatar a dignidade de nossos irmãos em situação de
          vulnerabilidade social, por meio da valorização integral, respeitando
          suas individualidades e potencializando seus talentos.
        </Typography>
        <Button
          variant="contained"
          startIcon={<WhatsAppIcon />}
          sx={{
            backgroundColor: "#25D366",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "10px 20px",
            "&:hover": { backgroundColor: "#1DA655" },
            fontFamily: "fontFamily",
          }}
          href="https://wa.me/5531997496104"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entre em contato
        </Button>
      </Box>
    </Box>
  );
};

export default Banner;
