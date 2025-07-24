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
import { useRequestPartner } from "../hooks/useRequestPartner";
import { useAuth } from "../../../context/AuthContext";
import BackendResponseModal from "../../../shared/components/Modal/BackendResponseModal";

type FormPageProps = {
  open: boolean;
  handleClose: () => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

function FormPage({ open, handleClose, setRefresh }: FormPageProps) {
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

    setRefresh((prev) => !prev);
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
              label="Tipo de Item"
            >
              <MenuItem value="Alimento Nao Pereciveis">
                Alimentos Não Perecíveis
              </MenuItem>
              <MenuItem value="Alimento Pereciveis">
                Alimentos Perecíveis
              </MenuItem>
              <MenuItem value="Cama, Mesa, Banho">Cama, Mesa e Banho</MenuItem>
              <MenuItem value="Moveis">Móveis</MenuItem>
              <MenuItem value="Itens de Higiene">Itens de Higiene</MenuItem>
              <MenuItem value="Roupas">Roupas</MenuItem>
              <MenuItem value="Eletrodomesticos">Eletrodomésticos</MenuItem>
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
            Observação: a manifestação de interesse não é garantia de que você
            vai receber a doação. Você ficará no nosso banco de dados e, caso a
            doação esteja disponível, nós entraremos em contato.
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            gap: 1,
            px: 3,
            pb: 3,
          }}
        >
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
