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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Menu, MenuItem } from "@mui/material";
import colors from "../../../../shared/theme/colors";
import { useCampaignService } from "../../hooks/UseCampaingsService";
import { Campaign } from "../../../../data/model/campaign";
interface CampaignListProps {
  onCreate: () => void;
}

const CampaignList: React.FC<CampaignListProps> = ({ onCreate }) => {
  const { getActiveCampaigns, getInactiveCampaigns } = useCampaignService();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<"ACTIVE" | "FINISHED">(
    "ACTIVE"
  );

  const theme = useTheme();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response =
          statusFilter === "ACTIVE"
            ? await getActiveCampaigns()
            : await getInactiveCampaigns();
        setCampaigns(response);
      } catch (error) {
        console.error("Erro ao carregar campanhas:", error);
      }
    };

    fetchCampaigns();
  }, [statusFilter]);

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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6" color={theme.palette.primary.main}>
          Campanhas {statusFilter === "ACTIVE" ? "Ativas" : "Inativas"}
        </Typography>

        <IconButton onClick={(e) => setFilterAnchorEl(e.currentTarget)}>
          <FilterAltIcon />
        </IconButton>
      </Box>

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

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField
          label="Buscar..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={() => setFilterAnchorEl(null)}
        >
          <MenuItem
            onClick={() => {
              setStatusFilter("ACTIVE");
              setFilterAnchorEl(null);
            }}
            selected={statusFilter === "ACTIVE"}
          >
            Ativas
          </MenuItem>
          <MenuItem
            onClick={() => {
              setStatusFilter("FINISHED");
              setFilterAnchorEl(null);
            }}
            selected={statusFilter === "FINISHED"}
          >
            Inativas
          </MenuItem>
        </Menu>
      </Box>

      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}
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
              image={campaign.photoUrl || ""}
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
