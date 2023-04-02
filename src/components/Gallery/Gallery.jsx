import React, { useContext, useEffect, useRef, useState } from "react";
import { PhotoArray } from "../../assets/PhotoArray";
import "./Gallery.css";
import format from "date-fns/format";
import { useViewPortStore } from "../../stores/viewPortStore";
import { useViewNumberStore } from "../../stores/viewNumberStore";
import { useMenuStore } from "../../stores/menuStore";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGalleryStore } from "../../stores/photoGallery";
import {
  MainListContext,
  ShowHeaderContext,
} from "../../contexts/MainListContext";
import { GalleryListContext } from "../../contexts/GalleryListContext";
import { GalleryStyleContext } from "../../contexts/GalleryStyleContext";

const Gallery = () => {
  const { galleryList, setGalleryList } = useContext(GalleryListContext);
  const sortedPhotoArray = PhotoArray.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  let firstDate = format(new Date(galleryList[0].date), "PPP");
  let lastDate = format(new Date(galleryList.at(-1).date), "PPP");
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
  const { mainList, setMainList } = useContext(MainListContext);
  const { galleryStyle, setGalleryStyle } = useContext(GalleryStyleContext);
  const [columnNumber, setColumnNumber] = useState("1fr 1fr 1fr 1fr 1fr");
  const { showHeader, setShowHeader } = useContext(ShowHeaderContext);

  const closeModal = () => {
    if (viewingStatus === "show") {
      changeViewingStatus("hide");
    }
  };

  useEffect(() => {
    decideTemplateColumns();
  }, [galleryStyle]);

  const decideTemplateColumns = () => {
    let columnStyle = [];
    for (let i = 0; i < galleryStyle; i++) {
      columnStyle.push("1fr");
    }
    setColumnNumber(columnStyle.join(" "));
    console.log(columnStyle);
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
      if (viewingNumber === galleryList.length - 1) {
        changeViewingStatus("hide");
        return;
      }
      increaseNumber();
    } else if (e.keyCode == "40") {
      changeViewingStatus("hide");
    }
  }

  function removeImage(e) {
    changeViewingNumber(0);
    changeViewingStatus("hide");
    let activeImageName = galleryList[viewingNumber].name;
    let newArray = mainList;
    let removeNum;
    newArray.map((val, index) => {
      if (val.name === activeImageName) {
        removeNum = index;
      }
    });
    newArray.splice(removeNum, 1);
    setMainList(newArray);

    //also remove from gallery
    let newGallery = galleryList;
    newGallery.splice(viewingNumber, 1);
    if (newGallery.length === 0) {
      firstDate = format(new Date(mainList[0].date), "PPP");
      lastDate = format(new Date(mainList.at(-1).date), "PPP");
    }
    setGalleryList(newGallery);
  }

  return (
    <div id="galleryContainer">
      <div id="dateContainer">
        {firstDate} - {lastDate}{" "}
      </div>
      <div
        className="galleryMain"
        onClick={closeModal}
        style={{ gridTemplateColumns: columnNumber }}
      >
        {(() => {
          if (galleryList.length === 0) {
            return <div></div>;
          }
          let pics = [];
          for (let i = 0; i < galleryList.length; i++) {
            pics.push(
              <div
                className="picContainer"
                key={`${galleryList[i].name}-image-${i}`}
              >
                <img
                  id={`photoImage-${i}`}
                  src={galleryList[i].image}
                  alt={galleryList[i].name}
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
          src={galleryList[viewingNumber].image}
          className="viewport"
          alt=""
        />
        <h3 className="viewportDate">
          {format(new Date(galleryList[viewingNumber].date), "PPP")}
        </h3>
        <button className="exitBtn">
          <FontAwesomeIcon icon={faX} onClick={closeModal} />
        </button>
        <button className="removeImage" onClick={(e) => removeImage(e)}>
          Remove Image
        </button>
      </div>
    </div>
  );
};

export default Gallery;
