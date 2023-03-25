import React, { useEffect, useState } from "react";
import "./ViewPort.css";

const Viewport = ({ status, list, name, num }) => {
  const [indexNum, setIndexNum] = useState(num);
  const [viewingStatus, setViewingStatus] = useState(status);
  console.log(status);

  document.onkeydown = checkKey;

  useEffect(() => {
    setIndexNum(num);
  }, [num]);

  function checkKey(e) {
    e = e || window.event;
    console.log(indexNum);

    if (e.keyCode == "37") {
      // left arrow
      if (indexNum === 0) {
        setViewingStatus("hide");
        return;
      }
      let newNum = indexNum - 1;
      setIndexNum(newNum);
    } else if (e.keyCode == "39") {
      // right arrow
      if (indexNum === list.length) {
        setViewingStatus("hide");
        return;
      }
      let newNum = indexNum + 1;
      setIndexNum(newNum);
    }
  }

  return (
    <div
      className={`viewPort  ${status} ${viewingStatus}`}
      onKeyDown={(e) => checkKey(e)}
    >
      <img
        src={list[indexNum].image}
        alt={list[indexNum].name}
        className="viewPortImg"
      />
    </div>
  );
};

export default Viewport;
