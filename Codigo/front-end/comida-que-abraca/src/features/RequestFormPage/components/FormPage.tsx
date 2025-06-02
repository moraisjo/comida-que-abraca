import { useState, useEffect } from "react";
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
import BackendResponseModal from "../../../shared/components/Modal/BackendResponseModal";

function FormPage({ open, handleClose }) {
  const { decodedUser } = useAuth();
  const userId = decodedUser?.userId ? Number(decodedUser.userId) : null;

  const [tipoItem, setTipoItem] = useState("");
  const [motivacao, setMotivacao] = useState("");

  const { createRequest, loading, error, message } = useRequestPartner();

  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const handleSubmit = async () => {
    if (!tipoItem || !motivacao) {
      setResponseMessage("Todos os campos precisam ser preenchidos!");
      setIsSuccess(false);
      setShowResponseModal(true);
      return;
    }

    if (!userId) {
      setResponseMessage("Erro: ID do usuário não encontrado!");
      setIsSuccess(false);
      setShowResponseModal(true);
      return;
    }

    await createRequest(userId, {
      itemType: tipoItem,
      description: motivacao,
    });
  };

  useEffect(() => {
    if (message) {
      setResponseMessage(message);
      setIsSuccess(true);
      setShowResponseModal(true);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      setResponseMessage(error);
      setIsSuccess(false);
      setShowResponseModal(true);
    }
  }, [error]);

  const handleCloseModal = () => {
    setShowResponseModal(false);
    if (isSuccess) {
      handleClose();
      setTipoItem("");
      setMotivacao("");
    }
  };

  return (
    <>
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
              vai receber a doação. Você ficará no nosso banco de dados e, caso
              a doação esteja disponível, nós entraremos em contato.
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

      <BackendResponseModal
        open={showResponseModal}
        onClose={handleCloseModal}
        message={responseMessage}
        isSuccess={isSuccess}
      />
    </>
  );
}

export default FormPage;
