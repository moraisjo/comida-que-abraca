import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CardMedia,
  Box,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import colors from "../../../../../shared/theme/colors";
import { useCampaignService } from "../../../hooks/UseCampaingsService";
import { Campaign } from "../../../../../data/model/campaign";
import CampaignDetailModal from "../../../../../shared/components/Modal/CampaignDetailsModal";

interface CampaignListProps {
  onCreate: () => void;
}

const CampaignList: React.FC<CampaignListProps> = ({ onCreate }) => {
  const { getActiveCampaigns } = useCampaignService();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getActiveCampaigns();
        setCampaigns(response.content);
      } catch (error) {
        console.error("Erro ao carregar campanhas:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleOpenModal = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCampaign(null);
  };

  return (
    <Box padding={2}>
      <Button
        variant="contained"
        fullWidth
        onClick={onCreate}
        sx={{
          marginBottom: 2,
          marginTop: 5,
          backgroundColor: colors.primary,
          color: colors.white,
          borderRadius: 5,
        }}
      >
        Cadastre uma nova campanha
      </Button>

      <Typography variant="h6" gutterBottom color={theme.palette.primary.main}>
        Campanhas Ativas
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {campaigns.map((campaign) => (
          <Box
            key={campaign.id}
            sx={{
              flexBasis: {
                xs: "100%",
                sm: "calc(50% - 12px)",
                md: "calc(33.333% - 16px)",
              },
              display: "flex",
            }}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={campaign.photoUrl}
                alt="Imagem da campanha"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {campaign.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(campaign.startDate).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  a{" "}
                  {new Date(campaign.endDate).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ marginLeft: "auto" }}>
                  <IconButton onClick={() => handleOpenModal(campaign)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>

      {selectedCampaign && (
        <CampaignDetailModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          selectedCampaign={selectedCampaign}
        />
      )}
    </Box>
  );
};

export default CampaignList;
