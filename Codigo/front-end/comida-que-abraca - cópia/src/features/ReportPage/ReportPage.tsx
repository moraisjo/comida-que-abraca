import { useEffect, useState } from "react";
import HeaderMenu from "../../shared/components/HeaderMenu";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from '@mui/x-charts/BarChart';
import dayjs from 'dayjs';
import {
    Container,
    Typography,
    TextField,
    Stack,
    Box,
    Paper,
} from "@mui/material";

interface ReportData {
    totalDonations: number;
    totalCampaigns: number;
}

interface PieChartData {
    id: number;
    label: string;
    value: number;
}

interface DonationByMonth {
    month: string;
    donations: number;
    [key: string]: string | number;
}

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];


function SummaryBox() {
    const [totals, setTotals] = useState<{ campaigns: number; donations: number; partners: number }>({
        campaigns: 0,
        donations: 0,
        partners: 0,
    });

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:8080/report/total-campaigns").then(res => res.json()),
            fetch("http://localhost:8080/report/total-donations").then(res => res.json()),
            fetch("http://localhost:8080/report/total-partners").then(res => res.json()),
        ]).then(([campaigns, donations, partners]) => {
            setTotals({ campaigns, donations, partners });
        });
    }, []);

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 5, borderRadius: 3 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={4} justifyContent="center" alignItems="center">
                <Box>
                    <Typography variant="h4" align="center" color="primary">{totals.campaigns}</Typography>
                    <Typography variant="h6" align="center">Campanhas</Typography>
                </Box>
                <Box>
                    <Typography variant="h4" align="center" color="primary">{totals.donations}</Typography>
                    <Typography variant="h6" align="center">Doações</Typography>
                </Box>
                <Box>
                    <Typography variant="h4" align="center" color="primary">{totals.partners}</Typography>
                    <Typography variant="h6" align="center">Parceiros</Typography>
                </Box>
            </Stack>
            <Typography variant="body2" align="justify" color="text.secondary" sx={{ mt: 2 }}>
                O Comida que Abraça segue alimentando vidas, promovendo dignidade e construindo uma rede de esperança. Cada número representa um gesto de amor, cada ação é um passo rumo a um mundo mais justo. 💛 Este é um resumo dos dados mais importantes do nosso relatório. Aqui você pode ver quantas campanhas foram criadas, quantas doações recebemos e quantos parceiros estão conosco. Esses números ajudam a entender o impacto do nosso trabalho e a importância da sua contribuição.
            </Typography>
        </Paper>
    );
}

function DonationsPerMonthChart({ selectedYear, onYearChange }: { selectedYear: number, onYearChange: (year: number) => void }) {
    const [barData, setBarData] = useState<DonationByMonth[]>([]);
    const chartSetting = {
        yAxis: [
            {
                label: 'Doações',
                width: 60,
            },
        ],
        series: [{ dataKey: 'donations', label: 'Quantidade de doações por mês' }],
        height: 300,
    };

    useEffect(() => {
        fetch("http://localhost:8080/report/donations-per-year", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ year: selectedYear }),
        })
            .then((res) => res.json())
            .then((apiData) => {
                const monthMap: Record<number, number> = {};
                apiData.forEach((item: any) => {
                    monthMap[item.monthNumber] = item.totalDonations;
                });
                const filled = MONTHS.map((name, idx) => ({
                    month: name,
                    donations: monthMap[idx + 1] || 0,
                }));
                setBarData(filled);
            })
            .catch((err) => console.error("Erro ao buscar dados do gráfico de barras:", err));
    }, [selectedYear]);

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                borderRadius: 3,
                boxShadow: 2,
                p: 4,
                mb: 6,
            }}
        >
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={5}
                alignItems="flex-start"
                justifyContent="center"
            >
                <Stack spacing={2} sx={{ minWidth: 220, maxWidth: 340 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Doações por mês - Ano: {selectedYear}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Este gráfico mostra quantas doações recebemos em cada mês do ano que você escolher. No eixo horizontal (embaixo), você vê os meses de janeiro a dezembro, e no eixo vertical (lado) a quantidade de doações feitas em cada mês. Selecione o ano ao lado e veja os resultados de nossa pesquisa!
                    </Typography>
                    <TextField
                        label="Ano"
                        type="number"
                        inputProps={{ min: 2020, max: 2045, step: 1 }}
                        value={selectedYear}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) onYearChange(val);
                        }}
                        size="small"
                        sx={{ width: 120, mt: 1 }}
                    />
                </Stack>
                <Box
                    sx={{
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        boxShadow: 1,
                        p: 2,
                        width: { xs: '100%', md: 500 },
                        minHeight: 320,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <BarChart
                        dataset={barData}
                        xAxis={[{ dataKey: 'month' }]}
                        {...chartSetting}
                        width={450}
                        height={260}
                    />
                </Box>
            </Stack>
        </Box>
    );
}

// Função para buscar e exibir o gráfico de pizza (Doações por campanha)
function DonationsByCampaignChart() {
    const [pieData, setPieData] = useState<PieChartData[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/report/donations-by-campaign")
            .then((res) => res.json())
            .then((apiData) => {
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
        <Box
            sx={{
                bgcolor: 'background.paper',
                borderRadius: 3,
                boxShadow: 2,
                p: 4,
                mb: 4,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'center', md: 'flex-start' },
            }}
        >
            <Box
                sx={{
                    maxWidth: 340,
                    mr: { md: 2 },
                    mb: { xs: 3, md: 0 },
                }}
            >
                <Typography variant="h6" align="center" sx={{ fontWeight: 600, mb: 2 }}>
                    Doações por Campanha
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Este gráfico de pizza mostra a proporção de doações recebidas por cada campanha cadastrada. Cada fatia representa uma campanha, permitindo visualizar rapidamente quais campanhas receberam mais doações ao longo do período. Campanhas com menos doações aparecem com fatias menores.
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: '0 0 auto',
                }}
            >
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
                    <Typography align="center">Carregando gráfico...</Typography>
                )}
            </Box>
        </Box>
    );
}

// Função principal que chama as duas funções de exibição dos gráficos
export function ReportPage() {
    const [report, setReport] = useState<ReportData | null>(null);
    const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());

    useEffect(() => {
        fetch("http://localhost:8080/report/summary")
            .then((res) => res.json())
            .then((data) => setReport(data))
            .catch((err) => console.error("Erro ao buscar relatório:", err));
    }, []);

    return (
        <>
            <HeaderMenu />
            <Container maxWidth="md" sx={{ py: 5 }}>
                <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4 }}>
                    Relatório Geral
                </Typography>

                {report ? (
                    <>
                        <SummaryBox />
                        <DonationsPerMonthChart selectedYear={selectedYear} onYearChange={setSelectedYear} />
                        <DonationsByCampaignChart />
                    </>
                ) : (
                    <Typography align="center" sx={{ mt: 6 }}>
                        Carregando relatório...
                    </Typography>
                )}
            </Container>
        </>
    );
}