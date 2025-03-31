import "./shared/theme/global.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RankingPage from "./features/RankingPage/RankingPage";
import CampanhasPage from "./features/OngHomepage/Components/Campaing/CampaignPages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RankingPage />} />
        <Route path="/campanhas" element={<CampanhasPage />} />
      </Routes>
    </Router>
  );
}

export default App;
