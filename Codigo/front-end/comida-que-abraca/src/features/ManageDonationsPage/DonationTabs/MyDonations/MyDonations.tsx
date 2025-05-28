import React, { useEffect, useState } from "react";
import {Box, Typography, TextField, Paper, Avatar, CircularProgress, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Tooltip, useTheme, TablePagination} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import useDonationService from "../../hooks/useDonationService";
import { DonationResponse } from "../../../../data/model/donation";

interface MyDonationResponse {
  id: number;
  name: string;
  requestDate: string;
  delivery: string;
  status: string;
  photoUrl: string;
  beneficiaryName: string;
  campaignName?: string;
}

const MyDonations: React.FC = () => {
  const { getAllDonations } = useDonationService();
  const [donations, setDonations] = useState<MyDonationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<MyDonationResponse | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getAllDonations();
        const myDonations = data
          .filter(donation => donation.donor?.id === 1) //mudar depois do merge geral pra pegar o id do usuario logado
          .map(donation => ({
            id: donation.id,
            name: donation.name,
            requestDate: donation.arrivingDate,
            delivery: donation.delivery,
            status: donation.status,
            photoUrl: "", 
            beneficiaryName: donation.beneficiary?.name || "Não informado",
            campaignName: donation.campaign?.name
          }));
        setDonations(myDonations);
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
      donation.beneficiaryName.toLowerCase().includes(filterText.toLowerCase()) ||
      donation.campaignName?.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleActionClick = (donation: MyDonationResponse) => {
    setSelectedDonation(donation);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedDonation(null);
  };

  const getStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
      PENDING: "Pendente",
      STOCK: "Em Estoque",
      DONATED: "Doado",
      ACCEPTED: "Aceito",
      REJECTED: "Rejeitado",
      PENDING_DELIVERY: "Pendente Entrega",
      CANCELED_DELIVERY: "Entrega Cancelada"
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
                <TableCell sx={{ fontWeight: "bold" }}>Data de Criação</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Campanha</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Beneficiário</TableCell>
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
                    sx={{
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
                    <TableCell>
                      {new Date(donation.requestDate).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      {donation.campaignName || "Sem campanha associada"}
                    </TableCell>
                    <TableCell>{getStatusLabel(donation.status)}</TableCell>
                    <TableCell>{donation.beneficiaryName}</TableCell>
                    <TableCell>
                      {donation.delivery === "PICKUP" ? "Retirada" : "Entrega"}
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
            <Typography fontSize="14px" color="#666" mb="10px">
              <strong>Item:</strong> {selectedDonation?.name}
            </Typography>
            <Typography fontSize="14px" color="#666" mb="10px">
              <strong>Status:</strong> {selectedDonation?.status && getStatusLabel(selectedDonation.status)}
            </Typography>
            <Typography fontSize="14px" color="#666" mb="10px">
              <strong>Beneficiário:</strong> {selectedDonation?.beneficiaryName}
            </Typography>
            <Typography fontSize="14px" color="#666" mb="10px">
              <strong>Campanha:</strong>{" "}
              {selectedDonation?.campaignName || "Sem campanha associada"}
            </Typography>
            <Typography fontSize="14px" color="#666" mb="10px">
              <strong>Tipo de Entrega:</strong>{" "}
              {selectedDonation?.delivery === "PICKUP" ? "Retirada" : "Entrega"}
            </Typography>
            <Typography fontSize="14px" color="#666">
              <strong>Data de Criação:</strong>{" "}
              {selectedDonation?.requestDate &&
                new Date(selectedDonation.requestDate).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
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

export default MyDonations; 