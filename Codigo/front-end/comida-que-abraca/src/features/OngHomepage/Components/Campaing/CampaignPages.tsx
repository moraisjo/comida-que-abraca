import React, { useState } from "react";

import HeaderMenu from "../../../../shared/components/HeaderMenu";
import CampaignCreate from "../../Components/Campaing/AddNewCampaing/CampaignCreate";
import CampaignList from "../../Components/Campaing/ListCampaing/CampaignList";

const CampaignPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <HeaderMenu />
      <CampaignList onCreate={handleOpenModal} />

      {isModalOpen && <CampaignCreate onClose={handleCloseModal} />}
    </>
  );
};

export default CampaignPage;
