import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  CircularProgress,
  useTheme,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TablePagination,
} from "@mui/material";
import { InfoOutlined, CheckCircleOutline } from "@mui/icons-material";
import { PendingDonationResponse } from "../../../../data/model/donation";
import BackendResponseModal from "../../../../shared/components/Modal/BackendResponseModal";
import useDonationService from "../../hooks/useDonationService";

const PendingDonations: React.FC = () => {
  const [donations, setDonations] = useState<PendingDonationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [selectedDonation, setSelectedDonation] =
    useState<PendingDonationResponse | null>(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIsSuccess, setModalIsSuccess] = useState(true);

  const theme = useTheme();
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const { getPendingDonations, updateDonationStatus } = useDonationService();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getPendingDonations();
        setDonations(data);
      } catch (error) {
        console.error("Erro ao carregar doações:", error);
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
      donation.campaignName?.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleAccept = async (id: number) => {
    try {
      const response = await updateDonationStatus(id, "PENDING_DELIVERY");
      setModalMessage(response.message);
      setModalIsSuccess(true);
      setDonations((prev) => prev.filter((donation) => donation.id !== id));
    } catch {
      setModalMessage("Erro ao aceitar a doação");
      setModalIsSuccess(false);
    } finally {
      setModalOpen(true);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = await updateDonationStatus(id, "REJECTED");
      setModalMessage(response.message);
      setModalIsSuccess(true);
      setDonations((prev) => prev.filter((donation) => donation.id !== id));
    } catch {
      setModalMessage("Erro ao rejeitar a doação");
      setModalIsSuccess(false);
    } finally {
      setModalOpen(true);
    }
  };

  const handleOpenDetailsDialog = (donation: PendingDonationResponse) => {
    setSelectedDonation(donation);
    setOpenDetailsDialog(true);
  };

  const handleOpenActionDialog = (donation: PendingDonationResponse) => {
    setSelectedDonation(donation);
    setOpenActionDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedDonation(null);
  };

  const handleCloseActionDialog = () => {
    setOpenActionDialog(false);
    setSelectedDonation(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
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

        {filteredDonations.length === 0 ? (
          <Typography color="textSecondary">
            Nenhuma doação encontrada.
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Imagem</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Item</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Data de Solicitação
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Campanha</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Saiba Mais
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Ação
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDonations
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((donation) => (
                    <TableRow
                      key={donation.id}
                      hover
                      sx={{ borderBottom: "1px solid #eee" }}
                    >
                      <TableCell>
                        <Avatar
                          src={donation.photoUrl || ""}
                          variant="rounded"
                          sx={{ width: 48, height: 48 }}
                        />
                      </TableCell>
                      <TableCell>{donation.name}</TableCell>
                      <TableCell>
                        {donation.requestDate
                          ? new Date(donation.requestDate).toLocaleDateString(
                              "pt-BR",
                              { day: "2-digit", month: "long", year: "numeric" }
                            )
                          : "Data não informada"}
                      </TableCell>
                      <TableCell>
                        {donation.campaignName || "Sem campanha associada"}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Saiba mais">
                          <IconButton
                            onClick={() => handleOpenDetailsDialog(donation)}
                            sx={{ color: theme.palette.primary.main }}
                            disabled={true}
                          >
                            <InfoOutlined />
                          </IconButton>
                        </Tooltip>
                      </TableCell>

                      <TableCell align="center">
                        <Tooltip title="Confirmar Ação">
                          <IconButton
                            onClick={() => handleOpenActionDialog(donation)}
                            sx={{ color: "#FF6A00" }}
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
        )}
        <TablePagination
          component="div"
          rowsPerPageOptions={[10]}
          count={donations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Box>

      <BackendResponseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        isSuccess={modalIsSuccess}
      />

      <Dialog
        open={openDetailsDialog}
        onClose={handleCloseDetailsDialog}
        PaperProps={{
          style: {
            borderRadius: "20px",
            padding: "20px",
            width: "350px",
            maxWidth: "90vw",
          },
        }}
      >
        <DialogTitle>Detalhes da Doação</DialogTitle>
        <DialogContent>
          <Typography>
            <strong>Item:</strong> {selectedDonation?.name}
          </Typography>
          <Typography>
            <strong>Doador:</strong> {selectedDonation?.donorName}
          </Typography>
          <Typography>
            <strong>Campanha:</strong>{" "}
            {selectedDonation?.campaignName || "Sem campanha associada"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openActionDialog}
        onClose={handleCloseActionDialog}
        PaperProps={{
          style: {
            borderRadius: "20px",
            padding: "20px",
            width: "350px",
            maxWidth: "90vw",
          },
        }}
      >
        <DialogContent>
          <Typography fontSize="14px" color="#666" textAlign="center" mb="20px">
            Você deseja aceitar a doação{" "}
            <strong>{selectedDonation?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            onClick={() => selectedDonation && handleAccept(selectedDonation.id!)}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              borderRadius: "20px",
              width: "100%",
              fontSize: "14px",
            }}
          >
            Aceitar
          </Button>
          <Button
            onClick={() => selectedDonation && handleReject(selectedDonation.id!)}
            sx={{
              backgroundColor: "transparent",
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "20px",
              width: "100%",
              fontSize: "14px",
            }}
          >
            Rejeitar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PendingDonations;
