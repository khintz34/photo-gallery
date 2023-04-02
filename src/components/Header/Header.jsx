import React, { useContext, useEffect } from "react";
import "./Header.css";
import { useMobileStore } from "../../stores/mobileSetting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ShowHeaderContext } from "../../contexts/MainListContext";

const Header = () => {
  const mobileStatus = useMobileStore((state) => state.mobileStatus);
  const changeMobileStatus = useMobileStore((state) => state.changeStatus);
  const { showHeader, setShowHeader } = useContext(ShowHeaderContext);
  const screenWidth = screen.width;

  useEffect(() => {
    if (screenWidth < 500) {
      changeMobileStatus(true);
    } else {
      changeMobileStatus(false);
    }
  });

  function changeMenuStatus() {
    if (showHeader === "left") {
      setShowHeader("right");
    } else {
      setShowHeader("left");
    }
  }

  return (
    <div id="headerContainer">
      <h1 id="mainHeader">Photo Gallery</h1>
      <div className="menuBtn">
        <FontAwesomeIcon icon={faBars} onClick={changeMenuStatus} />
      </div>
    </div>
  );
};

export default Header;
