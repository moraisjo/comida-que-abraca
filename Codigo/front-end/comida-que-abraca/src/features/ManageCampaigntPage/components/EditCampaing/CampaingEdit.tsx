import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import ImageUpload from "../../../../shared/components/Upload/ImageUpload";

interface EditCampaignModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  photoUrl: string;
  setPhotoUrl: (value: string) => void;
}

const CampaingEdit: React.FC<EditCampaignModalProps> = ({
  open,
  onClose,
  onSave,
  name,
  setName,
  description,
  setDescription,
  address,
  setAddress,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  photoUrl,
  setPhotoUrl,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Campanha</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nome"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Descrição"
          fullWidth
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Endereço"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Data Início"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Data Fim"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <Box
          sx={{
            width: "100%",
            height: "56px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ccc",
            padding: "0 16px",
            mt: 1,
          }}
        >
          <ImageUpload onImageUploaded={setPhotoUrl} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: "15px",
          }}
        >
          <Button
            onClick={onSave}
            variant="contained"
            sx={{
              backgroundColor: "primary",
              color: "white",
              fontSize: "12px",
              textTransform: "none",
              width: "100%",
              height: "40px",
            }}
          >
            Salvar
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              borderColor: "primary",
              color: "primary",
              fontSize: "12px",
              textTransform: "none",
              width: "100%",
              height: "40px",
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: "primary",
              },
            }}
          >
            Cancelar
          </Button>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{ flexDirection: "column", width: "100%", gap: 1, px: 3, pb: 3 }}
      ></DialogActions>
    </Dialog>
  );
};

export default CampaingEdit;
