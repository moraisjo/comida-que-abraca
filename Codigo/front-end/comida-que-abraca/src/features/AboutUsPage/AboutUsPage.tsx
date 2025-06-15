import HeaderMenu from "../../shared/components/HeaderMenu";
import BannerAboutUsPage from "./components/BannerAboutUsPage";
import Footer from "../../shared/components/Footer/Footer";
import PaginatedCards from "./components/PaginatedCards";
import ObjectivesODS from "./components/ObjectivesODS";
import BannerODS from "./components/BannerODS";

const AboutUsPage = () => {
  return (
    <>
      <HeaderMenu />
      <BannerAboutUsPage />
      <PaginatedCards />
      <BannerODS />
      <ObjectivesODS />
      <Footer />
    </>
  );
};

export default AboutUsPage;
