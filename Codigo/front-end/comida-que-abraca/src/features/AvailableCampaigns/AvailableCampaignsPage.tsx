import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Button, Box } from "@mui/material";
import axios from "axios";
import HeaderMenu from "../../shared/components/HeaderMenu";

interface Campaign {
  id: number;
  name: string;
  description: string;
  address: string;
  startDate: string;
  endDate: string;
  photoUrl: string;
  status: string;
}

export default function AvailableCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/campaign/active-campaigns")
      .then((response) => {
        setCampaigns(response.data.content); 
      })
      .catch((error) => {
        console.error("Erro ao buscar campanhas:", error);
      });
  }, []);

  return (
    <><HeaderMenu /><Container>
          <Typography variant="h4" align="center" gutterBottom>
              Campanhas Disponíveis
          </Typography>

          {Array.isArray(campaigns) && campaigns.map((campaign) => (
              <Card key={campaign.id || campaign.name} sx={{ marginBottom: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography variant="h6" gutterBottom>
                              {campaign.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" gutterBottom>
                              {campaign.description}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                              Início: {campaign.startDate} | Fim: {campaign.endDate}
                          </Typography>
                          <Button
                              variant="contained"
                              color="error"
                              size="small"
                              sx={{ marginTop: 1 }}
                          >
                              Excluir
                          </Button>
                      </CardContent>

                      {campaign.photoUrl && campaign.photoUrl !== "Nenhuma foto selecionada" && (
                          <Box
                              component="img"
                              src={campaign.photoUrl}
                              alt={campaign.name}
                              sx={{
                                  width: 150,
                                  height: 150,
                                  objectFit: "cover",
                                  borderRadius: 2,
                                  marginRight: 2
                              }} />
                      )}
                  </Box>
              </Card>
          ))}
      </Container></>
  );
}