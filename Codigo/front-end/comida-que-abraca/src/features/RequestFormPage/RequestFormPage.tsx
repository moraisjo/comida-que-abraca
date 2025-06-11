import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import HeaderMenu from "../../shared/components/HeaderMenu";
import FormPage from "./components/FormPage";
import ListRequest from "./components/ListRequest";
import Footer from "../../shared/components/Footer/Footer";
import { Box, IconButton } from "@mui/material";

const RequestFormPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <HeaderMenu />

      <Box sx={{ width: "100%", p: 2, paddingBottom: "80px" }}>
        <ListRequest />
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 96,
          right: 16,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={() => setOpenModal(true)}
          sx={{
            backgroundColor: "#F46A02",
            color: "white",
            borderRadius: "50%",
            width: 56,
            height: 56,
            boxShadow: 3,
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Footer />

      <FormPage open={openModal} handleClose={() => setOpenModal(false)} />
    </>
  );
};

export default RequestFormPage;
