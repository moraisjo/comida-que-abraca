import React, { useState } from "react";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HeaderMenu from "../../shared/components/HeaderMenu";
import CampaignCreate from "./components/AddNewCampaing/CampaignCreate";
import CampaignList from "./components/ListCampaing/CampaignList";
import Footer from "../../shared/components/Footer/Footer";

const CampaignPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <HeaderMenu />
      <Box sx={{ width: "100%", p: 3, pb: 10 }}>
        <CampaignList onCreate={handleOpenModal} />
        {isModalOpen && <CampaignCreate onClose={handleCloseModal} />}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 8 }}>
          <Fab color="primary" aria-label="add" onClick={handleOpenModal}>
            <AddIcon />
          </Fab>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default CampaignPage;
