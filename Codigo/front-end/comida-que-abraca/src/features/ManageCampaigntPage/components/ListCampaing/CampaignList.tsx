import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CardMedia,
  Box,
  Button,
  TextField,
  useTheme,
  Collapse,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Menu, MenuItem } from "@mui/material";
import colors from "../../../../shared/theme/colors";
import { EditCampaignRequest } from "../../../../data/model/campaign";
import { useCampaignService } from "../../hooks/UseCampaingsService";
import { CampaignService } from "../../hooks/UseCampaingsService";
import { Campaign } from "../../../../data/model/campaign";
import EditCampaignModal from "../EditCampaing/CampaingEdit";
import CampaignDelete from "../DeleteCampaing/CampaignDelete";

interface CampaignListProps {
  onCreate: () => void;
}

const CampaignList: React.FC<CampaignListProps> = ({ onCreate }) => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignAddress, setCampaignAddress] = useState("");
  const [campaignStartDate, setCampaignStartDate] = useState("");
  const [campaignEndDate, setCampaignEndDate] = useState("");
  const [campaignPhotoUrl, setCampaignPhotoUrl] = useState("");

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(
    null
  );

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

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

  const handleOpenModalDelete = (id: number) => {
    setSelectedCampaignId(id);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
    setSelectedCampaignId(null);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    setSelectedCampaignId(null);
  };

  const handleOpenModalEdit = (id: number) => {
    const selected = campaigns.find((c) => c.id === id);
    if (selected) {
      setSelectedCampaignId(id);
      setCampaignName(selected.name);
      setCampaignDescription(selected.description);
      setCampaignAddress(selected.address);
      setCampaignStartDate(selected.startDate);
      setCampaignEndDate(selected.endDate);
      setCampaignPhotoUrl(selected.photoUrl);
      setOpenModalEdit(true);
    }
  };

  const handleEditCampaign = async () => {
    if (selectedCampaignId) {
      const updatedCampaign: EditCampaignRequest = {
        name: campaignName,
        description: campaignDescription,
        address: campaignAddress,
        startDate: campaignStartDate,
        endDate: campaignEndDate,
        photoUrl: campaignPhotoUrl,
      };

      try {
        await CampaignService.editCampaign(selectedCampaignId, updatedCampaign);
        setFeedbackMessage(`Campanha ${campaignName} alterada com sucesso!`);
        setFeedbackOpen(true);
        setOpenModalEdit(false);

        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === selectedCampaignId ? { ...c, ...updatedCampaign } : c
          )
        );
      } catch (error: any) {
        console.error(error);
        setFeedbackMessage(
          "Erro ao salvar a campanha: " + (error?.message || "")
        );
        setFeedbackOpen(true);
      }
    }
  };

  const handleCancelCampaign = async () => {
    if (selectedCampaignId) {
      try {
        await CampaignService.cancelCampaign(selectedCampaignId);
        setFeedbackMessage(`Campanha deletada com sucesso!`);
        setFeedbackOpen(true);
        setOpenModalDelete(false);
      } catch (error) {
        setFeedbackMessage(
          "Erro ao deletar a campanha: " + (error?.message || "")
        );
      }
    }
  };

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
          <Card
            key={campaign.id}
            sx={{
              maxWidth: 345,
              opacity: statusFilter === "FINISHED" ? 0.6 : 1,
              backgroundColor: statusFilter === "FINISHED" ? "#f0f0f0" : "#fff",
              pointerEvents: statusFilter === "FINISHED" ? "none" : "auto",
            }}
          >
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
                <IconButton onClick={() => handleOpenModalEdit(campaign.id)}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  aria-label="excluir"
                  onClick={() => handleOpenModalDelete(campaign.id)}
                >
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
      <Dialog
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        PaperProps={{
          style: {
            borderRadius: "20px",
            padding: "20px",
            width: "350px",
            maxWidth: "90vw",
          },
        }}
      >
        <DialogContent sx={{ textAlign: "center", padding: 2 }}>
          <Typography>
            <strong>{feedbackMessage}</strong>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setFeedbackOpen(false)}
            sx={{
              borderRadius: "20px",
              backgroundColor: "primary.main",
              color: "#fff",
              width: "100%",
              fontSize: "14px",
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <CampaignDelete
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onDelete={handleCancelCampaign}
      />

      <EditCampaignModal
        open={openModalEdit}
        onClose={handleCloseModalEdit}
        onSave={handleEditCampaign}
        name={campaignName}
        setName={setCampaignName}
        description={campaignDescription}
        setDescription={setCampaignDescription}
        address={campaignAddress}
        setAddress={setCampaignAddress}
        startDate={campaignStartDate}
        setStartDate={setCampaignStartDate}
        endDate={campaignEndDate}
        setEndDate={setCampaignEndDate}
        photoUrl={campaignPhotoUrl}
        setPhotoUrl={setCampaignPhotoUrl}
      />
    </Box>
  );
};

export default CampaignList;
