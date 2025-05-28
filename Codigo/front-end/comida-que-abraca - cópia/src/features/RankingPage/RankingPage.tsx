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
      <HeaderMenu/>
      <Box
        sx={{
          width: '80vw', // ou o tamanho que preferir
          margin: '20px auto', // margin top e bottom de 20px e auto para os lados
          backgroundColor: colors.white,
        }}
      >
        <Typography color={colors.purple} align='center' fontSize='30px'>Ranking de doadores</Typography>
        <Divider sx={{ borderWidth: 1.6, marginBottom: 2}} />
        <DonatorsList/>
      </Box>
    </>
  );
};

export default RankingPage;