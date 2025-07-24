import React from "react";
import HeaderMenu from "../../shared/components/HeaderMenu";
import RequestersList from "./components/RequestersList";
import Footer from "../../shared/components/Footer/Footer";
import { Box } from "@mui/material";

const RequestersPage: React.FC = () => {
  return (
    <>
      <HeaderMenu />
      <Box sx={{ width: "100%", p: 3, pb: 10 }}>
        <RequestersList />
      </Box>
      <Footer />
    </>
  );
};

export default RequestersPage;
