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
        Detalhamento de Doações por Tipo
      </Typography>

      <Typography
        variant="body2"
        align="justify"
        color="text.secondary"
        sx={{ mb: 2 }}
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
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: colors.darkGray,
              }}
            >
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Doações</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Campanhas</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mês/Ano</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Categorias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={`${row.donationName}-${index}`}>
                  <TableCell>{row.donationName}</TableCell>
                  <TableCell>{row.campaignName}</TableCell>
                  <TableCell>{row.donationMonthYear}</TableCell>
                  <TableCell>{row.donationType || ''}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ color: "#757575", py: 4 }}>
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
