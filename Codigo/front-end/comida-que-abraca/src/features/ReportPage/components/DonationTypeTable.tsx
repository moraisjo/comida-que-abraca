import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import colors from "../../../shared/theme/colors";
import Typography from '@mui/material/Typography';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

interface MonthlyDonationType {
  donationName: string;
  campaignName: string;
  donationMonthYear: string;
  donationType: string;
}

export default function DonationTypeTable() {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());
  const [rows, setRows] = React.useState<MonthlyDonationType[]>([]);

  const fetchData = (month: number, year: number) => {
    fetch(`http://localhost:8080/report/monthly-donation-type?month=${month}&year=${year}`)
      .then((res) => res.json())
      .then(setRows)
      .catch((err) => console.error('Erro ao buscar dados da tabela:', err));
  };

  React.useEffect(() => {
    if (selectedDate) {
      fetchData(selectedDate.month() + 1, selectedDate.year());
    }
  }, [selectedDate]);

  return (
    <Paper
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 'none',
        p: 4,
        mb: 6,
        width: '100%',
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontWeight: 600,
          mb: 2,
        }}
      >
        Detalhamento de Doações por Categoria
      </Typography>

      <Typography
        variant="body2"
        align="justify"
        color="text.secondary"
        sx={{ mb: 3, fontSize: { xs: '1rem', md: '1.1rem' } }}
      >
        Esta tabela detalha as doações recebidas por tipo, campanha e período selecionado. Utilize o seletor abaixo para escolher o mês e ano desejados e visualizar os dados correspondentes.
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          views={['year', 'month']}
          label="Selecione Mês/Ano"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          sx={{ mt: 2, width: '100%', mb: 3 }}
        />
      </LocalizationProvider>

      <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
        <Table size="medium">
          <TableHead>
            <TableRow sx={{ backgroundColor: colors.darkGray }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}>Doações</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}>Campanhas</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}>Mês/Ano</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}>Categorias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={`${row.donationName}-${index}`}>
                  <TableCell sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>{row.donationName}</TableCell>
                  <TableCell sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>{row.campaignName}</TableCell>
                  <TableCell sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>{row.donationMonthYear}</TableCell>
                  <TableCell sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>{row.donationType || ''}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ color: "#757575", py: 4, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                  Ainda não existem registros para esse mês
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
