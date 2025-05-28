import { useState } from 'react';
import { createPartner } from '../../data/repository/partnerRepository';
import { Partner } from '../../data/model/partner';
import HeaderMenu from "../../shared/components/HeaderMenu";
import colors from "../../shared/theme/colors";
import { 
  Box, 
  Container, 
  TextField, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Checkbox, 
  Button, 
  Typography, 
  Paper,
  FormControl,
  InputLabel
} from '@mui/material';

export default function PartnerForm() {
  const [partner, setPartner] = useState<Partner>({
    name: '',
    email: '',
    phone: '',
    wantsToDonate: false,
    wantsToReceiveDonations: false,
    legalEntityType: 'ONG',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setPartner(prev => ({
      ...prev,
      [name as string]: name === 'wantsToDonate' || name === 'wantsToReceiveDonations' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPartner(partner);
      alert('Parceiro cadastrado com sucesso!');
      setPartner({
        name: '',
        email: '',
        phone: '',
        wantsToDonate: false,
        wantsToReceiveDonations: false,
        legalEntityType: 'ONG',
      });
    } catch (err) {
      alert('Erro ao cadastrar parceiro');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <HeaderMenu/>
          <Typography variant="h5" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Cadastro de Parceiro
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="name"
                value={partner.name}
                onChange={handleChange}
                label="Nome"
                required
                fullWidth
              />

              <TextField
                name="email"
                type="email"
                value={partner.email}
                onChange={handleChange}
                label="Email"
                required
                fullWidth
              />

              <TextField
                name="phone"
                value={partner.phone}
                onChange={handleChange}
                label="Telefone"
                required
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel id="legalEntityType-label">Tipo de Entidade</InputLabel>
                <Select
                  labelId="legalEntityType-label"
                  name="legalEntityType"
                  value={partner.legalEntityType}
                  onChange={handleChange}
                  label="Tipo de Entidade"
                >
                  <MenuItem value="ONG">ONG</MenuItem>
                  <MenuItem value="GOVERNMENT">Governo</MenuItem>
                  <MenuItem value="COMPANY">Empresa</MenuItem>
                  <MenuItem value="VOLUNTARY">Voluntário</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    name="wantsToDonate"
                    checked={partner.wantsToDonate}
                    onChange={handleChange}
                  />
                }
                label="Deseja doar?"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="wantsToReceiveDonations"
                    checked={partner.wantsToReceiveDonations}
                    onChange={handleChange}
                  />
                }
                label="Deseja receber doações?"
              />

              <Button style={{background: colors.primary,}}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
              >
                Cadastrar
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}