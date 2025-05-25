import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import HeaderMenu from "../../shared/components/HeaderMenu";
import { PieChart } from "@mui/x-charts/PieChart";

// Tipos para os dados recebidos do backend
interface ReportData {
    totalDonations: number;
    totalCampaigns: number;
    // outros campos se necessário
}

interface PieChartData {
    id: number;
    label: string;
    value: number;
}

export function ReportPage() {
    const [report, setReport] = useState<ReportData | null>(null);
    const [pieData, setPieData] = useState<PieChartData[]>([]);

    useEffect(() => {
        // Requisição para dados do relatório geral
        fetch("http://localhost:8080/report/summary")
            .then((res) => res.json())
            .then((data) => setReport(data))
            .catch((err) => console.error("Erro ao buscar relatório:", err));

        // Requisição para dados do gráfico de pizza
        fetch("http://localhost:8080/report/donations-by-campaign")
            .then((res) => res.json())
            .then((apiData) => {
                // apiData deve ser um array de objetos { campaignName, donationCount }
                const formattedData = apiData.map((item: any, index: number) => ({
                    id: index,
                    label: item.campaignName,
                    value: item.donationCount,
                }));
                setPieData(formattedData);
            })
            .catch((err) => console.error("Erro ao buscar dados do gráfico:", err));
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
                    </div>
                ) : (
                    <Typography>Carregando relatório...</Typography>
                )}

                <Typography variant="h5" align="center" sx={{ marginTop: 4 }}>
                    Doações por Campanha
                </Typography>

                {pieData.length > 0 ? (
                    <PieChart
                        series={[
                            {
                                data: pieData,
                            },
                        ]}
                        width={400}
                        height={300}
                    />
                ) : (
                    <Typography>Carregando gráfico...</Typography>
                )}
            </Container>
        </>
    );
}
