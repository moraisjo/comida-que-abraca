import { Box, Button, Paper, Typography } from "@mui/material";
import colors from "../../../shared/theme/colors";

// Definindo as props
interface DonatorItemProps {
  ranking: number;
  donorName: string;
  donationsCount: number;
}

const DonatorItem: React.FC<DonatorItemProps> = ({
  ranking,
  donorName,
  donationsCount,
}) => {
  return (
    <Box
      style={{
        display: "flex", // Alinha os itens em linha
        flexDirection: "row", // Organiza os itens verticalmente
        justifyContent: "space-between", // Espaça os itens igualmente
        alignItems: "center", // Alinha os itens verticalmente no centro da linha
        width: "50%",
        marginBottom: '20px'
      }}
    >
      <Paper
        sx={{
          borderRadius: "50%", // Torna o Paper redondo
          width: "60px", // Largura do círculo
          height: "60px", // Altura do círculo (mesmo valor de largura)
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.lilac, // Adiciona cor de fundo
        }}
      >
        {ranking}
      </Paper>
      <Box
        style={{
          background: colors.background,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Garante que os itens dentro do Box fiquem à esquerda
        }}
      >
        <Typography color={colors.darkGray} style={{ fontWeight: "bold" }}>
          {donorName}
        </Typography>
        <Typography color={colors.darkGray}>
          Doou {donationsCount} {donationsCount > 1 ? "vezes" : "vez"}
        </Typography>
      </Box>
      <Button
        sx={{
          borderRadius: "30px", // Torna o Paper redondo
          width: "100px", // Largura do círculo
          height: "50px", // Altura do círculo (mesmo valor de largura)
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white", // Texto branco
          backgroundColor: colors.secondary, // Adiciona cor de fundo
          textTransform: "none", // Desativa as letras maiúsculas
        }}
      >
        Ver
      </Button>
    </Box>
  );
};

export default DonatorItem;
