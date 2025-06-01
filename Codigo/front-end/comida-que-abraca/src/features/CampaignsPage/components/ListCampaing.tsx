import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import { Campaign } from "../../../data/model/campaign";
import { useCampaignService } from "../hooks/useCampaingService";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism"; // Ícone de contribuição

const ITEMS_PER_PAGE = 4;

const ListCampaign: React.FC = () => {
  const { getActiveCampaigns } = useCampaignService();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const activeCampaigns = await getActiveCampaigns();
      setCampaigns(activeCampaigns);
    };

    fetchCampaigns();
  }, []);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCampaigns = campaigns.slice(startIndex, endIndex);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
        {currentCampaigns.map((campaign) => (
          <Box key={campaign.id} width={{ xs: "100%", sm: "48%" }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 300,
                backgroundImage: `url(${campaign.photoUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <CardContent
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  textAlign: "center",
                  padding: 2,
                  borderRadius: 1,
                }}
              >
                <Typography variant="h5">{campaign.name}</Typography>
              </CardContent>

              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<VolunteerActivismIcon />}
                >
                  Contribua
                </Button>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" width="100%" mt={4}>
        <Pagination
          count={Math.ceil(campaigns.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ListCampaign;
