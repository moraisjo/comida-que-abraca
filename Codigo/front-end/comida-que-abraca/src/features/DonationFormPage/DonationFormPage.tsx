import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HeaderMenu from "../../shared/components/HeaderMenu";
import Footer from "../../shared/components/Footer/Footer";
import ModalDonationForm from "./components/ModalDonationForm";

const DonationFormPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderMenu />

      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}></Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: (theme) => theme.zIndex.fab,
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

      <ModalDonationForm open={openModal} handleClose={handleClose} />

      <Footer />
    </Box>
  );
};

export default DonationFormPage;
