import React from "react";
import Gallery from "../Gallery/Gallery";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import "./Container.css";

const Container = () => {
  return (
    <div id="mainContainer">
      <Menu />
      <section id="mainSection">
        <Header />
        <Gallery />
      </section>
    </div>
  );
};

export default Container;
