import { useState } from "react";

import "./App.css";
import { PhotoArray } from "./assets/PhotoArray";
import Container from "./components/Container/Container";
import { MainListContext } from "./contexts/MainListContext";
import { GalleryListContext } from "./contexts/GalleryListContext";
import { GalleryStyleContext } from "./contexts/GalleryStyleContext";

function App() {
  const [mainList, setMainList] = useState(PhotoArray);
  const [galleryList, setGalleryList] = useState(PhotoArray);
  const [galleryStyle, setGalleryStyle] = useState("1fr 1fr 1fr 1fr 1fr");
  return (
    <div className="App">
      <MainListContext.Provider value={{ mainList, setMainList }}>
        <GalleryListContext.Provider value={{ galleryList, setGalleryList }}>
          <GalleryStyleContext.Provider
            value={{ galleryStyle, setGalleryStyle }}
          >
            <Container />
          </GalleryStyleContext.Provider>
        </GalleryListContext.Provider>
      </MainListContext.Provider>
    </div>
  );
}

export default App;
