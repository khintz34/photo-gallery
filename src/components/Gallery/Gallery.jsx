import React from "react";

import "./Gallery.css";

const Gallery = () => {
  return (
    <div id="galleryContainer">
      {(() => {
        let dots = [];
        for (let i = 0; i < 16; i++) {
          console.log(i);
          dots.push(<div>{i}</div>);
        }
        return dots;
      })()}
    </div>
  );
};

export default Gallery;
