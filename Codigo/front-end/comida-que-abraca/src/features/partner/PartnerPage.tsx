import React from "react";
import HeaderMenu from "../../shared/components/HeaderMenu";
import PartnerForm from "./PartnerForm";

const PartnerPage: React.FC = () => {
  return (
    <>
      <HeaderMenu title="Comida Que Abraça" />
      <PartnerForm />
    </>
  );
};

export default PartnerPage;