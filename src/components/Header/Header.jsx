import React, { useEffect } from "react";
import "./Header.css";
import { useMobileStore } from "../../stores/mobileSetting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const mobileStatus = useMobileStore((state) => state.mobileStatus);
  const changeMobileStatus = useMobileStore((state) => state.changeStatus);
  const screenWidth = screen.width;

  useEffect(() => {
    if (screenWidth < 500) {
      changeMobileStatus(true);
    } else {
      changeMobileStatus(false);
    }
  });

  return (
    <div id="headerContainer">
      <h1 id="mainHeader">Photo Gallery</h1>
      <div className="menuBtn">
        <FontAwesomeIcon icon={faBars} />
      </div>
    </div>
  );
};

export default Header;
