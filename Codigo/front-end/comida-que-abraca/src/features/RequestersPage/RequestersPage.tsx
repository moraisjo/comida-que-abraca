import React from "react";
import HeaderMenu from "../../shared/components/HeaderMenu";
import RequestersList from "./components/RequestersList";
import { Box } from "@mui/material";

const RequestersPage: React.FC = () => {
  return (
    <>
      <HeaderMenu />
      <Box sx={{ width: "100%", p: 3 }}>
        <RequestersList />
      </Box>
    </>
  );
};

export default RequestersPage;
