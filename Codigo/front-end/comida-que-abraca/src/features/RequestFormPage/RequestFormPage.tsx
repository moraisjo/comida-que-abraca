import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import HeaderMenu from "../../shared/components/HeaderMenu";
import FormPage from "./components/FormPage";
import { Box, IconButton } from "@mui/material";

const RequestFormPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <HeaderMenu />
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
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
      <FormPage open={openModal} handleClose={() => setOpenModal(false)} />
    </>
  );
};

export default RequestFormPage;
