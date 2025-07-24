import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import colors from "../../../shared/theme/colors";

interface BackendResponseModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
  isSuccess: boolean;
}

const BackendResponseModal: React.FC<BackendResponseModalProps> = ({
  open,
  onClose,
  message,
  isSuccess,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "20px",
          padding: "20px",
          width: "350px",
          maxWidth: "90vw",
        },
      }}
    >
      <DialogTitle>
        <Typography fontSize="18px" fontWeight="bold" color={colors.black}>
          {isSuccess ? "Sucesso" : "Erro"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          fontSize="14px"
          color={colors.regularGray}
          textAlign="center"
          mb="20px"
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "0 16px 16px",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: colors.primary,
            color: colors.white,
            borderRadius: "20px",
            width: "120px",
            fontSize: "14px",
            textTransform: "none",
          }}
        >
          {isSuccess ? "OK" : "Retornar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BackendResponseModal;
