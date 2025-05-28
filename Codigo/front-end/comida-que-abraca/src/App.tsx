import "./shared/theme/global.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import RankingPage from "./features/RankingPage/RankingPage";
import CampanhasPage from "./features/ManageCampaigntPage/CampaignPages";
import DonationPage from "./features/ManageDonationsPage/DonationPage";
import NotificationPage from "./features/NotificationPage/NotificationPage";
import PartnerPage from "./features/partner/PartnerPage";
import LoginPage from "./features/LoginPage/LoginPage";
import OngHomepage from "./features/OngHomepage/OngHomepage";
import SignUpPage from "./features/SignUpPage/SignUpPage";
import LgpdConsent from "./shared/components/Lgpd/LgpdConsent";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./shared/theme/theme";
import { ReportPage } from "./features/ReportPage/ReportPage";
import DonorsPage from "./features/DonorsPage/DonorsPage";
import { AuthProvider } from "./context/AuthContext";

function LgpdRouteWrapper() {
  const location = useLocation();
  const userId = location.state?.userId;

  return (
    <LgpdConsent
      userId={userId}
      onAccept={() => {
        localStorage.setItem("lgpdAccepted", "true");
        window.location.href = "/";
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
            <Route path="/cadastro-parceiro" element={<PartnerPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/relatorios" element={<ReportPage />} />
            <Route path="/doadores" element={<DonorsPage />} />
            <Route path="/notificacoes" element={<NotificationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/lgpd" element={<LgpdRouteWrapper />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
