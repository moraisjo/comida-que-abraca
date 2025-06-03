import React from "react";
import HeaderMenu from "../../shared/components/HeaderMenu";
import ListCampaing from "./components/ListCampaing";
import Banner from "./components/Banner";
import Footer from "../../shared/components/Footer/Footer";

const CampaignPage: React.FC = () => {
  return (
    <>
      <HeaderMenu />
      <Banner />
      <ListCampaing />
      <Footer />
    </>
  );
};

export default CampaignPage;
