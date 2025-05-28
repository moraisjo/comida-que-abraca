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
import colors from "../../../shared/theme/colors";
import { getUsersForDisplay } from "../hooks/donorsService";
import { User } from "../../../data/model/user";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";

const DonorList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersForDisplay();
        setUsers(data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
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
        Doadores
      </Typography>

      <TextField
        label="Buscar por nome"
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
        {paginatedUsers.map((user, index) => (
          <Box key={page * rowsPerPage + index} mb={1}>
            <ListItem
              disablePadding
              sx={{
                backgroundColor: "#edf2fa",
                borderRadius: 2,
              }}
            >
              <ListItemButton onClick={() => setSelectedUser(user)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#90caf9" }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography fontWeight={600}>{user.name}</Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </Box>
        ))}
      </List>

      <TablePagination
        component="div"
        count={filteredUsers.length}
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
          Detalhes do Usuário
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DonorList;
