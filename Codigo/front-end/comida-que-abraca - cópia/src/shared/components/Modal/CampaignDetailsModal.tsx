import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import colors from "../../../shared/theme/colors";

export default function CampaignDetailModal({
  openModal,
  handleCloseModal,
  selectedCampaign,
}: {
  openModal: boolean;
  handleCloseModal: () => void;
  selectedCampaign: {
    name: string;
    address: string;
    description: string;
    startDate: string;
    endDate: string;
  };
}) {
  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4 },
      }}
    >
      <DialogTitle
        gutterBottom
        sx={{
          m: 0,
          p: 2,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
          color: colors.primary,
        }}
      >
        {selectedCampaign.name}
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", paddingY: 4 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {new Date(selectedCampaign.startDate).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}{" "}
          a{" "}
          {new Date(selectedCampaign.endDate).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontStyle: "italic",
            marginBottom: 1,
          }}
        >
          {selectedCampaign.address}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginTop: 2,
            whiteSpace: "pre-wrap",
            color: "text.primary",
          }}
        >
          {selectedCampaign.description}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
