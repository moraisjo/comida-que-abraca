import HeaderMenu from "../../shared/components/HeaderMenu";
import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import imageCampaigns from "../../assets/image-campaigns.png";
import imageFoodDonation from "../../assets/image-food-donation3.png";
import imageBeAPartner from "../../assets/image-be-a-partner.png";
import imageReports from "../../assets/image-reports2.png";

const cards = [
  {
    title: "Campanhas",
    description:
      "Veja as campanhas ativas e saiba como ajudar.",
    image: imageCampaigns,
    buttonText: "Ver campanhas",
    buttonAction: "/campanhas",
  },
  {
    title: "Doações",
    description:
      "Faça sua doação e ajude a preparar marmitas para pessoas em situação de rua.",
    image: imageFoodDonation,
    buttonText: "Quero doar",
    buttonAction: "/doacoes",
  },
  {
    title: "Seja Parceiro",
    description:
      "Cadastre-se como parceiro e faça parte dessa corrente do bem.",
    image: imageBeAPartner,
    buttonText: "Cadastro de Parceiros",
    buttonAction: "/cadastro",
  },
  {
    title: "Relatórios",
    description:
      "Saiba mais sobre as nossas ações com números: veja os relatórios de doações e campanhas!",
    image: imageReports,
    buttonText: "Ver relatórios",
    buttonAction: "/relatorios",
  },
];

const OngHomepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderMenu />
      <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, px: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            mt: 4,
          }}
        >
          {cards.map((card) => (
            <Card key={card.title} sx={{ width: 350, boxShadow: 3 }}>
              <CardMedia
                component="img"
                alt={card.title}
                height="140"
                image={card.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => navigate(card.buttonAction)}
                >
                  {card.buttonText}
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Juntos, já entregamos milhares de marmitas para pessoas em situação de rua. Sua ajuda faz a diferença!
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default OngHomepage;