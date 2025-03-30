import React from "react";
import HeaderMenu from "../../shared/components/HeaderMenu";
import colors from "../../shared/theme/colors";
import { Box, Divider, Typography } from "@mui/material";

const RankingPage: React.FC = () => {
  return (
    <Box
      style={{
        background: colors.background,
        minHeight: "100vh", // Faz o Box ocupar toda a altura da tela
        minWidth: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderMenu title={"Comida Que Abraça"} />
      <Box
        style={{
          background: colors.background,
          width: "100%",
          flex: 1, // Faz este Box crescer para ocupar o espaço disponível
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color={colors.secondary}>Ranking de doadores</Typography>
        <Divider />
      </Box>
    </Box>
  );
};

export default RankingPage;
