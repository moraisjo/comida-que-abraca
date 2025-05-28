import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

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

        <TextField
          margin="dense"
          label="URL da Imagem"
          fullWidth
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        {photoUrl && (
          <Box mt={2} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="subtitle2" gutterBottom>
              Pré-visualização da imagem:
            </Typography>
            <Box
              component="img"
              src={photoUrl}
              alt="Imagem da campanha"
              sx={{
                width: "100%",
                maxHeight: 200,
                objectFit: "contain",
                borderRadius: 1,
                border: "1px solid #ccc",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "";
              }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampaingEdit;
