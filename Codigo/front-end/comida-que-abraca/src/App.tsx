import "./shared/theme/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RankingPage from "./features/RankingPage/RankingPage";
import CampanhasPage from "./features/ManageCampaigntPage/CampaignPages";
import CampaignsPage from "./features/CampaignsPage/CampaignsPage";
import DonationPage from "./features/ManageDonationsPage/DonationPage";
import RequestersPage from "./features/RequestersPage/RequestersPage";
import NotificationPage from "./features/NotificationPage/NotificationPage";
import PartnerDonationsPage from "./features/PartnerDonations/PartnerDonationsPage";
import DonationFormPage from "./features/DonationFormPage/DonationFormPage";
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
import NotFoundPage from "./features/NotFoundPage/NotFoundPage";
import InfoCampaign from "./features/CampaignsPage/components/InfoCampaing";
import { OngRoute } from "./routes/OngRoute";
import { PartnerRoute } from "./routes/PartnerRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sobre" element={<AboutUsPage />} />
            <Route path="/lgpd" element={<LgpdConsent />} />
            <Route path="/page-not-found" element={<NotFoundPage />} />
            <Route path="/parceiro/cadastro" element={<SignUpPage />} />
            <Route path="/parceiro/campanhas" element={<CampaignsPage />} />
            <Route path="/parceiro/campanhas/:id" element={<InfoCampaign />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/ong/relatorios" element={<ReportPage />} />
            {/* NGO protected routes */}
            <Route element={<OngRoute />}>
              <Route path="/ong/ranking" element={<RankingPage />} />
              <Route path="/ong/campanhas" element={<CampanhasPage />} />
              <Route path="/ong/doacoes" element={<DonationPage />} />
              <Route path="/ong/doadores" element={<DonorsPage />} />
              <Route path="/ong/solicitantes" element={<RequestersPage />} />
              <Route path="/ong/notificacoes" element={<NotificationPage />} />
            </Route>
            {/* Partner protected routes */}
            <Route element={<PartnerRoute />}>
              <Route
                path="/parceiro/doacoes"
                element={<PartnerDonationsPage />}
              />
              <Route path="/parceiro/doar" element={<DonationFormPage />} />
              <Route
                path="/parceiro/solicitacao"
                element={<RequestFormPage />}
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
