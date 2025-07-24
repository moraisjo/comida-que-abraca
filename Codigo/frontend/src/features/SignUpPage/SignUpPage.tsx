import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
  Typography,
  Link,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import api from "../../api/axios";
import logo from "../../assets/comida-que-abraca-logo.png";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    wantsToDonate: false,
    wantsToReceiveDonations: false,
    legalEntityType: "",
  });

  const legalEntityTypes = [
    { label: "ONG", value: "ONG" },
    { label: "Empresa", value: "COMPANY" },
    { label: "Pessoa física", value: "INDIVIDUAL" },
    { label: "Governo", value: "GOVERNMENT" },
  ];

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | { name?: string; value: unknown; type?: string; checked?: boolean };

    const name = target.name as string;
    let value: unknown;

    if ("type" in target && target.type === "checkbox") {
      value = (target as HTMLInputElement).checked;
    } else {
      value = target.value;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/partners/create", formData);

      if (response.status === 200 || response.status === 201) {
        showSnackbar("Parceiro cadastrado com sucesso!", "success");
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          wantsToDonate: false,
          wantsToReceiveDonations: false,
          legalEntityType: "",
        });
      } else {
        showSnackbar("Falha ao cadastrar parceiro. Tente novamente.", "error");
      }
    } catch (error) {
      showSnackbar("Ocorreu um erro. Tente novamente.", "error");
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4, borderRadius: 4 }}>
          <img src={logo} alt="Logo Comida que Abraça" width="80%" />
          <Typography variant="h5" align="center" gutterBottom>
            Cadastro de parceiro
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="E-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Telefone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Endereço"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="wantsToDonate"
                  checked={formData.wantsToDonate}
                  onChange={handleChange}
                />
              }
              label="Deseja doar"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="wantsToReceiveDonations"
                  checked={formData.wantsToReceiveDonations}
                  onChange={handleChange}
                />
              }
              label="Deseja receber doações"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Tipo de Pessoa Jurídica</InputLabel>
              <Select
                name="legalEntityType"
                value={formData.legalEntityType}
                onChange={handleChange}
                label="Tipo de Pessoa Jurídica"
                labelId="legalEntityType-label"
              >
                {legalEntityTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Cadastrar
            </Button>
          </form>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Já possui cadastro?{" "}
            <Link href="/login" underline="hover">
              Clique aqui!
            </Link>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default SignUpPage;
