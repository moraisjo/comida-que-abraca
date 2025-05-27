import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  TablePagination,
} from "@mui/material";
import { getUsersForDisplay } from "../hooks/donorsService";
import { User } from "../../../data/model/user";
import PersonIcon from "@mui/icons-material/Person";

const DonorList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" gutterBottom>
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
        {paginatedUsers.map((user, index) => {
          const globalIndex = page * rowsPerPage + index;
          return (
            <Box key={globalIndex} mb={1}>
              <ListItem
                disablePadding
                sx={{
                  backgroundColor: "#edf2fa",
                  borderRadius: 2,
                }}
              >
                <ListItemButton onClick={() => handleToggle(globalIndex)}>
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
              <Collapse
                in={expandedIndex === globalIndex}
                timeout="auto"
                unmountOnExit
              >
                <Box ml={7} mt={1} mb={1}>
                  <Typography variant="body2">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Telefone:</strong> {user.phone}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Endereço:</strong> {user.address}
                  </Typography>
                </Box>
              </Collapse>
            </Box>
          );
        })}
      </List>

      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage=""
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count}`
        }
      />
    </Box>
  );
};

export default DonorList;
