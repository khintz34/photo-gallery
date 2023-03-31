import React, { useContext, useEffect, useRef, useState } from "react";
import "./Menu.css";
import { PhotoArray } from "../../assets/PhotoArray";
import { useViewPortStore } from "../../stores/viewPortStore";
import { useViewNumberStore } from "../../stores/viewNumberStore";
import { capAll } from "../../assets/utils";
import { useMenuStore } from "../../stores/menuStore";
import { useGalleryStore } from "../../stores/photoGallery";
import testImage from "../../assets/photoLib/bridgeV.jpg";
import format from "date-fns/format";
import { MainListContext } from "../../contexts/MainListContext";
import { GalleryListContext } from "../../contexts/GalleryListContext";

const Menu = () => {
  const [placeList, setPlaceList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [addStatus, setAddStatus] = useState("down");
  const changeViewingStatus = useViewPortStore((state) => state.changeStatus);
  const changeAlbum = useMenuStore((state) => state.changeAlbum);
  const currentAlbum = useMenuStore((state) => state.album);
  const changePerson = useMenuStore((state) => state.changePerson);
  const changePlace = useMenuStore((state) => state.changePlace);
  const viewingNumber = useViewNumberStore((state) => state.viewingNumber);
  const placeRef = useRef();
  const personRef = useRef();
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDate, setNewDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [newPeople, setNewPeople] = useState([]);
  const [newAlbum, setNewAlbum] = useState("");
  const [newPlace, setNewPlace] = useState("");
  const { mainList, setMainList } = useContext(MainListContext);
  const { galleryList, setGalleryList } = useContext(GalleryListContext);
  const changeViewingNumber = useViewNumberStore((state) => state.changeStatus);

  const getPlaceList = () => {
    let placesList = [];
    mainList.map((val) => {
      if (val.places.length !== 0) {
        val.places.map((place) => {
          placesList.push(capAll(place));
        });
      }
    });
    eliminateDuplicates(placesList, "places");
  };

  const getPeopleList = () => {
    let peoplesList = [];
    mainList.map((val) => {
      if (val.people.length !== 0) {
        val.people.map((person) => {
          peoplesList.push(capAll(person));
        });
      }
    });
    eliminateDuplicates(peoplesList, "people");
  };

  const getAlbumList = () => {
    let list = [];
    mainList.map((val) => {
      list.push(capAll(val.album));
    });
    eliminateDuplicates(list, "album");
  };

  function eliminateDuplicates(arr, name) {
    let i,
      len = arr.length,
      out = [],
      obj = {};

    for (i = 0; i < len; i++) {
      obj[arr[i]] = 0;
    }
    for (i in obj) {
      out.push(i);
    }
    sortList(out, name);
  }

  function sortList(arr, name) {
    arr.sort();
    if (name === "places") {
      setPlaceList(arr);
    } else if (name === "people") {
      setPeopleList(arr);
    } else {
      setAlbumList(arr);
    }
  }

  useEffect(() => {
    getPlaceList();
    getPeopleList();
    getAlbumList();
    console.log(galleryList);
    console.log(mainList);
  }, [mainList]);

  const makePersonChange = (e) => {
    changeViewingNumber(0);
    const person = e.target.value;
    changePerson(person);
    changePlace("");
    setAddStatus("down");
    placeRef.current.selectedIndex = 0;
    changeAlbum("");

    if (person === "All") {
      setGalleryList(mainList);
      return;
    }

    let newList = [];
    mainList.map((value) => {
      value.people.map((name) => {
        if (name === person) {
          newList.push(value);
        }
      });
    });

    setGalleryList(newList);
  };

  const makePlaceChange = (e) => {
    changeViewingNumber(0);
    const place = e.target.value;
    setAddStatus("down");
    changePerson(place);
    changePerson("");
    personRef.current.selectedIndex = 0;
    changeAlbum("");

    if (place === "All") {
      setGalleryList(mainList);
      return;
    }

    let newList = [];
    mainList.map((value) => {
      value.places.map((loc) => {
        if (loc.toLowerCase() === place.toLowerCase()) {
          newList.push(value);
        }
      });
    });

    setGalleryList(newList);
  };

  const viewAlbum = (e, name) => {
    changeViewingNumber(0);
    changePerson("");
    changePlace("");
    changeAlbum();
    setAddStatus("down");
    placeRef.current.selectedIndex = 0;
    personRef.current.selectedIndex = 0;

    if (name === "") {
      setGalleryList(mainList);
      return;
    }

    let newList = [];
    mainList.map((value) => {
      if (value.album.toLowerCase() === name.toLowerCase()) {
        newList.push(value);
      }
    });

    console.log(newList);

    setGalleryList(newList);
  };

  const addPhoto = () => {
    if (newImage.length < 1 || newName === "") return;
    setAddStatus("down");
    if (newDate === "") setNewDate(new Date());
    let urlCreate = URL.createObjectURL(newImage);
    let list = mainList;
    console.log(newPlace);
    let item = {
      name: newName,
      image: urlCreate,
      date: new Date(newDate),
      album: newAlbum,
      people: [newPeople],
      places: [newPlace],
    };
    console.log(item);
    list.push(item);
    setGalleryList(list);
    setMainList([...list]);
  };

  return (
    <div id="menuContainer">
      <ul className="menuList">
        <li className="album-li" onClick={(e) => viewAlbum(e, "")}>
          All Photos
        </li>
        <label htmlFor="people">People</label>

        <select
          name="people"
          id="people"
          onChange={makePersonChange}
          ref={personRef}
        >
          <option value="" disabled hidden selected>
            Choose Person
          </option>
          <option value="All">All</option>
          {peopleList.map((val) => {
            return (
              <option value={val} key={`option-${val}-people`}>
                {val}
              </option>
            );
          })}
        </select>
        <label htmlFor="places">Places</label>

        <select
          name="places"
          id="places"
          onChange={makePlaceChange}
          ref={placeRef}
        >
          <option value="" disabled selected hidden>
            Choose Place
          </option>
          <option value="All">All</option>
          {placeList.map((val) => {
            return (
              <option value={val} key={`option-${val}`}>
                {val}
              </option>
            );
          })}
        </select>
      </ul>
      <div className="albumList">
        <p className="album-li" onClick={(e) => viewAlbum(e, "")}>
          Albums
        </p>
        <ul className="menuList">
          {albumList.map((val) => {
            return (
              <li
                key={`album-${val}`}
                onClick={(e) => viewAlbum(e, val)}
                className="album-li"
              >
                {val}
              </li>
            );
          })}
        </ul>
      </div>
      <section className="bottomSection spacing">
        <button onClick={() => setAddStatus("up")}>Add Photo</button>
        <div className="spacing">
          <label htmlFor="sliderInput"># per view</label>
          <input type="range" id="sliderInput" />
        </div>
      </section>
      <div className={`${addStatus} addPhotoModal`}>
        <h3>Add Photo to Gallery</h3>
        <div className="photoInputs">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setNewImage(e.target.files[0]);
              console.log(e);
            }}
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Title"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Album"
            value={newAlbum}
            onChange={(e) => setNewAlbum(e.target.value)}
          />
          <input
            type="text"
            placeholder="People (seperate with commas)"
            value={newPeople}
            onChange={(e) => {
              let string = e.target.value;
              string.split(", ");
              console.log(string);
              setNewPeople(string);
            }}
          />
          <input
            type="text"
            placeholder="Place"
            value={newPlace}
            onChange={(e) => setNewPlace(e.target.value)}
          />
        </div>
        <button onClick={addPhoto}>Submit</button>
      </div>
    </div>
  );
};

export default Menu;
