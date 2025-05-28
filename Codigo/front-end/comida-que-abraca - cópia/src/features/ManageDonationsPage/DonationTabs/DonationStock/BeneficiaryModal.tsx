import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import colors from "../../../../shared/theme/colors";
import { Partner } from "../../../../data/model/partner";
import { useState } from "react";

interface DonationDetail {
  id: number;
  name: string;
  arrivingDate: string;
  delivery: string;
  donorName: string;
  beneficiaryName: string;
}
interface BeneficiaryModalProps {
  open: boolean;
  handleCloseModal: () => void;
  partners: Partner[];
  donation: DonationDetail;
}

const BeneficiaryModal: React.FC<BeneficiaryModalProps> = ({
  open,
  handleCloseModal,
  partners,
  donation,
}) => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedId = parseInt(event.target.value, 10);
    const partner = partners.find((p) => p.id === selectedId);
    if (partner) {
      setSelectedPartner(partner);
    }
  };

  const handleDonate = async () => {
  if (!donation.id || !selectedPartner) {
    console.error("ID da doação ou do beneficiário não definido.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/donation/update-output/${donation.id}/${selectedPartner.id}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao fazer a doação: ${response.status}`);
    }

    console.log(
      "Doação feita com sucesso para o beneficiário:",
      selectedPartner
    );

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      handleCloseModal(); // ✅ fechar modal após mostrar alerta
    }, 3000);
  } catch (error: any) {
    console.error("Erro ao processar a doação:", error.message);
  }
};

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #ccc",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          color={colors.darkGray}
          marginBottom={2}
        >
          Quem vai receber a doação?
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel id="partner-select-label">Beneficiário</InputLabel>
          <Select
            labelId="partner-select-label"
            value={selectedPartner?.id?.toString() || ""}
            onChange={handleChange}
            label="Beneficiário"
          >
            {partners
              .filter((partner) => partner && partner.id !== undefined)
              .map((partner) => (
                <MenuItem key={partner.id} value={partner.id.toString()}>
                  {partner.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {showSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Doação feita com sucesso para {selectedPartner?.name}!
          </Alert>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDonate}
            disabled={!selectedPartner}
          >
            Doar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BeneficiaryModal;
