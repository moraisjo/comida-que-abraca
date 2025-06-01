import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Box,
  Paper,
  Alert,
} from '@mui/material';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/comida-que-abraca-logo.png';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingConsentCheck, setPendingConsentCheck] = useState(false);
  const navigate = useNavigate();
  const { decodedUser, setAuthData } = useAuth();

  const checkLgpdConsent = async () => {
    try {
      const response = await api.get(`/lgpd/consent/${decodedUser?.userId}`);
      if(response.data.consentDateTime == null) {
        navigate('/lgpd');        
        return false;
      } else {
        navigate('/');
        return true;
      }
    } catch (error: any) {
      console.error('Erro ao verificar consentimento LGPD:', error);
      return false;
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await api.post('/login', { email, password });
      const { token } = response.data;
      setAuthData({ token });
      setPendingConsentCheck(true);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.statusText || 'Erro ao fazer login.');
    }
  };

  useEffect(() => {
    if (pendingConsentCheck && decodedUser?.userId) {
      checkLgpdConsent();
      setPendingConsentCheck(false);
    }
  }, [pendingConsentCheck, decodedUser]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 4 }}>
        <img src={logo} alt="Logo Comida que Abraça" width="80%" />
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />

          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>

          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Ainda não tem cadastro?{' '}
          <Link href="/cadastro" underline="hover">
            Clique aqui!
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}