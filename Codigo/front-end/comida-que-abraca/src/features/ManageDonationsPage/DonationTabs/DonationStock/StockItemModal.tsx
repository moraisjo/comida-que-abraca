import { Box, Modal, Typography } from "@mui/material";
import colors from "../../../../shared/theme/colors";

// Definindo as props
interface StockItemModalProps {
  open: boolean;
  handleCloseModal: () => void;
  donation: DonationDetail | null;
}

interface DonationDetail {
  id: number;
  name: string;
  arrivingDate: string;
  delivery: string;
  donorName: string;
  beneficiaryName: string;
}

const StockItemModal: React.FC<StockItemModalProps> = ({
  open,
  handleCloseModal,
  donation,
}) => (
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
        Detalhes da doação
      </Typography>
      {donation ? (
        <>
          <Typography>
            <strong>Descrição:</strong> {donation.name}{" "}
          </Typography>
          <Typography>
            <strong>Doador(a):</strong> {donation.donorName}{" "}
          </Typography>
          <Typography>
            <strong>Data de entrega:</strong> {donation.arrivingDate}
          </Typography>
          <Typography>
            <strong>Tipo de entrega:</strong> {donation.delivery}
          </Typography>
          <Typography>
            <strong>Beneficiário:</strong> {donation.beneficiaryName}
          </Typography>
        </>
      ) : (
        <Typography>Carregando...</Typography>
      )}
    </Box>
  </Modal>
);

export default StockItemModal;
