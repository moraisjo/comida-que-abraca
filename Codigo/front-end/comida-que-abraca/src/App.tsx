import React from "react";
import "./shared/theme/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RankingPage from "./features/RankingPage/RankingPage";
import CampanhasPage from "./features/ManageCampaigntPage/CampaignPages";
import CampaignsPage from "./features/CampaignsPage/CampaignsPage";
import DonationPage from "./features/ManageDonationsPage/DonationPage";
import RequestersPage from "./features/RequestersPage/RequestersPage";
import NotificationPage from "./features/NotificationPage/NotificationPage";
import PartnerDonationsPage from "./features/PartnerDonations/PartnerDonationsPage";
import LoginPage from "./features/LoginPage/LoginPage";
import SignUpPage from "./features/SignUpPage/SignUpPage";
import DonorsPage from "./features/DonorsPage/DonorsPage";
import LgpdConsent from "./features/LgpdConsent/LgpdConsent";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./shared/theme/theme";
import { ReportPage } from "./features/ReportPage/ReportPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./features/HomePage/HomePage";
import AboutUsPage from "./features/AboutUsPage/AboutUsPage";
import RequestFormPage from "./features/RequestFormPage/RequestFormPage";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/gerenciar-campanhas" element={<CampanhasPage />} />
            <Route path="/gerenciar-doacoes" element={<DonationPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/relatorios" element={<ReportPage />} />
            <Route path="/doadores" element={<DonorsPage />} />
            <Route path="/solicitantes" element={<RequestersPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/notificacoes" element={<NotificationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/minhas-doacoes" element={<PartnerDonationsPage />} />
            <Route
              path="/formulario-solicitacao"
              element={<RequestFormPage />}
            />
            <Route
              path="/formulario-solicitacao"
              element={<RequestFormPage />}
            />
            <Route path="/campanhas-disponiveis" element={<CampaignsPage />} />
            <Route path="/sobre" element={<AboutUsPage />} />
            <Route path="/lgpd" element={<LgpdConsent />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
