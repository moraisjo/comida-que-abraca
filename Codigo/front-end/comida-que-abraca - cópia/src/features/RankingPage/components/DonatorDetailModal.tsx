import { Box, Modal, Typography } from "@mui/material";
import colors from "../../../shared/theme/colors";
import { DonationResponse } from "../../../data/model/donation";
import LatestDonationsTable from "./LatestDonationsTable";

// Definindo as props
interface DonatorItemModalProps {
  open: boolean;
  handleCloseModal: () => void;
  donorName: string;
  latestDonations: DonationResponse[];
}

const DonatorDetailModal: React.FC<DonatorItemModalProps> = ({
  open,
  handleCloseModal,
  donorName,
  latestDonations,
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
        Últimas doações de <strong>{donorName}</strong>
      </Typography>
      <LatestDonationsTable latestDonations={latestDonations} />
    </Box>
  </Modal>
);

export default DonatorDetailModal;
