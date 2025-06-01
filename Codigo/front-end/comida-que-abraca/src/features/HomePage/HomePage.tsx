import HeaderMenu from "../../shared/components/HeaderMenu";
import React from "react";
import Banner from "./components/Banner";
import Cards from "./components/Cards";
import Footer from "../../shared/components/Footer/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <HeaderMenu />
      <Banner />
      <Cards />
      <Footer />
    </>
  );
};

export default HomePage;
