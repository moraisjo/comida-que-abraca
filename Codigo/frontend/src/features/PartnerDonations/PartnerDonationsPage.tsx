import React from "react";
import HeaderMenu from "../../shared/components/HeaderMenu";
import PartnerDonationsTable from "./components/PartnerDonationsTable";
import Footer from "../../shared/components/Footer/Footer";

const PartnerDonationsPage: React.FC = () => {
  return (
    <>
      <HeaderMenu />
      <PartnerDonationsTable />
      <Footer />
    </>
  );
};

export default PartnerDonationsPage;
