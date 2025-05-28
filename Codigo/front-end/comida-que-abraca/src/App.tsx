import "./shared/theme/global.css";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import RankingPage from "./features/RankingPage/RankingPage";
import CampanhasPage from "./features/ManageCampaigntPage/CampaignPages";
import DonationPage from "./features/ManageDonationsPage/DonationPage";
import NotificationPage from "./features/NotificationPage/NotificationPage";
import PartnerDonationsPage from "./features/PartnerDonations/PartnerDonationsPage";
import LoginPage from "./features/LoginPage/LoginPage";
import OngHomepage from "./features/OngHomepage/OngHomepage";
import SignUpPage from "./features/SignUpPage/SignUpPage";
import LgpdConsent from "./shared/components/Lgpd/LgpdConsent";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./shared/theme/theme";
import { ReportPage } from "./features/ReportPage/ReportPage";
import DonorsPage from "./features/DonorsPage/DonorsPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

// 🚩x Lgpd wrapper que atualiza o AuthContext
function LgpdRouteWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuthData, token, userType } = useAuth();

  const userId = location.state?.userId;

  return (
    <LgpdConsent
      userId={userId}
      onAccept={() => {
        // Atualiza o AuthContext
        setAuthData({
          userId,
          userType: userType || "", // ou pegue de outro lugar se necessário
          token: token || "",
        });

        // Redireciona após aceite
        navigate("/");
      }}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<OngHomepage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/campanhas" element={<CampanhasPage />} />
            <Route path="/doacoes" element={<DonationPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/relatorios" element={<ReportPage />} />
            <Route path="/doadores" element={<DonorsPage />} />
            <Route path="/notificacoes" element={<NotificationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/minhas-doacoes" element={<PartnerDonationsPage />} />
            <Route path="/lgpd" element={<LgpdRouteWrapper />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;