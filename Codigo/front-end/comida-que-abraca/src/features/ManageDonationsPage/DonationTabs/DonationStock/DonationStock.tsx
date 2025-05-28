import { Box } from "@mui/material";
import StockTable from "./StockTable";
import useDonationService from "../../hooks/useDonationService";
import { useEffect } from "react";

const DonationStock: React.FC = () => {
  const { donations, fetchAllDonations } = useDonationService();

  // Chamar fetchAllDonations() quando o componente for montado
  useEffect(() => {
    fetchAllDonations();
  }, []);

  // Aqui fazemos o filtro
  const stockDonations = donations.filter(
    (donation) => donation.status === "STOCK"
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <StockTable donations={stockDonations} />
    </Box>
  );
};

export default DonationStock;