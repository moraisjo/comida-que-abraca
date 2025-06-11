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
import { InfoOutlined } from "@mui/icons-material";
import useDonationService from "../hooks/partnerDonationService";
import { useAuth } from "../../../context/AuthContext";

interface MyDonationResponse {
  id: number;
  name: string;
  requestDate: string;
  delivery: string;
  status: string;
  photoUrl: string;
  donorName: string;
  campaignName?: string;
}

const PartnerDonationsTable: React.FC = () => {
  const { decodedUser } = useAuth();
  const { getDonationsByPartnerUserId } = useDonationService();
  const [donations, setDonations] = useState<MyDonationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [selectedDonation, setSelectedDonation] =
    useState<MyDonationResponse | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    if (!decodedUser) return;

    const fetchDonations = async () => {
      setLoading(true);
      try {
        const partnerUserId = Number(decodedUser.userId);
        const data = await getDonationsByPartnerUserId(partnerUserId);
        setDonations(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [getDonationsByPartnerUserId, decodedUser]);

  const filteredDonations = donations.filter(
    (donation) =>
      donation.name.toLowerCase().includes(filterText.toLowerCase()) ||
      donation.campaignName?.toLowerCase().includes(filterText.toLowerCase())
  );

  const isDisabled = (donation: MyDonationResponse) => {
    return !donation.photoUrl || donation.photoUrl.trim() === "";
  };

  const handleChangePage = (_unused: unknown, newPage: number) => {
    setPage(newPage);
  };

  const getStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
      PENDING: "Pendente",
      STOCK: "Em Estoque",
      DONATED: "Doado",
      ACCEPTED: "Aceito",
      REJECTED: "Rejeitado",
      PENDING_DELIVERY: "Pendente Entrega",
      CANCELED_DELIVERY: "Entrega Cancelada",
    };
    return statusMap[status] || status;
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
          Você ainda não fez nenhuma doação.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2} mb={8}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: theme.palette.primary.main }}
      >
        Minhas doações:
      </Typography>

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
              <TableCell sx={{ fontWeight: "bold" }}>Imagem</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Item</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Data de Criação</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Campanha</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tipo de Entrega</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Saiba Mais
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
                      src={donation.photoUrl}
                      variant="rounded"
                      sx={{ width: 48, height: 48 }}
                    />
                  </TableCell>
                  <TableCell>{donation.name}</TableCell>
                  <TableCell>
                    {new Date(donation.requestDate).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    {donation.campaignName || "Sem campanha associada"}
                  </TableCell>
                  <TableCell>{getStatusLabel(donation.status)}</TableCell>
                  <TableCell>
                    {donation.delivery === "PICKUP" ? "Retirada" : "Entrega"}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Saiba mais">
                      <IconButton
                        onClick={() => {
                          setSelectedDonation(donation);
                          setOpenDialog(true);
                        }}
                        sx={{ color: theme.palette.primary.main }}
                        disabled={isDisabled(donation)}
                      >
                        <InfoOutlined />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[10]}
        count={donations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  );
};

export default PartnerDonationsTable;
