import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import colors from '../../../shared/theme/colors';
import { useAuth } from '../../../context/AuthContext';
import BackendResponseModal from '../../../shared/components/Modal/BackendResponseModal';
import useDonationService from '../hooks/useDonationService';
import { CreateDonationResponse} from '../../../data/model/donation';
import { campaignRepository } from '../../../data/repository/campaing';
import { Campaign } from '../../../data/model/campaign';

interface DonationCreateProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const DonationCreate: React.FC<DonationCreateProps> = ({ open, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [arrivingDate, setArrivingDate] = useState(new Date().toISOString().split('T')[0]);
  const [delivery, setDelivery] = useState<'PICKUP' | 'DELIVERY'>('PICKUP');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [campaignId, setCampaignId] = useState<number | null>(null);
  const { decodedUser } = useAuth();
  const { createDonation } = useDonationService();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isDisabled = !name || !arrivingDate || !photoUrl || !campaignId;

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (open) {
        try {
          console.log('Buscando campanhas ativas...');
          const activeCampaigns = await campaignRepository.getActiveCampaigns();
          setCampaigns(activeCampaigns);
        } catch (error) {
          console.error("Erro ao buscar campanhas ativas:", error);
          setCampaigns([]);
        }
      }
    };
    fetchCampaigns();
  }, [open]);

  const handleSubmit = async () => {
    if (!name || !arrivingDate || !photoUrl || !campaignId) {
      setResponseMessage('Preencha todos os campos obrigatórios.');
      setIsSuccess(false);
      setModalOpen(true);
      return;
    }

    if (!decodedUser?.userId) {
      setResponseMessage('Usuário não autenticado.');
      setIsSuccess(false);
      setModalOpen(true);
      return;
    }

    const userId = Number(decodedUser.userId);

    const donationData: CreateDonationResponse = {
      name,
      arriving_date: arrivingDate,
      delivery,
      photo_url: photoUrl,
      campaign_id: campaignId,
      status: 'PENDING',
      donor_id: userId,
    };

    try {
      console.log(donationData);
      const response = await createDonation(donationData);
      console.log(donationData);

      setResponseMessage(response.message || 'Erro ao processar resposta.');
      setIsSuccess(response.statusCode === 200);

      setTimeout(() => setModalOpen(true), 0);

      if (response.statusCode === 200) {
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          }
        }, 0);
      }
    } catch {
      setResponseMessage('Ocorreu um erro ao criar a doação.');
      setIsSuccess(false);
      setTimeout(() => setModalOpen(true), 0);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Cadastrar Nova Doação</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Nome da doação *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {},
              }}
            />

            <TextField
              fullWidth
              label="Data da postagem *"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={arrivingDate}
              onChange={(e) => setArrivingDate(e.target.value)}
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {},
              }}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel>Tipo de entrega *</InputLabel>
              <Select
                value={delivery}
                label="Tipo de entrega *"
                onChange={(e) => setDelivery(e.target.value as 'PICKUP' | 'DELIVERY')}
              >
                <MenuItem value="PICKUP">Retirada</MenuItem>
                <MenuItem value="DELIVERY">Entrega</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="URL da foto *"
              value={photoUrl || ''}
              onChange={(e) => setPhotoUrl(e.target.value)}
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {},
              }}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel>Campanha *</InputLabel>
              <Select
                value={campaignId || ''}
                label="Campanha *"
                onChange={(e) => setCampaignId(Number(e.target.value))}
              >
                {campaigns.map((campaign) => (
                  <MenuItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginTop: '15px',
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.primary,
                color: colors.white,
                fontSize: '12px',
                textTransform: 'none',
                width: '100%',
                height: '40px',
              }}
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Salvar
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderColor: colors.primary,
                color: colors.primary,
                fontSize: '12px',
                textTransform: 'none',
                width: '100%',
                height: '40px',
                '&:hover': {
                  backgroundColor: 'transparent',
                  borderColor: colors.primary,
                },
              }}
            >
              Cancelar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <BackendResponseModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          if (isSuccess) onClose();
        }}
        message={responseMessage}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default DonationCreate;
