import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
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
import { InfoOutlined, VolunteerActivism } from "@mui/icons-material";
import useDonationService from "../../hooks/useDonationService.tsx";
import { AxiosError } from "axios";
import BeneficiaryModal from "./BeneficiaryModal.tsx";
import api from "../../../../api/axios.ts";

interface Partner {
  name: string;
}

interface Campaign {
  name: string;
}

interface DonationResponse {
  id: number;
  name: string;
  arrivingDate: string;
  delivery: string;
  status: string;
  donor: Partner;
  beneficiary?: Partner;
  campaign?: Campaign;
}

const DonationsStocks: React.FC = () => {
  const { getDonationsStock } = useDonationService();

  const [beneficiaryModalOpen, setBeneficiaryModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [partners, setPartners] = useState([]);

  const [donations, setDonations] = useState<DonationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterText, setFilterText] = useState("");
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDonationsStock();
        setDonations(data);
      } catch (err: unknown) {
        const error = err as AxiosError;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await api.get("/partners/beneficiarios");
        setPartners(response.data);
      } catch (error) {
        console.error("Erro ao buscar parceiros:", error);
      }
    };

    fetchPartners();
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpenBeneficiaryModal = (donation: DonationResponse) => {
    setSelectedDonation(donation);
    setBeneficiaryModalOpen(true);
  };

  const handleCloseBeneficiaryModal = () => {
    setBeneficiaryModalOpen(false);
    setSelectedDonation(null);
  };

  const filteredDonations = donations.filter((donation) =>
    (donation.name || "").toLowerCase().includes(filterText.toLowerCase())
  );

  const handleInfoClick = (donation: DonationResponse) => {
    setSelectedDonation(donation);
    setOpenDialog(true);
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
          Nenhuma doação em estoque.
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
          sx={{ borderRadius: 2, boxShadow: "0px 2px 8px rgba(0,0,0,0.1)" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Descrição</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Doador(a)</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Data de Entrega
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Tipo de Entrega
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Beneficiário</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Saiba mais
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Doar
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
                    <TableCell>{donation.name}</TableCell>
                    <TableCell>{donation.donor.name}</TableCell>
                    <TableCell>{donation.arrivingDate}</TableCell>
                    <TableCell>
                      {donation.delivery === "DELIVERY"
                        ? "Entrega"
                        : "Retirada"}
                    </TableCell>
                    <TableCell>{donation.beneficiary?.name || "-"}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Saiba mais">
                        <IconButton
                          onClick={() => handleInfoClick(donation)}
                          sx={{ color: "#FF6A00" }}
                        >
                          <InfoOutlined />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip
                        title={
                          donation.beneficiary
                            ? "Já possui beneficiário"
                            : "Doar"
                        }
                      >
                        <span>
                          <IconButton
                            sx={{ color: theme.palette.primary.main }}
                            disabled={!!donation.beneficiary}
                            onClick={() => handleOpenBeneficiaryModal(donation)}
                          >
                            <VolunteerActivism />
                          </IconButton>
                        </span>
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
            <Typography fontSize="18px" fontWeight="bold">
              Detalhes da Doação
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Typography>
              <strong>Descrição:</strong> {selectedDonation?.name}
            </Typography>
            <Typography>
              <strong>Doador(a):</strong> {selectedDonation?.donor.name}
            </Typography>
            <Typography>
              <strong>Data de Entrega:</strong> {selectedDonation?.arrivingDate}
            </Typography>
            <Typography>
              <strong>Beneficiário:</strong>{" "}
              {selectedDonation?.beneficiary?.name || "-"}
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              fullWidth
            >
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {selectedDonation && (
        <BeneficiaryModal
          open={beneficiaryModalOpen}
          handleCloseModal={handleCloseBeneficiaryModal}
          partners={partners}
          donation={{
            id: selectedDonation.id,
            name: selectedDonation.name,
            arrivingDate: selectedDonation.arrivingDate,
            delivery: selectedDonation.delivery,
            donorName: selectedDonation.donor.name,
            beneficiaryName: selectedDonation.beneficiary?.name || "",
          }}
        />
      )}
      <TablePagination
        component="div"
        rowsPerPageOptions={[5]}
        count={filteredDonations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default DonationsStocks;
