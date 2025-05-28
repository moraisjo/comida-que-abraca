import { useEffect } from "react";
import { DonationResponse } from "../../../data/model/donation";
import DonatorItem from "./DonatorItem";
import { Box } from "@mui/material";
import useDonationService from "../hooks/useDonationService";

type DonorType = {
  id: number;
  name: string;
  count: number;
};

const DonatorsList: React.FC = () => {
  const { donations, fetchAllDonations } =
    useDonationService();

  // Chamar fetchAllDonations() quando o componente for montado
  useEffect(() => {
    fetchAllDonations();
  }, []);

  const getTopDonors = (donations: DonationResponse[]): DonorType[] => {
    // Definir explicitamente o tipo de 'acc' com assinatura de índice
    const donorCount: Record<
      number,
      { id: number; name: string; count: number }
    > = donations.reduce(
      (acc, donation) => {
        const donor = donation.donor;
        if (!acc[donor.id]) {
          acc[donor.id] = { id: donor.id, name: donor.name, count: 0 };
        }
        acc[donor.id].count += 1;
        return acc;
      },
      {} as Record<number, { id: number; name: string; count: number }> // Usar Record para definir a assinatura de índice
    );

    return Object.values(donorCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  // Chamando a função de rankeamento a partir das donations buscadas no banco de dados
  const topDonors: DonorType[] = getTopDonors(donations);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {topDonors.map((donor, index) => (
        <DonatorItem
          key={donor.id} // Chave única para cada item
          ranking={index + 1}
          donorName={donor.name}
          donationsCount={donor.count}
          donations={donations}
        />
      ))}
    </Box>
  );
};

export default DonatorsList;
