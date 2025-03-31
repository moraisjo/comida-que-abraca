import React from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import colors from "../../../../../shared/theme/colors";

interface CampaignListProps {
  onCreate: () => void; // Função para alternar para o formulário de criação
}

const CampaignList: React.FC<CampaignListProps> = ({ onCreate }) => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Campanhas
      </Typography>

      <Button
        variant="contained"
        fullWidth
        onClick={onCreate}
        sx={{
          marginBottom: 2,
          marginTop: 5,
          backgroundColor: colors.primary,
          color: colors.white,
          borderRadius: 5,
        }}
      >
        Cadastre uma nova campanha
      </Button>

      <Typography variant="h6" gutterBottom>
        Campanhas Anteriores
      </Typography>

      {[1, 2, 3].map((id) => (
        <Card key={id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">Campanha {id}</Typography>
            <Typography variant="body2">Descrição breve...</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default CampaignList;
