import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DonationForm from "./DonationForm";

interface ModalDonationFormProps {
  open: boolean;
  handleClose: () => void;
}

const ModalDonationForm: React.FC<ModalDonationFormProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Nova Doação
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DonationForm />
      </DialogContent>
    </Dialog>
  );
};

export default ModalDonationForm;
