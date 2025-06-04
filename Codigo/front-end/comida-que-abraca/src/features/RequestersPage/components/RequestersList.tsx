import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import colors from "../../../shared/theme/colors";
import { User } from "../../../data/model/request";
import { useRequestPartner } from "../hooks/useRequestPartner";

const RequestersList: React.FC = () => {
  const { requests, loading, error, getAllRequests } = useRequestPartner();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    getAllRequests();
  }, [getAllRequests]);

  const filteredRequests = requests.filter((request) =>
    request.user.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedRequests = filteredRequests.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" gutterBottom sx={{ color: colors.primary }}>
        Solicitantes
      </Typography>

      <TextField
        label="Buscar por nome do solicitante"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      />

      <List>
        {paginatedRequests.map((request, index) => (
          <Box key={page * rowsPerPage + index} mb={1}>
            <ListItem
              disablePadding
              sx={{
                backgroundColor: "#edf2fa",
                borderRadius: 2,
              }}
            >
              <ListItemButton onClick={() => setSelectedUser(request.user)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#90caf9" }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography fontWeight={600}>
                      {request.user.name}
                    </Typography>
                  }
                  secondary={request.itemType}
                />
              </ListItemButton>
            </ListItem>
          </Box>
        ))}
      </List>

      <TablePagination
        component="div"
        count={filteredRequests.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count}`
        }
      />

      <Dialog
        open={!!selectedUser}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            textAlign: "center",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Detalhes do Solicitante
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Stack spacing={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon sx={{ color: colors.primary }} />
                <Typography>{selectedUser.email}</Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <PhoneIcon sx={{ color: colors.primary }} />
                <Typography>
                  {selectedUser.phone ?? "Telefone não informado"}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <HomeIcon sx={{ color: colors.primary }} />
                <Typography>
                  {selectedUser.address ?? "Endereço não informado"}
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
      </Dialog>

      {loading && (
        <Typography sx={{ mt: 2, color: "gray" }} align="center">
          Carregando...
        </Typography>
      )}

      {error && (
        <Typography sx={{ mt: 2, color: "error.main" }} align="center">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default RequestersList;
