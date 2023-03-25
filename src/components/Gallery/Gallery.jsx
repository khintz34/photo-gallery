import React, { useState } from "react";
import { PhotoArray } from "../../assets/PhotoArray";
import "./Gallery.css";

const Gallery = () => {
  const sortedPhotoArray = PhotoArray.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  const [photoList, setPhotoList] = useState(PhotoArray);

  console.log(photoList[0].date);

  return (
    <div id="galleryContainer">
      <div id="dateContainer">Date</div>
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
                />
              </div>
            );
          }
          return pics;
        })()}
      </div>
    </div>
  );
};

export default Gallery;
