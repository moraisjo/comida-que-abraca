import { Box, Button, Paper, Typography } from "@mui/material";
import colors from "../../../shared/theme/colors";
import { useState } from "react";
import DonatorDetailModal from "./DonatorDetailModal";
import { DonationResponse } from "../../../data/model/donation";

// Definindo as props
interface DonatorItemProps {
  ranking: number;
  donorName: string;
  donationsCount: number;
  donations: DonationResponse[];
}

const DonatorItem: React.FC<DonatorItemProps> = ({
  ranking,
  donorName,
  donationsCount,
  donations,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  const getLatestDonations = (donations: DonationResponse[], donorName: string) => {
    // Filtra apenas as doações do doador especificado
    const donationsByDonor = donations.filter(
      donation => donation.donor.name === donorName
    );
    
    // Ordena as doações pela data de chegada (arriving_date) de forma decrescente (mais recentes primeiro)
    donationsByDonor.sort(
      (a, b) => new Date(b.arrivingDate).getTime() - new Date(a.arrivingDate).getTime()
    );
    
    // Retorna as 10 primeiras doações, ou menos se não houver 10
    return donationsByDonor.slice(0, 10);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Sempre em linha
          justifyContent: "space-between",
          alignItems: "center",
          width: { xs: "100%", md: "50%" }, // Em mobile usa 100% da largura, em desktop 50%
          marginBottom: "20px",
        }}
      >
        <Paper
          sx={{
            borderRadius: "50%",
            width: { xs: "40px", sm: "60px" }, // Dimensões responsivas
            height: { xs: "40px", sm: "60px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.lilac,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {ranking}
        </Paper>
        <Box
          sx={{
            background: colors.white,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1, // Faz o Box ocupar o espaço disponível sem distorcer
            mx: 1, // Margin horizontal para dar espaçamento
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
          onClick={handleOpenModal}
          sx={{
            borderRadius: "30px", // Torna o Paper redondo
            width: "100px", // Largura do círculo
            height: "50px", // Altura do círculo (mesmo valor de largura)
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white", // Texto branco
            backgroundColor: colors.purple, // Adiciona cor de fundo
            textTransform: "none", // Desativa as letras maiúsculas
          }}
        >
          Ver
        </Button>
      </Box>

      {/* Modal sendo incluído aqui no mesmo nível do Box */}
      <DonatorDetailModal
        open={modalOpen}
        handleCloseModal={handleCloseModal}
        donorName={donorName}
        latestDonations={getLatestDonations(donations, donorName)}
      />
    </>
  );
};

export default DonatorItem;
