import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import HeaderMenu from "../../shared/components/HeaderMenu";

// Defina o tipo do relatório conforme o backend
interface ReportData {
  // exemplo de campos
  totalDonations: number;
  totalCampaigns: number;
  // ...outros campos
}

export function ReportPage() {
  const [report, setReport] = useState<ReportData | null>(null);

  useEffect(() => {
    axios.get("http://localhost:8080/report/summary")
      .then((response) => setReport(response.data))
      .catch((error) => console.error("Erro ao buscar relatório:", error));
  }, []);

  return (
    <>
      <HeaderMenu />
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Relatório Geral
        </Typography>
        {report ? (
          <div>
            <Typography>Total de Doações: {report.totalDonations}</Typography>
            <Typography>Total de Campanhas: {report.totalCampaigns}</Typography>
            {/* Adicione mais campos conforme necessário */}
          </div>
        ) : (
          <Typography>Carregando...</Typography>
        )}
      </Container>
    </>
  );
}