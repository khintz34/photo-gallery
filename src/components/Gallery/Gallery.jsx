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
import { MainListContext } from "../../contexts/MainListContext";
import { GalleryListContext } from "../../contexts/GalleryListContext";
import { GalleryStyleContext } from "../../contexts/GalleryStyleContext";

const Gallery = () => {
  const { galleryList, setGalleryList } = useContext(GalleryListContext);
  const sortedPhotoArray = PhotoArray.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  const firstDate = format(new Date(galleryList[0].date), "PPP");
  const lastDate = format(new Date(galleryList.at(-1).date), "PPP");
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

  const closeModal = () => {
    console.log("closing");
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
    console.log(viewingNumber);
    let newArray = mainList;
    newArray.splice(viewingNumber, 1);
    console.log(newArray);
    setMainList(newArray);
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
