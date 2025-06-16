import { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  Button,
  FormControlLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

export default function LoginPage() {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const { decodedUser } = useAuth();

  if (!decodedUser?.userId) {
    return <div>Carregando...</div>;
  }

  const saveLgpdConsent = async () => {
    try {
      await api.put(`/lgpd/consent/${decodedUser?.userId}`);
    } catch (error: any) {
      return false;
    }
  };

  const handleAccept = async () => {
    saveLgpdConsent();
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "white",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          padding: 4,
          borderRadius: 4,
          border: "2px solid #f57c00",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src="/leaf.svg"
            alt="Logo"
            style={{ marginBottom: "1rem", width: 80 }}
          />
          <Typography variant="h6" gutterBottom textAlign="center">
            Termos de Consentimento para Tratamento de Dados Pessoais
          </Typography>

          <Typography variant="body2" sx={{ textAlign: "justify", mb: 1 }}>
            Em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº
            13.709/2018), informamos que coletamos e utilizamos seus dados
            pessoais para melhorar sua experiência, oferecer nossos serviços e
            garantir a segurança da sua conta.
          </Typography>

          <Typography variant="body2" sx={{ textAlign: "justify", mb: 1 }}>
            Ao prosseguir, você declara que:
          </Typography>

          <List dense sx={{ mb: 2, paddingLeft: 2 }}>
            <ListItem disablePadding>
              <ListItemText primary="Está ciente e concorda com o tratamento dos seus dados pessoais conforme descrito na nossa Política de Privacidade." />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Autoriza o uso das informações fornecidas para finalidades relacionadas à prestação dos serviços, comunicação e melhorias de segurança." />
            </ListItem>
          </List>

          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
            label="Eu li e concordo com os Termos de Consentimento e Política de Privacidade."
          />

          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <Button
              variant="contained"
              color="warning"
              disabled={!checked}
              onClick={handleAccept}
            >
              Prosseguir
            </Button>
            <Button variant="outlined" color="warning" onClick={handleCancel}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
