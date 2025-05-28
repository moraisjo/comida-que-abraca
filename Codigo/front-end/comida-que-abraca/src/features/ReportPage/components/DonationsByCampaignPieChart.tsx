import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface PieChartData {
    id: number;
    label: string;
    value: number;
}

function DonationsByCampaignPieChart() {
    const [pieData, setPieData] = useState<PieChartData[]>([]);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

    useEffect(() => {
        if (!selectedDate) return;
        const month = selectedDate.month() + 1;
        const year = selectedDate.year();
        fetch(`http://localhost:8080/report/donations-by-campaign-monthly?month=${month}&year=${year}`)
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
    }, [selectedDate]);

    return (
        <Box>
            <Typography variant="h6" align="center" sx={{ fontWeight: 600, mb: 2 }}>
                Doações por Campanha
            </Typography>
            <Typography variant="body2" align="justify" color="text.secondary" sx={{ mb: 3, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                Este gráfico de pizza mostra a proporção de doações recebidas por cada campanha cadastrada. Cada fatia representa uma campanha, permitindo visualizar rapidamente quais campanhas receberam mais doações ao longo do período. Campanhas com menos doações aparecem com fatias menores.
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    views={['year', 'month']}
                    label="Selecione Mês/Ano"
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                    sx={{ mt: 2, width: '100%' }}
                />
            </LocalizationProvider>
    
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
                <>
                    <PieChart
                        series={[
                            {
                                data: [
                                    {
                                        id: 0,
                                        label: "Sem dados",
                                        value: 1,
                                        color: "#bdbdbd", // cinza
                                    },
                                ],
                            },
                        ]}
                        width={400}
                        height={300}
                    />
                    <Typography align="center" sx={{ color: "#757575", mt: 2 }}>
                        Ainda não existem registros para esse mês
                    </Typography>
                </>
            )}
        </Box>
    );
}

export default DonationsByCampaignPieChart;