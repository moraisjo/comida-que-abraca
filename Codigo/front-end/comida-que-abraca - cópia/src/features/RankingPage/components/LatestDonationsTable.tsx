import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DonationResponse } from "../../../data/model/donation";
import colors from "../../../shared/theme/colors";

interface LatestDonationsTableProps {
  latestDonations: DonationResponse[];
}

const LatestDonationsTable: React.FC<LatestDonationsTableProps> = ({
  latestDonations,
}) => {
  function formatDate(notFormattedDatetime: string) {
    const date = new Date(notFormattedDatetime);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300, '& td, & th': { border: `1px solid ${colors.darkGray}` }, }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ py: 1, background: colors.purple, color: 'white' }}><strong>Descrição</strong></TableCell>
            <TableCell align="center" sx={{ py: 1, background: colors.purple, color: 'white' }}><strong>Data de doação</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {latestDonations.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell component="th" scope="row" align="center" sx={{ background: colors.lilac }}>
                {row.name}
              </TableCell>
              <TableCell align="center">{formatDate(row.arrivingDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LatestDonationsTable;
