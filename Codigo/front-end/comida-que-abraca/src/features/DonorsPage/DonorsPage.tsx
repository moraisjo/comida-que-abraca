import React from "react";
import { Box } from "@mui/material";
import HeaderMenu from "../../shared/components/HeaderMenu";
import DonorList from "./components/DonorList";
import Footer from "../../shared/components/Footer/Footer";

const DonorsPage: React.FC = () => {
  return (
    <>
      <HeaderMenu />
      <Box sx={{ width: "100%", p: 3, pb: 10 }}>
        <DonorList />
      </Box>
      <Footer />
    </>
  );
};

export default DonorsPage;
