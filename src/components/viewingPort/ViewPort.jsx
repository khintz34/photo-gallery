import React, { useEffect, useRef, useState } from "react";
import "./ViewPort.css";
import { useViewPortStore } from "../../stores/viewPortStore";
import { useViewNumberStore } from "../../stores/viewNumberStore";

const Viewport = (props) => {
  const [indexNum, setIndexNum] = useState(props.num);
  const list = props.list;
  const viewingStatus = useViewPortStore((state) => state.viewingStatus);
  const changeViewingStatus = useViewPortStore((state) => state.changeStatus);
  const viewingNumber = useViewNumberStore((state) => state.viewingNumber);
  const changeViewingNumber = useViewNumberStore((state) => state.changeStatus);
  const viewingRef = useRef();
  console.log(viewingNumber);

  useEffect(() => {
    if (viewingStatus === "show") {
      document.onkeydown = checkKey;
    }
  }, [viewingStatus]);

  useEffect(() => console.log(indexNum, "INDEX USE"), [indexNum]);

  function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == "37") {
      // left arrow
      if (viewingNumber === 0) {
        console.log("hide");
        changeViewingStatus("hide");
        return;
      }
      let newNum = viewingNumber - 1;
      changeViewingNumber(newNum);
      console.log(viewingNumber);
      let numNew = indexNum - 1;
      setIndexNum(numNew);
    } else if (e.keyCode == "39") {
      // right arrow
      if (viewingNumber === list.length - 1) {
        /* ! work on this */
        changeViewingStatus("hide");
        return;
      }
      console.log("viewingNum RIght:", viewingNumber);
      let newNum = viewingNumber + 1;
      changeViewingNumber(newNum);

      console.log("indexNum RIght:", indexNum);
      let numNew = indexNum + 1;
      setIndexNum(numNew);
    }
  }

  return (
    <div className={`viewPort`} onKeyDown={(e) => checkKey(e)} ref={viewingRef}>
      <img
        src={list[viewingNumber].image}
        alt={list[viewingNumber].name}
        className="viewPortImg"
      />
    </div>
  );
};

export default Viewport;
