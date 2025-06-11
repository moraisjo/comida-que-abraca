import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Campaign } from "../../../data/model/campaign";
import { useCampaignService } from "../hooks/useCampaingService";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const CARDS_POR_PAGINA = 3;

const ListCampaing: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { getActiveCampaigns } = useCampaignService();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const activeCampaigns = await getActiveCampaigns();
      setCampaigns(activeCampaigns);
    };

    fetchCampaigns();
  }, []);

  const startIndex = (currentPage - 1) * CARDS_POR_PAGINA;
  const endIndex = startIndex + CARDS_POR_PAGINA;
  const paginatedCampaigns = campaigns.slice(startIndex, endIndex);
  const totalPages = Math.ceil(campaigns.length / CARDS_POR_PAGINA);

  return (
    <div style={{ padding: "20px" }}>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {paginatedCampaigns.map((campaign) => (
          <Card
            key={campaign.id}
            sx={{
              width: 350,
              height: 350,
              margin: 2,
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "16px",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <CardMedia
              component="img"
              image={campaign.photoUrl}
              alt={campaign.name}
              sx={{
                width: "100%",
                height: 150,
                objectFit: "cover",
                borderRadius: 2,
                marginBottom: "16px",
              }}
            />

            <CardContent
              sx={{
                flexGrow: 1,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  fontFamily: "fontFamily",
                }}
              >
                {campaign.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "fontFamily" }}
              >
                {new Date(campaign.startDate).toLocaleDateString()} -{" "}
                {new Date(campaign.endDate).toLocaleDateString()}
              </Typography>
            </CardContent>

            <CardActions
              sx={{ justifyContent: "center", width: "100%", paddingTop: 2 }}
            >
              <Button
                sx={{
                  backgroundColor: "#ff5722",
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  "&:hover": { backgroundColor: "#e64a19" },
                  fontFamily: "fontFamily",
                }}
                onClick={() => navigate(`/parceiro/campanhas/${campaign.id}`)}
                startIcon={<InfoOutlinedIcon />}
              >
                Saiba mais
              </Button>
            </CardActions>
          </Card>
        ))}
      </section>

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          color="primary"
          size="large"
          sx={{ display: "flex", justifyContent: "center" }}
        />
      )}
    </div>
  );
};

export default ListCampaing;
