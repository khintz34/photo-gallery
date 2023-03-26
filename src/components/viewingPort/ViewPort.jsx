import React, { useEffect, useRef, useState } from "react";
import "./ViewPort.css";
import { useViewPortStore } from "../../stores/viewPortStore";

const Viewport = (props) => {
  const [indexNum, setIndexNum] = useState(props.num);
  const list = props.list;
  const viewingStatus = useViewPortStore((state) => state.viewingStatus);
  const changeViewingStatus = useViewPortStore((state) => state.changeStatus);
  const viewingRef = useRef();
  console.log(indexNum);
  console.log("num", props.num);

  useEffect(() => {
    setIndexNum(props.num);
  }, [indexNum]);

  useEffect(() => {
    if (viewingStatus === "show") {
      document.onkeydown = checkKey;
    }
  }, [viewingStatus]);

  function checkKey(e) {
    e = e || window.event;
    console.log(indexNum);

    if (e.keyCode == "37") {
      // left arrow
      if (indexNum === 0) {
        console.log("hide");
        changeViewingStatus("hide");
        return;
      }
      let newNum = indexNum - 1;
      setIndexNum(newNum);
    } else if (e.keyCode == "39") {
      // right arrow
      if (indexNum === list.length - 1) {
        /* ! work on this */
        changeViewingStatus("hide");
        return;
      }
      let newNum = indexNum + 1;
      setIndexNum(newNum);
    }
  }

  return (
    <div className={`viewPort`} onKeyDown={(e) => checkKey(e)} ref={viewingRef}>
      <img
        src={list[indexNum].image}
        alt={list[indexNum].name}
        className="viewPortImg"
      />
    </div>
  );
};

export default Viewport;
