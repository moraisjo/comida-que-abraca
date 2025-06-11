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
import imageProposito from "../../../assets/image-proposito.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const cardListDeslogado = [
  {
    title: "Seja nosso parceiro",
    description:
      " Cadastre-se como parceiro e faça parte dessa corrente do bem, levando alimento e esperança a quem mais precisa.",
    buttonDescription: "Quero ser parceiro",
    image: imageBeAPartner,
    link: "/parceiro/cadastro",
  },
  {
    title: "Conheça nossas campanhas",
    description:
      "Descubra as campanhas em andamento e escolha como deseja contribuir. Pequenos gestos fazem grande diferença na vida de quem precisa.",
    buttonDescription: "Ver campanhas",
    image: imageCampaigns,
    link: "/parceiro/campanhas",
  },
  {
    title: "Nosso propósito",
    description:
      "Conheça a história e os valores do projeto Comida que Abraça. Entenda como nossa missão impacta comunidades e como você pode se envolver.",
    buttonDescription: "Mais informações",
    image: imageProposito,
    link: "/sobre",
  },
  {
    title: "Relatórios",
    description:
      "Saiba mais sobre o impacto do projeto Comida que Abraça. Acompanhe nossos relatórios e veja como sua contribuição faz a diferença.",
    buttonDescription: "Mais informações",
    image: imageReports,
    link: "/ong/relatorios",
  }
];

const cardListParceiroLogado = [
  {
    title: "Conheça nossas campanhas",
    description:
      "Descubra as campanhas em andamento e escolha como deseja contribuir. Pequenos gestos fazem grande diferença na vida de quem precisa.",
    buttonDescription: "Ver campanhas",
    image: imageCampaigns,
    link: "/parceiro/campanhas",
  },
  {
    title: "Nosso propósito",
    description:
      "Conheça a história e os valores do projeto Comida que Abraça. Entenda como nossa missão impacta comunidades e como você pode se envolver.",
    buttonDescription: "Mais informações",
    image: imageProposito,
    link: "/sobre",
  },
  {
    title: "Relatórios",
    description:
      "Saiba mais sobre o impacto do projeto Comida que Abraça. Acompanhe nossos relatórios e veja como sua contribuição faz a diferença.",
    buttonDescription: "Mais informações",
    image: imageReports,
    link: "/ong/relatorios",
  }
];

const cardListONGLogada = [
  {
    title: "Conheça nossas campanhas",
    description:
      "Descubra as campanhas em andamento e escolha como deseja contribuir. Pequenos gestos fazem grande diferença na vida de quem precisa.",
    buttonDescription: "Ver campanhas",
    image: imageCampaigns,
    link: "/parceiro/campanhas",
  },
  {
    title: "Nosso propósito",
    description:
      "Conheça a história e os valores do projeto Comida que Abraça. Entenda como nossa missão impacta comunidades e como você pode se envolver.",
    buttonDescription: "Mais informações",
    image: imageProposito,
    link: "/sobre",
  },
  {
    title: "Relatórios",
    description:
      "Saiba mais sobre o impacto do projeto Comida que Abraça. Acompanhe nossos relatórios e veja como sua contribuição faz a diferença.",
    buttonDescription: "Mais informações",
    image: imageReports,
    link: "/ong/relatorios",
  }
];

const Cards: React.FC = () => {
  const navigate = useNavigate();
  const { decodedUser, token } = useAuth();

  {
    /* TROCAR PRO USER_TYPE!!!!!!!!!! ESSA FOI UMA SOLUÇÃO PALIATIVA */
  }
  let cardsRenderizados;

  if (!token) {
    cardsRenderizados = cardListDeslogado;
  } else if (decodedUser?.userRole === "COLLABORATOR") {
    cardsRenderizados = cardListONGLogada;
  } else {
    cardsRenderizados = cardListParceiroLogado;
  }

  return (
    <div style={{ marginBottom: "80px" }}>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {cardsRenderizados.map((cards, index) => (
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
    </div>
  );
};

export default Cards;
