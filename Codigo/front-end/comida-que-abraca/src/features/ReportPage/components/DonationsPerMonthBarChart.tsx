import { useEffect, useState } from "react";
import { Stack, Typography, TextField } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

interface DonationByMonth {
    month: string;
    donations: number;
    [key: string]: string | number;
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
        <Stack
            sx={{
                bgcolor: 'background.paper',
                boxShadow: 'none',
                p: 4,
                mb: 1,
                width: '100%',
                maxWidth: 900,
                mx: 'auto',
            }}
            spacing={1}
        >
            <Typography variant="h6" align="center" sx={{ fontWeight: 600, mb: 2 }}>
                Doações mensais no ano de {selectedYear}
            </Typography>
            <Typography variant="body2" align="justify" color="text.secondary" sx={{ mb: 2 }}>
                Este gráfico mostra quantas doações recebemos em cada mês do ano que você escolher. No eixo horizontal (embaixo), você vê os meses de janeiro a dezembro, e no eixo vertical (lado) a quantidade de doações feitas em cada mês. Selecione o ano ao lado e veja os resultados de nossa pesquisa!
            </Typography>
            <Stack
                direction="column"
                spacing={3}
                alignItems="center"
                justifyContent="center"
            >
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
                    sx={{ mt: 2, width: '100%' }}
                />
                <BarChart
                    dataset={barData}
                    xAxis={[{ dataKey: 'month' }]}
                    {...chartSetting}
                    width={600}
                    height={260}
                />
            </Stack>
        </Stack>
    );
}

export default DonationsPerMonthChart;