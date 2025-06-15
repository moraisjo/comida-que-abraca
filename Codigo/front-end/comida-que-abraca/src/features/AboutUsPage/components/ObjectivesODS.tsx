import { Box, Typography, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const odsData = [
  {
    numero: "2",
    titulo: "Fome Zero e Agricultura Sustentável",
    descricao:
      "Acabar com a fome, alcançar a segurança alimentar e promover a agricultura sustentável.",
    link: "https://brasil.un.org/pt-br/sdgs/2",
  },
  {
    numero: "10",
    titulo: "Redução das Desigualdades",
    descricao: "Reduzir a desigualdade dentro dos países e entre eles.",
    link: "https://brasil.un.org/pt-br/sdgs/10",
  },
  {
    numero: "12",
    titulo: "Consumo e Produção Responsáveis",
    descricao: "Assegurar padrões de produção e de consumo sustentáveis.",
    link: "https://brasil.un.org/pt-br/sdgs/12",
  },
  {
    numero: "17",
    titulo: "Parcerias e Meios de Implementação",
    descricao:
      "Revitalizar a parceria global para o desenvolvimento sustentável.",
    link: "https://brasil.un.org/pt-br/sdgs/17",
  },
];

export default function ObjectivesODS() {
  return (
    <Box
      sx={{
        p: 6,
        pb: 10,
        position: "relative",
        "& .swiper-button-next, & .swiper-button-prev": {
          color: "#fff",
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
        Objetivos de Desenvolvimento Sustentável
      </Typography>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={30}
        slidesPerView={3}
        style={{ padding: "20px 0" }}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
        }}
      >
        {odsData.map((ods, index) => (
          <SwiperSlide key={index}>
            <a
              href={ods.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  backgroundColor: "#F2821A",
                  color: "#fff",
                  borderRadius: 3,
                  height: 250,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  mb={1}
                  sx={{ fontFamily: "fontFamily" }}
                >
                  Objetivo {ods.numero}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mb={1}
                  sx={{ fontFamily: "fontFamily" }}
                >
                  {ods.titulo}
                </Typography>
                <Typography sx={{ fontFamily: "fontFamily" }}>
                  {ods.descricao}
                </Typography>
              </Paper>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
