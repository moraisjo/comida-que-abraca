import * as React from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import { DonationResponse } from "../../../../data/model/donation";
import { useEffect, useState } from "react";
import StockItemModal from "./StockItemModal";
import { VolunteerActivism } from "@mui/icons-material";
import BeneficiaryModal from "./BeneficiaryModal";
import api from "../../../../api/axios.ts";

interface StockTableProps {
  donations: DonationResponse[];
}

const StockTable: React.FC<StockTableProps> = ({ donations }) => {
  const [filterText, setFilterText] = React.useState("");
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [beneficiaryModalOpen, setBeneficiaryModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [partners, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBeneficiaries = async () => {
      try {
        const response = await api.get("/partners/beneficiarios");
        setBeneficiaries(response.data);
      } catch (err: unknown) {
        const error = err as any;
      } finally {
        setLoading(false);
      }
    };

    fetchAllBeneficiaries();
  }, []);

  const handleOpenDetailsModal = (donation: any) => {
    setSelectedDonation(donation);
    setDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedDonation(null);
  };

  const handleOpenBeneficiaryModal = (donation: any) => {
    setSelectedDonation(donation);
    setBeneficiaryModalOpen(true);
  };

  const handleCloseBeneficiaryModal = () => {
    setBeneficiaryModalOpen(false);
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
    {
      field: "beneficiaryName",
      headerName: "Beneficiário",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const isInStock = params.value === "Em estoque";

        return isInStock ? (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleOpenBeneficiaryModal(params.row)}
            endIcon={<VolunteerActivism />}
          >
            Doar
          </Button>
        ) : (
          <span>{params.value}</span>
        );
      },
    },
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
          onClick={() => handleOpenDetailsModal(params.row)}
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
    if (!str) return "";
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
      <StockItemModal
        open={detailsModalOpen}
        handleCloseModal={handleCloseDetailsModal}
        donation={selectedDonation}
      />
      <BeneficiaryModal
        open={beneficiaryModalOpen}
        handleCloseModal={handleCloseBeneficiaryModal}
        partners={partners}
        donation={selectedDonation}
      />
    </div>
  );
};

export default StockTable;
