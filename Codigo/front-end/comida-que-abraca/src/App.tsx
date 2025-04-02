import "./shared/theme/global.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RankingPage from "./features/RankingPage/RankingPage";
import CampanhasPage from "./features/OngHomepage/Components/Campaing/CampaignPages";
import PartnerForm from './features/partner/PartnerForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RankingPage />} />
        <Route path="/campanhas" element={<CampanhasPage />} />
        <Route path="/cadastro-parceiro" element={<PartnerForm />} />
      </Routes>
    </Router>
  );
}

export default App;
