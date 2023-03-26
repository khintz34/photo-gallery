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

  const closeModal = () => {
    if (viewingStatus === "show") {
      changeViewingStatus("hide");
    }
  };

  useEffect(() => {
    console.log(viewingStatus);
  });

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
                    setViewImage(i);
                    changeViewingStatus("show");
                  }}
                />
              </div>
            );
          }
          return pics;
        })()}
      </div>
      <div className={`viewportContainer ${viewingStatus}`}>
        <Viewport list={photoList} num={viewImage} />
      </div>
    </div>
  );
};

export default Gallery;
