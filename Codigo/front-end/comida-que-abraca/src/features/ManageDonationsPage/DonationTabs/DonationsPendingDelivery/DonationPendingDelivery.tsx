import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import BackendResponseModal from "../../../../shared/components/Modal/BackendResponseModal";
import { UseDonationService } from "../../../OngHomepage/hooks/UseDonationService";


interface DonationDeliveryPendingResponse {
  id: number;
  name: string;
  requestDate: string;
  delivery: string;
  status: string;
  photoUrl: string;
  donorName: string;
  campaignName?: string;
}

const DonationPendingDelivery: React.FC = () => {
  const [donations, setDonations] = useState<DonationDeliveryPendingResponse[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] =
    useState<DonationDeliveryPendingResponse | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseSuccess, setResponseSuccess] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await UseDonationService.getPendingDelivery();
        setDonations(data);
      } catch (error) {
        console.error("Erro ao carregar doações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const handleActionClick = (donation: DonationDeliveryPendingResponse) => {
    setSelectedDonation(donation);
    setOpenDialog(true);
  };

  const handleConfirm = async (status: string) => {
    if (!selectedDonation) return;

    try {
      const response = await UseDonationService.updateDonationStatusStock(
        selectedDonation.id,
        status
      );

      setResponseMessage(response.message);
      setResponseSuccess(true);
      setResponseModalOpen(true);

      setDonations((prev) => prev.filter((d) => d.id !== selectedDonation.id));
    } catch (error) {
      setResponseMessage("Erro ao atualizar status de entrega.");
      setResponseSuccess(false);
      setResponseModalOpen(true);
    } finally {
      setOpenDialog(false);
      setSelectedDonation(null);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedDonation(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (donations.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="textSecondary">
          Nenhuma doação pendente de entrega.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box p={2}>
        <Typography
          variant="h6"
          gutterBottom
          color={theme.palette.primary.main}
        >
          Doações Pendentes de Entrega
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Imagem</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Doador</TableCell>
                <TableCell>Data de Solicitação</TableCell>
                <TableCell>Status de Entrega</TableCell>
                <TableCell align="center">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id} hover>
                  <TableCell>
                    <Avatar
                      src={donation.photoUrl}
                      variant="rounded"
                      sx={{ width: 48, height: 48 }}
                    />
                  </TableCell>
                  <TableCell>{donation.name}</TableCell>
                  <TableCell>{donation.donorName}</TableCell>
                  <TableCell>{donation.requestDate}</TableCell>
                  <TableCell>
                    {donation.delivery === "DELIVERY"
                      ? "Pendente Entrega"
                      : donation.delivery === "PICKUP"
                      ? "Pendente Retirada"
                      : donation.delivery}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Confirmar entrega">
                      <IconButton
                        color="primary"
                        onClick={() => handleActionClick(donation)}
                      >
                        <CheckCircleOutline />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={openDialog}
          onClose={handleClose}
          PaperProps={{
            style: {
              borderRadius: "20px",
              padding: "20px",
              width: "350px",
              maxWidth: "90vw",
            },
          }}
        >
          <DialogTitle>
            <Typography fontSize="18px" fontWeight="bold" color="#000">
              Confirmar Entrega
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Typography
              fontSize="14px"
              color="#666"
              textAlign="center"
              mb="20px"
            >
              A entrega da doação <strong>{selectedDonation?.name}</strong> foi
              realizada?
            </Typography>
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 16px 16px",
              gap: 2,
            }}
          >
            <Button
              onClick={() => handleConfirm("STOCK")}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                borderRadius: "20px",
                width: "100%",
                fontSize: "14px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Confirmar Entrega
            </Button>
            <Button
              onClick={() => handleConfirm("CANCELED_DELIVERY")}
              sx={{
                backgroundColor: "transparent",
                color: theme.palette.primary.main,
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: "20px",
                width: "100%",
                fontSize: "14px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light + "20",
                },
              }}
            >
              Cancelar Entrega
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <BackendResponseModal
        open={responseModalOpen}
        onClose={() => setResponseModalOpen(false)}
        message={responseMessage}
        isSuccess={responseSuccess}
      />
    </>
  );
};

export default DonationPendingDelivery;
