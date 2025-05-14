import React, { useState } from "react";
import {
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Button,
  Box,
  TextField,
} from "@mui/material";
import colors from "../../../../shared/theme/colors";
import ImageUpload from "../../../../shared/components/Upload/ImageUpload";
import { CampaignService } from "../../hooks/UseCampaingsService";
import { CreateCampaignRequest } from "../../../../data/model/campaign";
import BackendResponseModal from "../../../../shared/components/Modal/BackendResponseModal";

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
  const [notifyUsers, setNotifyUsers] = useState(false);

  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isDisabled =
    !name || !description || !address || !startDate || !endDate || !photoUrl;

  const handleSubmit = async () => {
    const today = new Date().toISOString().split("T")[0];

    if (
      !name ||
      !description ||
      !address ||
      !startDate ||
      !endDate ||
      !photoUrl
    ) {
      setResponseMessage("Preencha todos os campos obrigatórios.");
      setIsSuccess(false);
      setModalOpen(true);
      return;
    }

    if (startDate < today) {
      setResponseMessage(
        "A data de início deve ser maior ou igual à data atual."
      );
      setIsSuccess(false);
      setModalOpen(true);
      return;
    }

    if (endDate < startDate) {
      setResponseMessage(
        "A data de término deve ser maior ou igual à data de início."
      );
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
      photoUrl,
      status: "ACTIVE",
      notifyUsers,
    };

    try {
      const response = await CampaignService.createCampaign(campaignData);

      setResponseMessage(response.message || "Erro ao processar resposta.");
      setIsSuccess(response.statusCode === 200);

      setTimeout(() => setModalOpen(true), 0);
    } catch (error) {
      setResponseMessage("Ocorreu um erro ao criar a campanha.");
      setIsSuccess(false);

      setTimeout(() => setModalOpen(true), 0);
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Descrição *"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Endereço *"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Data de Início *"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
            />
            <TextField
              fullWidth
              label="Data de Término *"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              margin="dense"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
            />

            <Box
              sx={{
                width: "100%",
                height: "56px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "20px",
                padding: "0 16px",
              }}
            >
              <ImageUpload onImageUploaded={setPhotoUrl} />
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "56px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "20px",
                padding: "0 16px",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={notifyUsers}
                    onChange={(e) => setNotifyUsers(e.target.checked)}
                    color="primary"
                  />
                }
                label="Notificar doadores sobre esta campanha"
              />
            </Box>
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
              variant="outlined"
              onClick={onClose}
              sx={{
                borderColor: colors.primary,
                color: colors.primary,
                fontSize: "12px",
                textTransform: "none",
                width: "100%",
                height: "40px",
                borderRadius: "20px",
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
                width: "100%",
                height: "40px",
                borderRadius: "20px",
              }}
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Salvar
            </Button>
          </Box>
        </DialogContent>
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
