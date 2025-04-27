import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  CardMedia,
  useTheme, // Hook para acessar o tema
} from "@mui/material";
import { PendingDonationResponse } from "../../../../../../data/model/donation";
import { UseDonationService } from "../../../../hooks/UseDonationService";

const PendingDonations: React.FC = () => {
  const [donations, setDonations] = useState<PendingDonationResponse[]>([]);
  const theme = useTheme();

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

  return (
    <Box padding={2}>
      <Typography variant="h6" gutterBottom color={theme.palette.primary.main}>
        Doações Disponíveis
      </Typography>

      {donations.length === 0 ? (
        <Typography color="textSecondary">Nenhuma doação pendente.</Typography>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap={2}
        >
          {donations.map((donation) => (
            <Card
              key={donation.id}
              variant="outlined"
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              {donation.photoUrl && (
                <CardMedia
                  component="img"
                  image={donation.photoUrl}
                  alt="Imagem da doação"
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                  }}
                />
              )}

              {/* Conteúdo do Card */}
              <CardContent sx={{ textAlign: "center", padding: "16px" }}>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {donation.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginBottom: "8px" }}
                >
                  {new Date(donation.requestDate).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
              </CardContent>

              <Stack
                direction="column"
                spacing={2}
                justifyContent="center"
                sx={{
                  padding: "16px",
                  width: "100%",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleAccept(donation.id)}
                  sx={{
                    color: theme.palette.success.main,
                    borderColor: theme.palette.success.main,
                    width: "100%",
                    height: "40px",
                    fontSize: "16px",
                    borderRadius: "100px",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: theme.palette.success.main,
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  Aceitar
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleReject(donation.id)}
                  sx={{
                    color: theme.palette.error.main,
                    borderColor: theme.palette.error.main,
                    width: "100%",
                    height: "40px",
                    fontSize: "16px",
                    borderRadius: "100px",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: theme.palette.error.main,
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  Rejeitar
                </Button>
              </Stack>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PendingDonations;
