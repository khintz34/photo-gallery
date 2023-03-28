import React, { useEffect, useRef, useState } from "react";
import { PhotoArray } from "../../assets/PhotoArray";
import "./Gallery.css";
import format from "date-fns/format";
import { useViewPortStore } from "../../stores/viewPortStore";
import { useViewNumberStore } from "../../stores/viewNumberStore";
import { useMenuStore } from "../../stores/menuStore";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGalleryStore } from "../../stores/photoGallery";

const Gallery = () => {
  const sortedPhotoArray = PhotoArray.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  const [photoList, setPhotoList] = useState(PhotoArray);

  const firstDate = format(new Date(photoList[0].date), "PPP");
  const lastDate = format(new Date(photoList.at(-1).date), "PPP");
  const [viewImage, setViewImage] = useState(0);
  const viewingStatus = useViewPortStore((state) => state.viewingStatus);
  const changeViewingStatus = useViewPortStore((state) => state.changeStatus);
  const viewingNumber = useViewNumberStore((state) => state.viewingNumber);
  const changeViewingNumber = useViewNumberStore((state) => state.changeStatus);
  const increaseNumber = useViewNumberStore((state) => state.increaseNumber);
  const decreaseNumber = useViewNumberStore((state) => state.decreaseNumber);
  const currentPlace = useMenuStore((state) => state.place);
  const photoGallery = useGalleryStore((state) => state.gallery);
  const masterList = useGalleryStore((state) => state.masterList);
  const updateMaster = useGalleryStore((state) => state.changeMasterList);

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
      if (viewingNumber === photoGallery.length - 1) {
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
          for (let i = 0; i < photoGallery.length; i++) {
            pics.push(
              <div
                className="picContainer"
                key={`${photoGallery[i].name}-image`}
              >
                <img
                  id={`photoImage-${i}`}
                  src={photoGallery[i].image}
                  alt={photoGallery[i].name}
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
        <img
          src={photoGallery[viewingNumber].image}
          className="viewport"
          alt=""
        />
        <h3 className="viewportDate">
          {format(new Date(photoList[viewingNumber].date), "PPP")}
        </h3>
        <button className="exitBtn">
          <FontAwesomeIcon icon={faX} onClick={closeModal} />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
