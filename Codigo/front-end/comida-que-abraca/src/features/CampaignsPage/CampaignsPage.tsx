import React, { useState } from "react";
import { Box } from "@mui/material";
import HeaderMenu from "../../shared/components/HeaderMenu";
import ListCampaing from "./components/ListCampaing";

const CampaignPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <HeaderMenu />
      <Box sx={{ width: "100%", p: 3 }}>
        <ListCampaing />
      </Box>
    </>
  );
};

export default CampaignPage;
