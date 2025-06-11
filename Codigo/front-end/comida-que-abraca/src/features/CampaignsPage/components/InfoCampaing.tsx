import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Box, Paper } from "@mui/material";
import { useCampaignService } from "../hooks/useCampaingService";
import HeaderMenu from "../../../shared/components/HeaderMenu";
import BannerInfo from "./BannerInfo";
import Footer from "../../../shared/components/Footer/Footer";
import colors from "../../../shared/theme/colors";
import { useAuth } from "../../../context/AuthContext";

interface Campaign {
  id: number;
  name: string;
  description: string;
  address: string;
  photoUrl: string;
}

const InfoCampaign: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCampaignById } = useCampaignService();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const navigate = useNavigate();

  const { decodedUser } = useAuth();
  const userId = decodedUser?.userId ? Number(decodedUser.userId) : null;

  useEffect(() => {
    const fetchCampaign = async () => {
      if (id) {
        const numericId = Number(id);
        if (!isNaN(numericId)) {
          const data = await getCampaignById(numericId);
          setCampaign(data);
        } else {
          console.error("ID inválido");
        }
      }
    };

    fetchCampaign();
  }, [id, getCampaignById]);

  const handleDonateClick = () => {
    if (userId) {
      navigate(`/parceiro/doar`);
    } else {
      navigate(`/login`);
    }
  };

  if (!campaign) {
    return <Typography>Carregando informações da campanha...</Typography>;
  }

  return (
    <>
      <HeaderMenu />
      <BannerInfo />
      <Box sx={{ pb: 14 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, px: 2 }}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              padding: 4,
              borderRadius: 3,
              maxWidth: 1100,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box flex={1}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: colors.primary }}
              >
                {campaign.name}
              </Typography>

              <Typography variant="body1" sx={{ marginBottom: 3 }}>
                {campaign.description}
              </Typography>

              <Button
                variant="contained"
                color="error"
                size="large"
                onClick={handleDonateClick}
                sx={{
                  background: colors.primary,
                }}
              >
                Abrace a causa
              </Button>
            </Box>

            <Box
              component="img"
              src={campaign.photoUrl}
              alt={campaign.name}
              sx={{
                width: { xs: "100%", md: 400 },
                height: "auto",
                borderRadius: 2,
                boxShadow: 2,
              }}
            />
          </Paper>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default InfoCampaign;
