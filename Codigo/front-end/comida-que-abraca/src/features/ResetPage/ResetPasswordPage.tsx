import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import api from "../../api/axios";
import logo from "../../assets/comida-que-abraca-logo.png";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setErrorMsg("As senhas não coincidem.");
      return;
    }

    try {
      await api.put("/user/reset-password", {
        email,
        newPassword,
      });
      setSuccessMsg("Senha redefinida com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Erro ao redefinir senha.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4, borderRadius: 4 }}>
        <img src={logo} alt="Logo Comida que Abraça" width="80%" />
        <Typography variant="h5" align="center" gutterBottom>
          Redefinir Senha
        </Typography>
        <Box
          component="form"
          onSubmit={handleReset}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Nova Senha"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Confirmar Nova Senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" fullWidth>
            Redefinir Senha
          </Button>

          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          {successMsg && <Alert severity="success">{successMsg}</Alert>}
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Lembrou a senha?{" "}
          <Link href="/login" underline="hover">
            Voltar para o login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
