import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface CampaignDeleteProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const CampaignDelete: React.FC<CampaignDeleteProps> = ({
  open,
  onClose,
  onDelete,
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
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Confirmar Exclusão
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", padding: 2 }}>
        <Typography>Deseja excluir a campanha?</Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          onClick={onDelete}
          variant="contained"
          sx={{
            backgroundColor: "primary.main",
            color: "#fff",
            width: "100%",
            fontSize: "14px",
          }}
        >
          Excluir
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            width: "100%",
            fontSize: "14px",
          }}
        >
          Não Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampaignDelete;
