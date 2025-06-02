import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
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
  TablePagination,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import BackendResponseModal from "../../../../shared/components/Modal/BackendResponseModal";
import useDonationService from "../../hooks/useDonationService";
import { AxiosError } from "axios";

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
  const { getPendingDelivery, updateDonationStatusStock } =
    useDonationService();

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

  const [filterText, setFilterText] = useState("");
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getPendingDelivery();
        setDonations(data);
      } catch (err: unknown) {
        const error = err as AxiosError;
        console.error("Erro ao carregar doações:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const filteredDonations = donations.filter(
    (donation) =>
      donation.name.toLowerCase().includes(filterText.toLowerCase()) ||
      donation.donorName.toLowerCase().includes(filterText.toLowerCase()) ||
      donation.campaignName?.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleActionClick = (donation: DonationDeliveryPendingResponse) => {
    setSelectedDonation(donation);
    setOpenDialog(true);
  };

  const handleConfirm = async (status: string) => {
    if (!selectedDonation) return;

    try {
      const response = await updateDonationStatusStock(
        selectedDonation.id,
        status
      );

      setResponseMessage(response.message);
      setResponseSuccess(true);
      setResponseModalOpen(true);

      setDonations((prev) => prev.filter((d) => d.id !== selectedDonation.id));
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error("Erro ao atualizar status de entrega:", error.message);
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
        <TextField
          label="Buscar..."
          variant="outlined"
          size="small"
          fullWidth
          style={{ marginBottom: 16 }}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Imagem</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Item</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Doador</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Data de Solicitação
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Status de Entrega
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Ação
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDonations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((donation, index) => (
                  <TableRow
                    key={donation.id}
                    hover
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                      borderBottom: "1px solid #eee",
                    }}
                  >
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
                          onClick={() => handleActionClick(donation)}
                          sx={{
                            color: "#FF6A00",
                          }}
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
              Entregue
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
              Não Entregue
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10]}
        count={donations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
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
