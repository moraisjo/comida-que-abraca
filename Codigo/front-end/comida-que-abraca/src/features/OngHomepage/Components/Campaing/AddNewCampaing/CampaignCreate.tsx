import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import colors from "../../../../../shared/theme/colors";

interface CampaignCreateProps {
  onClose: () => void;
}

const CampaignCreate: React.FC<CampaignCreateProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!name || !startDate || !endDate) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    const campaignData = {
      name,
      description,
      startDate,
      endDate,
      photo: photo ? photo.name : "Nenhuma foto selecionada",
    };

    console.log("Campanha criada:", campaignData);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth>
      <DialogTitle>Cadastrar Nova Campanha</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Nome da Campanha *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Descrição"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Data de Início *"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Data de Término *"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            margin="dense"
          />
          <Button variant="contained" component="label">
            Selecionar Foto
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {photo && <p>Foto selecionada: {photo.name}</p>}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", gap: 2, width: "100%", padding: "0 24px 24px" }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.secondary,
            color: colors.white,
            fontSize: "12px",
            textTransform: "none",
            flex: 1,
            height: "45px",
          }}
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.primary,
            color: colors.white,
            fontSize: "12px",
            textTransform: "none",
            flex: 1,
            height: "45px",
          }}
          onClick={handleSubmit}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampaignCreate;
