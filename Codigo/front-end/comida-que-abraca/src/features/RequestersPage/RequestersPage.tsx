import React from "react";
import HeaderMenu from "../../shared/components/HeaderMenu";
import RequestersList from "./components/RequestersList";

const RequestersPage: React.FC = () => {
  return (
    <>
      <HeaderMenu />
      <RequestersList />
    </>
  );
};

export default RequestersPage;
