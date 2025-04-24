import "./shared/theme/global.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RankingPage from "./features/RankingPage/RankingPage";
import CampanhasPage from "./features/OngHomepage/Components/Campaing/CampaignPages";
import DonationPage from "./features/OngHomepage/Components/Donation/DonationPage";
import PartnerPage from "./features/partner/PartnerPage";
import LoginPage from "./features/LoginPage/LoginPage";
import OngHomepage from "./features/OngHomepage/OngHomepage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./shared/theme/theme";

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
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
