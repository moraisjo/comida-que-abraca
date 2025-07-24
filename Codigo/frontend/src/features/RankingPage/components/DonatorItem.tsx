import { Box, Button, Paper, Typography } from "@mui/material";
import colors from "../../../shared/theme/colors";
import { useState } from "react";
import DonatorDetailModal from "./DonatorDetailModal";
import { DonationResponse } from "../../../data/model/donation";

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

  const getLatestDonations = (
    donations: DonationResponse[],
    donorName: string
  ) => {
    const donationsByDonor = donations.filter(
      (donation) => donation.donor.name === donorName
    );

    donationsByDonor.sort(
      (a, b) =>
        new Date(b.arrivingDate).getTime() - new Date(a.arrivingDate).getTime()
    );

    return donationsByDonor.slice(0, 10);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: { xs: "100%", md: "50%" },
          marginBottom: "20px",
        }}
      >
        <Paper
          sx={{
            borderRadius: "50%",
            width: { xs: "40px", sm: "60px" },
            height: { xs: "40px", sm: "60px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.secondary,
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
            flex: 1,
            mx: 1,
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
            borderRadius: "30px",
            width: "100px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            backgroundColor: colors.primary,
            textTransform: "none",
          }}
        >
          Ver
        </Button>
      </Box>

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
