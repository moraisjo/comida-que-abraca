import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  CardMedia,
  useTheme,
} from "@mui/material";
import { PendingDonationResponse } from "../../../../data/model/donation";
import BackendResponseModal from "../../../../shared/components/Modal/BackendResponseModal";
import { UseDonationService } from "../../../OngHomepage/hooks/UseDonationService";

const PendingDonations: React.FC = () => {
  const [donations, setDonations] = useState<PendingDonationResponse[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIsSuccess, setModalIsSuccess] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    UseDonationService.getPendingDonations().then((data) => {
      setDonations(data);
    });
  }, []);

  const handleAccept = (id: number) => {
    UseDonationService.updateDonationStatus(id, "ACCEPTED")
      .then((response) => {
        setModalMessage(response.message);
        setModalIsSuccess(true);
        setModalOpen(true);
        setDonations((prevDonations) =>
          prevDonations.filter((donation) => donation.id !== id)
        );
      })
      .catch((error) => {
        setModalMessage("Erro ao aceitar a doação");
        setModalIsSuccess(false);
        setModalOpen(true);
      });
  };

  const handleReject = (id: number) => {
    UseDonationService.updateDonationStatus(id, "REJECTED")
      .then((response) => {
        setModalMessage(response.message);
        setModalIsSuccess(true);
        setModalOpen(true);
        setDonations((prevDonations) =>
          prevDonations.filter((donation) => donation.id !== id)
        );
      })
      .catch((error) => {
        setModalMessage("Erro ao rejeitar a doação");
        setModalIsSuccess(false);
        setModalOpen(true);
      });
  };

  return (
    <>
      <Box padding={2}>
        <Typography
          variant="h6"
          gutterBottom
          color={theme.palette.primary.main}
        >
          Doações Disponíveis
        </Typography>

        {donations.length === 0 ? (
          <Typography color="textSecondary">
            Nenhuma doação pendente.
          </Typography>
        ) : (
          <Box display="flex" flexWrap="wrap" gap={2}>
            {donations.map((donation) => (
              <Card
                key={donation.id}
                variant="outlined"
                sx={{
                  width: "300px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  flexShrink: 0,
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
                    {new Date(donation.requestDate).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
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

      <BackendResponseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        isSuccess={modalIsSuccess}
      />
    </>
  );
};

export default PendingDonations;
