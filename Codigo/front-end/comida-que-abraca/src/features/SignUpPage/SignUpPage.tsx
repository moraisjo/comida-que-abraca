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
  Box,
  Paper,
  Link
} from "@mui/material";
import logo from '../../assets/comida-que-abraca-logo.png';
import api from "../../api/axios";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    wantsToDonate: false,
    wantsToReceiveDonations: false,
    legalEntityType: "ONG",
  });

  const legalEntityTypes = [
    { label: "ONG", value: "ONG" },
    { label: "Empresa", value: "COMPANY" },
    { label: "Indivíduo", value: "INDIVIDUAL" },
    { label: "Governo", value: "GOVERNMENT" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/partners/create", formData);

      if (response.status === 200 || response.status === 201) {
        alert("Parceiro cadastrado com sucesso!");
        setFormData({
          name: "",
          email: "",
          password: "",
          wantsToDonate: false,
          wantsToReceiveDonations: false,
          legalEntityType: "ONG",
        });
      } else {
        alert("Falha ao cadastrar parceiro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 4 }}>
        <img src={logo} alt="Logo Comida que Abraça" width="80%" />
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Cadastro de Parceiro
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
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Já possui cadastro?{' '}
          <Link href="/login" underline="hover">
            Clique aqui!
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
