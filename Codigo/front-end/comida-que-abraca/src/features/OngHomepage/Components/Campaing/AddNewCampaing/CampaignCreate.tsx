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
import ImageUpload from "../../../../../shared/components/Upload/ImageUpload";
import { CampaignService } from "../../../hooks/UseCampaingsService";
import { CreateCampaignRequest } from "../../../../../data/model/campaign";
import BackendResponseModal from "../../../../../shared/components/Modal/BackendResponseModal";

interface CampaignCreateProps {
  onClose: () => void;
}

const CampaignCreate: React.FC<CampaignCreateProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async () => {
    if (!name || !startDate || !endDate) {
      setResponseMessage("Preencha os campos obrigatórios.");
      setIsSuccess(false);
      setModalOpen(true);
      return;
    }

    const campaignData: CreateCampaignRequest = {
      name,
      description,
      address,
      startDate,
      endDate,
      photoUrl: photoUrl || "Nenhuma foto selecionada",
      status: "ACTIVE",
    };

    console.log("Enviando para API:", campaignData);

    try {
      const response = await CampaignService.createCampaign(campaignData);

      if (response.statusCode === 200) {
        setResponseMessage(response.message || "Campanha criada com sucesso!");
        setIsSuccess(true);
      } else {
        setResponseMessage(
          response.message || "Ocorreu um erro ao criar a campanha."
        );
        setIsSuccess(false);
      }

      setModalOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao criar campanha:", error);
        setResponseMessage(error.message);
      } else {
        setResponseMessage("Ocorreu um erro ao criar a campanha.");
      }
      setIsSuccess(false);
      setModalOpen(true);
    }
  };

  return (
    <>
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
              label="Endereço"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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

            <Box
              sx={{
                width: "100%",
                height: "56px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "0 16px",
              }}
            >
              <ImageUpload onImageUploaded={setPhotoUrl} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 24px 24px",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: colors.primary,
              color: colors.primary,
              fontSize: "12px",
              textTransform: "none",
              width: "50%",
              height: "45px",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: colors.primary,
              },
            }}
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
              width: "50%",
              height: "45px",
            }}
            onClick={handleSubmit}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <BackendResponseModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          if (isSuccess) onClose();
        }}
        message={responseMessage}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default CampaignCreate;
