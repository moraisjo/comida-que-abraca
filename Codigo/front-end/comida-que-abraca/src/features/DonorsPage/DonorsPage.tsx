// src/modules/donors/pages/DonorsPage.tsx
import React from "react";
import { Box } from "@mui/material";
import HeaderMenu from "../../shared/components/HeaderMenu";
import DonorList from "./components/DonorList";

const DonorsPage: React.FC = () => {
  return (
    <>
      <HeaderMenu />
      <Box sx={{ width: "100%", p: 3 }}>
        <DonorList />
      </Box>
    </>
  );
};

export default DonorsPage;
