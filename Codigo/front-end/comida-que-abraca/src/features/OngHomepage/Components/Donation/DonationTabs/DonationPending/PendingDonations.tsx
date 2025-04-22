import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import colors from "../../../../../../shared/theme/colors";
import { PendingDonationResponse } from "../../../../../../data/model/donation";
import { UseDonationService } from "../../../../hooks/UseDonationService";

const PendingDonations: React.FC = () => {
  const [donations, setDonations] = useState<PendingDonationResponse[]>([]);

  useEffect(() => {
    UseDonationService.getPendingDonations().then((data) => {
      setDonations(data);
    });
  }, []);

  const handleAccept = (id: number) => {
    console.log("Aceitar doação:", id);
  };

  const handleReject = (id: number) => {
    console.log("Rejeitar doação:", id);
  };

  const handleTransfer = (id: number) => {
    console.log("Transferir doação:", id);
  };

  return (
    <Box padding={2} sx={{ backgroundColor: colors.white }}>
      <Typography variant="h6" gutterBottom color={colors.PrimaryColor}>
        Doações Disponíveis
      </Typography>

      {donations.length === 0 ? (
        <Typography color="textSecondary">Nenhuma doação pendente.</Typography>
      ) : (
        donations.map((donation) => (
          <Card
            key={donation.id}
            variant="outlined"
            sx={{ mb: 2, borderColor: colors.lilac }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography>
                    <strong>Nome da Doação:</strong> {donation.name}
                  </Typography>
                  <Typography>
                    <strong>Doador:</strong> {donation.donorName}
                  </Typography>
                  {donation.campaignName && (
                    <Typography>
                      <strong>Campanha:</strong> {donation.campaignName}
                    </Typography>
                  )}
                  <Typography>
                    <strong>Entrega:</strong> {donation.delivery}
                  </Typography>
                  <Typography>
                    <strong>Data de Chegada:</strong>{" "}
                    {new Date(donation.arrivingDate).toLocaleDateString()}
                  </Typography>
                </Box>

                <Stack direction="column" spacing={2} ml={2}>
                  <Button
                    variant="contained"
                    onClick={() => handleAccept(donation.id)}
                    sx={{ backgroundColor: colors.ok, color: colors.white }}
                  >
                    Aceitar
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => handleTransfer(donation.id)}
                    sx={{ backgroundColor: colors.purple, color: colors.white }}
                  >
                    Transferir
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleReject(donation.id)}
                    sx={{ backgroundColor: colors.Red, color: colors.white }}
                  >
                    Rejeitar
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default PendingDonations;
