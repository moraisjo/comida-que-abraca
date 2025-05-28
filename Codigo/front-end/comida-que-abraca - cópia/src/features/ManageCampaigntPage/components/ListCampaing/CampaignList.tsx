import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CardMedia,
  Box,
  TextField,
  useTheme,
  Collapse,
  CardHeader,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import colors from "../../../../shared/theme/colors";
import { useCampaignService } from "../../hooks/UseCampaingsService";
import { Campaign } from "../../../../data/model/campaign";
interface CampaignListProps {
  onCreate: () => void;
}

const CampaignList: React.FC<CampaignListProps> = ({ onCreate }) => {
  const { getActiveCampaigns } = useCampaignService();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});
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

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id: number) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <Box padding={2}>
      <Typography variant="h6" gutterBottom color={theme.palette.primary.main}>
        Campanhas Ativas
      </Typography>

      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={onCreate}
          sx={{
            backgroundColor: colors.primary,
            color: colors.white,
            borderRadius: "50%",
            width: 56,
            height: 56,
            boxShadow: 3,
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <TextField
        label="Buscar..."
        variant="outlined"
        size="small"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
        }}
      >
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} sx={{ maxWidth: 345 }}>
            <CardHeader
              title={campaign.name}
              subheader={`${new Date(campaign.startDate).toLocaleDateString(
                "pt-BR"
              )} - ${new Date(campaign.endDate).toLocaleDateString("pt-BR")}`}
            />
            <CardMedia
              component="img"
              height="194"
              image={
                campaign.photoUrl || "/static/images/cards/placeholder.jpg"
              }
              alt="Imagem da campanha"
            />
            <CardActions
              disableSpacing
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <IconButton aria-label="editar">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="excluir">
                  <DeleteIcon />
                </IconButton>
              </Box>

              <IconButton
                onClick={() => toggleExpand(campaign.id)}
                aria-expanded={expandedCards[campaign.id]}
                aria-label="mostrar mais"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>

            <Collapse
              in={expandedCards[campaign.id]}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {campaign.description}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CampaignList;
