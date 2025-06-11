import SummaryBox from "./components/SummaryBox";
import DonationsPerMonthChart from "./components/DonationsPerMonthBarChart";
import DonationsByCampaignPieChart from "./components/DonationsByCampaignPieChart";
import DonationTypeTable from "./components/DonationTypeTable";
import { useState } from "react";
import HeaderMenu from "../../shared/components/HeaderMenu";
import dayjs from "dayjs";
import { Container, Typography } from "@mui/material";

interface ReportData {
  totalDonations: number;
  totalCampaigns: number;
}

// Função principal que chama as duas funções de exibição dos gráficos
export function ReportPage() {
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());

  return (
    <>
      <HeaderMenu />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4 }}>
          Relatório Geral
        </Typography>
        <SummaryBox />
        <DonationsPerMonthChart
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />
        <DonationsByCampaignPieChart />
        <DonationTypeTable />
      </Container>
    </>
  );
}
