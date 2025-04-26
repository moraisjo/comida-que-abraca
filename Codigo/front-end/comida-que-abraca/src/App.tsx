import "./shared/theme/global.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RankingPage from "./features/RankingPage/RankingPage";
import CampanhasPage from "./features/OngHomepage/Components/Campaing/CampaignPages";
import DonationPage from "./features/OngHomepage/Components/Donation/DonationPage";
import PartnerPage from "./features/partner/PartnerPage";
import AvailableCampaignsPage from "./features/AvailableCampaigns/AvailableCampaignsPage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/campanhas" element={<CampanhasPage />} />
        <Route path="/doacoes" element={<DonationPage />} />
        <Route path="/cadastro-parceiro" element={<PartnerPage />} />
        <Route path="/campanhas-disponiveis" element={<AvailableCampaignsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
