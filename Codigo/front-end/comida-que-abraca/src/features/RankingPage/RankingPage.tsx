import React from "react";
import HeaderMenu from "../../shared/components/HeaderMenu";
import colors from "../../shared/theme/colors";
import {
  Box,
  Divider,
  Typography,
} from "@mui/material";
import DonatorsList from "./components/DonatorsList";

const RankingPage: React.FC = () => {
  return (
    <>
      {/* CssBaseline para aplicar estilos globais */}
      <HeaderMenu title={"Comida Que Abraça"} />
      <Box
        sx={{
          width: '100vh',
          height: '100vh',
          padding: "20px",
          margin: "20px",
          backgroundColor: colors.background,
        }}
      >
        <Typography color={colors.secondary} fontSize='30px'>Ranking de doadores</Typography>
        <Divider sx={{ borderWidth: 1.8, marginBottom: 2}} />
        <DonatorsList/>
      </Box>
    </>
  );
};

export default RankingPage;
