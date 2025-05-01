import "./shared/theme/global.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RankingPage from "./features/RankingPage/RankingPage";
import CampanhasPage from "./features/OngHomepage/Components/Campaing/CampaignPages";
import DonationPage from "./features/ManageDonationsPage/DonationPage";
import PartnerPage from "./features/partner/PartnerPage";
import AvailableCampaignsPage from "./features/AvailableCampaigns/AvailableCampaignsPage"; 
import LoginPage from "./features/LoginPage/LoginPage";
import OngHomepage from "./features/OngHomepage/OngHomepage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./shared/theme/theme";
import SignUpPage from "./features/SignUpPage/SignUpPage";

function App() {
  return (
    <ThemeProvider theme={theme} >
      <Router>
        <Routes>
          <Route path="/" element={<OngHomepage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/campanhas" element={<CampanhasPage />} />
          <Route path="/doacoes" element={<DonationPage />} />
          <Route path="/cadastro-parceiro" element={<PartnerPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/campanhas-disponiveis" element={<AvailableCampaignsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
