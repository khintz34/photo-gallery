import React, { useState } from "react";
import { PhotoArray } from "../../assets/PhotoArray";
import "./Gallery.css";
import format from "date-fns/format";
import Viewport from "../viewingPort/ViewPort";

const Gallery = () => {
  const sortedPhotoArray = PhotoArray.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  const [photoList, setPhotoList] = useState(PhotoArray);

  const firstDate = format(new Date(photoList[0].date), "PPP");
  const lastDate = format(new Date(photoList.at(-1).date), "PPP");
  const [showViewport, setShowViewport] = useState("hide");
  const [viewImage, setViewImage] = useState(0);

  const closeModal = () => {
    if (showViewport === "show") {
      setShowViewport("hide");
    }
  };

  return (
    <div id="galleryContainer" onClick={closeModal}>
      <div id="dateContainer">
        {firstDate} - {lastDate}{" "}
      </div>
      <div id="galleryMain">
        {(() => {
          let pics = [];
          for (let i = 0; i < PhotoArray.length; i++) {
            pics.push(
              <div className="picContainer" key={`${photoList[i].name}-image`}>
                <img
                  src={photoList[i].image}
                  alt={photoList[i].name}
                  className="photoArrayImage"
                  onClick={() => {
                    setShowViewport("show");
                    setViewImage(i);
                  }}
                />
              </div>
            );
          }
          return pics;
        })()}
      </div>
      <div className="viewportContainer">
        <Viewport status={showViewport} list={photoList} num={viewImage} />
      </div>
    </div>
  );
};

export default Gallery;
