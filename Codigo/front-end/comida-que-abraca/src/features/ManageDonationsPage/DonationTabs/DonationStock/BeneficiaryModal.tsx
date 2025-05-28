import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Typography } from "@mui/material";
import colors from "../../../../shared/theme/colors";
import { Partner } from "../../../../data/model/partner";
import { useState } from "react";

// Definindo as props
interface BeneficiaryModalProps {
  open: boolean;
  handleCloseModal: () => void;
  partners: Partner[];
}

const BeneficiaryModal: React.FC<BeneficiaryModalProps> = ({
  open,
  handleCloseModal,
  partners,
}) => {   const [selectedPartner, setSelectedPartner] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPartner(event.target.value);
  };

  const handleDonate = () => {
    // Aqui você pode chamar alguma função para processar a doação
    console.log("Doação feita para o beneficiário:", selectedPartner);
    handleCloseModal();
  };
  
  return(
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
            value={selectedPartner}
            onChange={handleChange}
            label="Beneficiário"
          >
            {partners.map((partner) => (
              <MenuItem key={partner.id} value={partner.name}>
                {partner.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
);}

export default BeneficiaryModal;
