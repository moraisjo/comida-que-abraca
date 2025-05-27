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
import useDonationService from "../../hooks/useDonationService";

interface DonationStockResponse {
  id: number;
  name: string;
  deliveryDate: string;
  deliveryType: string;
  photoUrl: string;
  donorName: string;
}

const DonationStock: React.FC = () => {
  const { getAllDonations } = useDonationService();
  const [donations, setDonations] = useState<DonationStockResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [selectedDonation, setSelectedDonation] =
    useState<DonationStockResponse | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getAllDonations();

        if (data) {
          const mappedDonations: DonationStockResponse[] = data.map(
            (donation) => ({
              id: donation.id,
              name: donation.name,
              deliveryDate: donation.arrivingDate || "Data não disponível", // Corrigido
              deliveryType:
                donation.delivery === "PICKUP" ? "Retirada" : "Entregue",
              photoUrl: "", // Caso precise de imagem do doador, ajustar aqui
              donorName: donation.donor?.name || "Nome não informado",
            })
          );

          setDonations(mappedDonations);
        }
      } catch (error) {
        console.error("Erro ao carregar doações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const filteredDonations = donations.filter(
    (donation) =>
      donation.name.toLowerCase().includes(filterText.toLowerCase()) ||
      donation.donorName.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleActionClick = (donation: DonationStockResponse) => {
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
                  Data de Entrega
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Tipo de Entrega
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Saiba Mais
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
                    <TableCell>{donation.deliveryDate}</TableCell>
                    <TableCell>
                      {donation.deliveryType === "PICKUP"
                        ? "Retirada"
                        : donation.deliveryType === "DELIVERY"
                        ? "Entregue"
                        : donation.deliveryType}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Saiba mais">
                        <IconButton
                          onClick={() => handleActionClick(donation)}
                          sx={{
                            color: theme.palette.primary.main,
                          }}
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
              Detalhes da Doação
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Typography
              fontSize="14px"
              color="#666"
              textAlign="center"
              mb="20px"
            >
              Doador: <strong>{selectedDonation?.donorName}</strong>
            </Typography>
            <Typography
              fontSize="14px"
              color="#666"
              textAlign="center"
              mb="20px"
            >
              Data de Entrega: <strong>{selectedDonation?.deliveryDate}</strong>
            </Typography>
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={handleClose}
              sx={{ color: theme.palette.primary.main }}
            >
              Fechar
            </Button>
          </DialogActions>
        </Dialog>

        <TablePagination
          component="div"
          rowsPerPageOptions={[10]}
          count={donations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Box>
    </>
  );
};

export default DonationStock;
