import React, { useEffect, useState } from "react";
import { PhotoArray } from "../../assets/PhotoArray";
import "./Gallery.css";
import format from "date-fns/format";
import Viewport from "../viewingPort/ViewPort";
import { useViewPortStore } from "../../stores/viewPortStore";
import { useViewNumberStore } from "../../stores/viewNumberStore";

const Gallery = () => {
  const sortedPhotoArray = PhotoArray.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  const [photoList, setPhotoList] = useState(PhotoArray);

  const firstDate = format(new Date(photoList[0].date), "PPP");
  const lastDate = format(new Date(photoList.at(-1).date), "PPP");
  const [showViewport, setShowViewport] = useState("hide");
  const [viewImage, setViewImage] = useState(0);
  const viewingStatus = useViewPortStore((state) => state.viewingStatus);
  const changeViewingStatus = useViewPortStore((state) => state.changeStatus);
  const viewingNumber = useViewNumberStore((state) => state.viewingNumber);
  const changeViewingNumber = useViewNumberStore((state) => state.changeStatus);
  const increaseNumber = useViewNumberStore((state) => state.increaseNumber);
  const decreaseNumber = useViewNumberStore((state) => state.decreaseNumber);

  const closeModal = () => {
    if (viewingStatus === "show") {
      changeViewingStatus("hide");
    }
  };

  document.onkeydown = checkKey;

  function checkKey(e, direction) {
    e = e || window.event;

    if (e.keyCode == "37" || direction === "i") {
      // left arrow
      if (viewingNumber === 0) {
        changeViewingStatus("hide");
        return;
      }
      decreaseNumber();
    } else if (e.keyCode == "39" || direction === "d") {
      // right arrow
      if (viewingNumber === photoList.length - 1) {
        changeViewingStatus("hide");
        return;
      }
      increaseNumber();
    } else if (e.keyCode == "40") {
      changeViewingStatus("hide");
    }
  }

  return (
    <div id="galleryContainer">
      <div id="dateContainer">
        {firstDate} - {lastDate}{" "}
      </div>
      <div id="galleryMain" onClick={closeModal}>
        {(() => {
          let pics = [];
          for (let i = 0; i < PhotoArray.length; i++) {
            pics.push(
              <div className="picContainer" key={`${photoList[i].name}-image`}>
                <img
                  id={`photoImage-${i}`}
                  src={photoList[i].image}
                  alt={photoList[i].name}
                  className="photoArrayImage"
                  onClick={() => {
                    setViewImage(i);
                    changeViewingStatus("show");
                    changeViewingNumber(i);
                  }}
                />
              </div>
            );
          }
          return pics;
        })()}
      </div>
      <div
        className={`viewportContainer ${viewingStatus}`}
        onKeyDown={(e) => checkKey(e)}
        onClick={closeModal}
      >
        <img src={photoList[viewingNumber].image} className="viewport" alt="" />
        {/* <h3 className="viewportDate">{firstDate}</h3> */}
        {/* NEED TO ADD DATE HERE */}
        {/* ADD A CLOSE BTN TOO */}
      </div>
    </div>
  );
};

export default Gallery;
