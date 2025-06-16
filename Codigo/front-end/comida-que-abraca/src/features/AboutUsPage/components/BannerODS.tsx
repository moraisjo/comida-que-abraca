import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowUpRight } from "react-feather";
import BannerODSImage from "../../../assets/ONU.jpeg";

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
        alt="Banner do projeto Comida Que Abraça - ODS da ONU"
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
          color="#fff"
          sx={{
            fontWeight: "bold",
            marginBottom: "16px",
            fontFamily: "fontFamily",
          }}
        >
          Vamos atingir as ODS da ONU juntos?
        </Typography>
        <Typography
          variant="body1"
          color="#fff"
          sx={{ marginBottom: "24px", fontFamily: "fontFamily" }}
        >
          Nosso projeto{" "}
          <Box component="span" fontWeight="bold">
            Comida Que Abraça
          </Box>{" "}
          contribui diretamente para alcançar os Objetivos de Desenvolvimento
          Sustentável (ODS) da ONU, especialmente na erradicação da fome (ODS
          2), redução do desperdício (ODS 12) e promoção de parcerias solidárias
          (ODS 17). Junte-se a nós nessa transformação!
        </Typography>

        <Button
          variant="contained"
          startIcon={<ArrowUpRight />}
          sx={{
            bgcolor: "#F2821A",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "uppercase",
            px: 4,
            py: 1.5,
            "&:hover": { bgcolor: "#CC6F15" },
          }}
          href="https://brasil.un.org/pt-br/sdgs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Conheça as ODS
        </Button>
      </Box>
    </Box>
  );
};

export default BannerODS;
