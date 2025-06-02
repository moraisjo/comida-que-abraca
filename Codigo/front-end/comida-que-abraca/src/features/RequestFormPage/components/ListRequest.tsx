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
  TextField,
  CircularProgress,
  TablePagination,
  useTheme,
} from "@mui/material";
import BackendResponseModal from "../../../shared/components/Modal/BackendResponseModal";
import { useRequestPartner } from "../hooks/useRequestPartner";
import { useAuth } from "../../../context/AuthContext";
import colors from "../../../shared/theme/colors";

const ListRequest: React.FC = () => {
  const theme = useTheme();

  const { decodedUser } = useAuth();
  const userId = decodedUser?.userId ? Number(decodedUser.userId) : null;

  const { requests, loading, error, message, getRequestsByUser } =
    useRequestPartner();

  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIsSuccess, setModalIsSuccess] = useState(true);

  useEffect(() => {
    if (userId !== null) {
      getRequestsByUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (message) {
      setModalMessage(message);
      setModalIsSuccess(true);
      setModalOpen(true);
    }
    if (error) {
      setModalMessage(error);
      setModalIsSuccess(false);
      setModalOpen(true);
    }
  }, [message, error]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.itemType.toLowerCase().includes(filterText.toLowerCase()) ||
      req.description.toLowerCase().includes(filterText.toLowerCase())
  );

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
        <Typography variant="h6" mb={2} color={theme.palette.primary.main}>
          Minhas Solicitações
        </Typography>
        <TextField
          label="Buscar requisição..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        {filteredRequests.length === 0 ? (
          <Typography color="textSecondary" align="center" mt={2}>
            Nenhuma solicitação encontrada.
          </Typography>
        ) : (
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
                  <TableCell sx={{ fontWeight: "bold" }}>Item</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Descrição</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Data de Solicitação
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((req) => (
                    <TableRow key={req.id} hover>
                      <TableCell>{req.itemType}</TableCell>
                      <TableCell>{req.description}</TableCell>
                      <TableCell>
                        {req.requestDate
                          ? new Date(req.requestDate).toLocaleDateString(
                              "pt-BR",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : "Data não informada"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <TablePagination
          component="div"
          rowsPerPageOptions={[rowsPerPage]}
          count={filteredRequests.length}
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
    </>
  );
};

export default ListRequest;
