import { Box, Typography, Stack } from "@mui/material";
import { Heart, Users, Globe, Star, Activity } from "react-feather";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ComidaQueAbraca from "../../../assets/image-be-a-partner.png";
import ComidaQueAcolhe from "../../../assets/image-campaigns.png";
import ComoFazemos from "../../../assets/ComoFazemos.jpg";
import ComoPensamos from "../../../assets/ComoPensamos.jpeg";
import PorqueFazemos from "../../../assets/PorqueFazemos.jpeg";
import "swiper/css";
import "swiper/css/navigation";

const data = [
  {
    icon: <Heart size={24} color="#fff" />,
    title: "O que é o Projeto Comida Que Abraça?",
    text: `Somos mais do que um projeto, somos um abraço acolhedor em forma de ação. 
      Nossa missão é devolver dignidade e esperança a pessoas em situação de vulnerabilidade, respeitando suas histórias, talentos e sonhos. `,
    background: ComidaQueAbraca,
  },
  {
    icon: <Users size={24} color="#fff" />,
    title: "Comida que abraça, acolhe e dá esperança",
    text: `Acreditamos que cada gesto de solidariedade tem o poder de mudar destinos. 
      Atuamos diariamente no apoio a famílias carentes, oferecendo alimento, escuta, orientação e cuidado. 
      Você também pode fazer parte dessa corrente de transformação.`,
    background: ComidaQueAcolhe,
  },
  {
    icon: <Globe size={24} color="#fff" />,
    title: "Como pensamos e no que acreditamos",
    text: `Acreditamos em um mundo onde todos tenham as mesmas oportunidades. 
      Defendemos a liberdade, a igualdade e a fraternidade como pilares para uma sociedade mais justa e humana. 
      Valorizamos o ser humano em sua totalidade e trabalhamos com transparência e responsabilidade.`,
    background: ComoPensamos,
  },
  {
    icon: <Star size={24} color="#fff" />,
    title: "Por que fazemos tudo isso?",
    text: `Porque sabemos que ninguém vence sozinho. 
      Lutamos contra a fome, a pobreza e a exclusão social, acreditando no poder da coletividade e na força dos sonhos. 
      Cada vida transformada é um passo a mais na construção de um futuro mais justo e inclusivo.`,
    background: PorqueFazemos,
  },
  {
    icon: <Activity size={24} color="#fff" />,
    title: "Como fazemos o que fazemos?",
    text: `Oferecemos não apenas alimento, mas também oportunidades de desenvolvimento humano e emocional. 
      Nossas ações são planejadas com ética, responsabilidade e criatividade, estimulando o autoconhecimento, a autoestima e a realização de sonhos.`,
    background: ComoFazemos,
  },
];

export default function PaginatedCards() {
  return (
    <Box
      sx={{
        p: 6,
        pb: 2,
        position: "relative",
        "& .swiper-button-next, & .swiper-button-prev": {
          color: "#F46A02",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        },
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={2}
        color="#333"
        sx={{ fontFamily: "fontFamily" }}
      >
        Valores e Ações do Comida Que Abraça
      </Typography>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={3}
        style={{ padding: "20px 0" }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: "relative",
                height: 250,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 3,
                backgroundImage: `url(${item.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                  textAlign: "center",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  mb={1}
                  sx={{ fontFamily: "fontFamily" }}
                >
                  {item.icon}
                  <Typography
                    fontWeight="bold"
                    variant="subtitle1"
                    sx={{ fontFamily: "fontFamily" }}
                  >
                    {item.title}
                  </Typography>
                </Stack>
                <Typography>{item.text}</Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
