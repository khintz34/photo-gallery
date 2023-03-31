import { useState } from "react";

import "./App.css";
import { PhotoArray } from "./assets/PhotoArray";
import Container from "./components/Container/Container";
import { MainListContext } from "./contexts/MainListContext";
import { GalleryListContext } from "./contexts/GalleryListContext";

function App() {
  const [mainList, setMainList] = useState(PhotoArray);
  const [galleryList, setGalleryList] = useState(PhotoArray);
  return (
    <div className="App">
      <MainListContext.Provider value={{ mainList, setMainList }}>
        <GalleryListContext.Provider value={{ galleryList, setGalleryList }}>
          <Container />
        </GalleryListContext.Provider>
      </MainListContext.Provider>
    </div>
  );
}

export default App;
