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
  Link,
  Stack,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import api from "../../api/axios";
import HeaderMenu from "../../shared/components/HeaderMenu";
import { User } from "react-feather";

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
    <>
      <HeaderMenu isExternalPage={true} />
      <Container sx={{ p: 4, mt: 4 }}>
          <Box sx={{ mt: 4 }}>
            <Stack alignItems="center" spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" color="#FF5722" marginRight={1}>
                  Cadastro de parceiro
                </Typography>
                <User />
              </Box>
            </Stack>
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
            Já possui cadastro?{" "}
            <Link href="/login" underline="hover">
              Clique aqui!
            </Link>
          </Typography>
      </Container>
    </>
  );
};

export default SignUpPage;
