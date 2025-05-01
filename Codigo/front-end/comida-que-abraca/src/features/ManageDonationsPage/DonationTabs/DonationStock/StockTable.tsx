import * as React from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import { DonationResponse } from "../../../../data/model/donation";
import { useState } from "react";
import StockItemModal from "./StockItemDetail";

interface StockTableProps {
  donations: DonationResponse[];
}

const StockTable: React.FC<StockTableProps> = ({ donations }) => {
  const [filterText, setFilterText] = React.useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);

  const handleOpenModal = (donation: any) => {
    setSelectedDonation(donation);
    setModalOpen(true);
    console.log(donation);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDonation(null);
  };

  const columns = [
    { field: "name", headerName: "Descrição", width: 200 },
    {
      field: "donorName",
      headerName: "Doador",
      width: 150,
    },
    { field: "arrivingDate", headerName: "Data de entrega", width: 150 },
    { field: "delivery", headerName: "Tipo de entrega", width: 150 },
    { field: "beneficiaryName", headerName: "Beneficiário", width: 150 },
    {
      field: "saibaMais",
      headerName: "Saiba Mais",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleOpenModal(params.row)}
        >
          +
        </Button>
      ),
    },
  ];

  function formatDate(notFormattedDatetime: string) {
    const date = new Date(notFormattedDatetime);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const filteredDonations = donations.map((donation) => ({
    id: donation.id,
    name: donation.name,
    arrivingDate: formatDate(donation.arrivingDate),
    delivery: capitalizeFirstLetter(donation.delivery),
    donorName: donation.donor?.name || "",
    beneficiaryName: donation.beneficiary?.name || "Em estoque",
  }));

  const filteredRows = filteredDonations.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div style={{ height: 500, width: "100%" }}>
      <TextField
        label="Buscar..."
        variant="outlined"
        size="small"
        fullWidth
        style={{ marginBottom: 16 }}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
      />
      {/* Modal sendo incluído aqui no mesmo nível do Box */}
      <StockItemModal open={modalOpen} handleCloseModal={handleCloseModal} donation={selectedDonation}/>
    </div>
  );
};

export default StockTable;
