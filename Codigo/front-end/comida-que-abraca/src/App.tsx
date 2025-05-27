import "./shared/theme/global.css";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import RankingPage from "./features/RankingPage/RankingPage";
import CampanhasPage from "./features/ManageCampaigntPage/components/CampaignPages";
import DonationPage from "./features/ManageDonationsPage/DonationPage";
import PartnerPage from "./features/partner/PartnerPage";
import AvailableCampaignsPage from "./features/AvailableCampaigns/AvailableCampaignsPage";
import LoginPage from "./features/LoginPage/LoginPage";
import OngHomepage from "./features/OngHomepage/OngHomepage";
import SignUpPage from "./features/SignUpPage/SignUpPage";
import LgpdConsent from "./shared/components/Lgpd/LgpdConsent";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./shared/theme/theme";
import SignUpPage from "./features/SignUpPage/SignUpPage";
import { ReportPage } from "./features/ReportPage/ReportPage";

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
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<OngHomepage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/campanhas" element={<CampanhasPage />} />
          <Route path="/doacoes" element={<DonationPage />} />
          <Route path="/cadastro-parceiro" element={<PartnerPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/campanhas-disponiveis" element={<AvailableCampaignsPage />} />
          <Route path="/relatorios" element={<ReportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/lgpd" element={<LgpdRouteWrapper />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
