import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HeaderMenu from "../../shared/components/HeaderMenu";
import Footer from "../../shared/components/Footer/Footer";
import ModalDonationForm from "./components/ModalDonationForm";
import DoacaoEntregue from "../../assets/doacao-entregue.jpg";

const DonationFormPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <HeaderMenu />

      {/* A imagem agora está absolutamente posicionada */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${DoacaoEntregue})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)", // escurecimento opcional
          }}
        />
      </Box>

      {/* Conteúdo principal (HeaderMenu e Footer vão por cima da imagem) */}

      <Box
        sx={{
          position: "fixed",
          bottom: 120,
          right: 16,
          zIndex: (theme) => theme.zIndex.fab + 1,
        }}
      >
        <IconButton
          onClick={handleOpen}
          aria-label="Adicionar nova doação"
          sx={{
            backgroundColor: "#F46A02",
            color: "white",
            borderRadius: "50%",
            width: 56,
            height: 56,
            boxShadow: 3,
            "&:hover": {
              backgroundColor: "#d95d02",
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Footer />

      <ModalDonationForm open={openModal} handleClose={handleClose} />
    </Box>
  );
};

export default DonationFormPage;
