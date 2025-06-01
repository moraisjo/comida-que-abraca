import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useRequestPartner } from "../hooks/useRequestPartner";
import { useAuth } from "../../../context/AuthContext";

interface FormPageProps {
  open: boolean;
  handleClose: () => void;
  userId: number;
}

function FormPage({ open, handleClose }) {
  const { decodedUser } = useAuth();
  const userId = decodedUser?.userId ? Number(decodedUser.userId) : null;

  const [tipoItem, setTipoItem] = useState("");
  const [motivacao, setMotivacao] = useState("");

  const { createRequest, loading, error, message } = useRequestPartner();

  const handleSubmit = async () => {
    if (!tipoItem || !motivacao) {
      alert("Todos os campos precisam ser preenchidos!");
      return;
    }

    if (!userId) {
      alert("Erro: ID do usuário não encontrado!");
      return;
    }

    try {
      await createRequest(userId, {
        itemType: tipoItem,
        description: motivacao,
      });
    } catch (err) {
      alert("Erro ao registrar interesse. Tente novamente.");
    }
  };

  useEffect(() => {
    if (message) {
      alert(message);
      handleClose();
    }
  }, [message]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Manifestar Interesse</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="tipo-item-label">Tipo de Item</InputLabel>
          <Select
            labelId="tipo-item-label"
            value={tipoItem}
            onChange={(e) => setTipoItem(e.target.value)}
          >
            <MenuItem value="Alimento">Alimento</MenuItem>
            <MenuItem value="Roupas">Roupas</MenuItem>
            <MenuItem value="Produtos de Higiene Pessoal">
              Produtos de Higiene
            </MenuItem>
            <MenuItem value="Móveis">Móveis</MenuItem>
            <MenuItem value="Outros">Outros</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Motivação"
          rows={3}
          value={motivacao}
          onChange={(e) => setMotivacao(e.target.value)}
          multiline
          fullWidth
          margin="normal"
        />

        <Typography variant="body2" sx={{ color: "#F46A02" }}>
          <strong>
            Observação: a manifestação de interesse não é garantia de que você
            vai receber a doação. Você ficará no nosso banco de dados e, caso a
            doação esteja disponível, nós entraremos em contato.
          </strong>
        </Typography>
      </DialogContent>

      <DialogActions sx={{ gap: 1 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
        <Button variant="outlined" onClick={handleClose} fullWidth>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormPage;
