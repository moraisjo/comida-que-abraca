import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import imageCampaigns from "../../../assets/image-campaigns.png";
import imageBeAPartner from "../../../assets/image-be-a-partner.png";
import imageReports from "../../../assets/image-reports2.png";
import { useNavigate } from "react-router-dom";

const cardList = [
  {
    title: "Seja um Parceiro",
    description:
      " Cadastre-se como parceiro e faça parte dessa corrente do bem, levando alimento e esperança a quem mais precisa.",
    buttonDescription: "Quero ser parceiro",
    image: imageBeAPartner,
    link: "/cadastro",
  },
  {
    title: "Veja Como Ajudar",
    description:
      "Descubra as campanhas em andamento e escolha como deseja contribuir. Pequenos gestos fazem grande diferença na vida de quem precisa.",
    buttonDescription: "Ver campanhas",
    image: imageCampaigns,
    link: "/campanhas-disponiveis",
  },
  {
    title: "Nosso Propósito",
    description:
      "Conheça a história e os valores do projeto Comida que Abraça. Entenda como nossa missão impacta comunidades e como você pode se envolver.",
    buttonDescription: "Mais informações",
    image: imageReports,
    link: "/sobre",
  },
];

const Cards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "16px",
        padding: "20px",
      }}
    >
      {cardList.map((cards, index) => (
        <Card
          key={index}
          sx={{
            maxWidth: 345,
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
            image={cards.image}
            alt={cards.title}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "140px",
              borderRadius: 2,
              marginBottom: "16px",
              objectFit: "cover",
            }}
          />

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "8px",
                fontFamily: "fontFamily",
              }}
            >
              {cards.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "fontFamily" }}
            >
              {cards.description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
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
              onClick={() => navigate(cards.link)}
            >
              {cards.buttonDescription}
            </Button>
          </CardActions>
        </Card>
      ))}
    </section>
  );
};

export default Cards;
