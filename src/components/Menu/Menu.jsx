import React, { useEffect, useRef, useState } from "react";
import "./Menu.css";
import { PhotoArray } from "../../assets/PhotoArray";
import { useViewPortStore } from "../../stores/viewPortStore";
import { useViewNumberStore } from "../../stores/viewNumberStore";
import { capAll } from "../../assets/utils";
import { useMenuStore } from "../../stores/menuStore";
import { useGalleryStore } from "../../stores/photoGallery";

const Menu = () => {
  const [placeList, setPlaceList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const changeViewingStatus = useViewPortStore((state) => state.changeStatus);
  const changeAlbum = useMenuStore((state) => state.changeAlbum);
  const currentAlbum = useMenuStore((state) => state.album);
  const changePerson = useMenuStore((state) => state.changePerson);
  const changePlace = useMenuStore((state) => state.changePlace);
  const photoGallery = useGalleryStore((state) => state.gallery);
  const changeGallery = useGalleryStore((state) => state.changeGallery);
  const placeRef = useRef();
  const personRef = useRef();

  const getPlaceList = () => {
    let placesList = [];
    PhotoArray.map((val) => {
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
    PhotoArray.map((val) => {
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
    PhotoArray.map((val) => {
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
  }, []);

  const makePersonChange = (e) => {
    changePerson(e.target.value);
    changePlace("");
    placeRef.current.selectedIndex = 0;
  };

  const makePlaceChange = (e) => {
    changePlace(e.target.value);
    changePerson("");
    personRef.current.selectedIndex = 0;
  };

  const viewAlbum = (e, name) => {
    changePerson("");
    changePlace("");
    changeAlbum();
    placeRef.current.selectedIndex = 0;
    personRef.current.selectedIndex = 0;

    if (name === "") {
      changeGallery(PhotoArray);
      return;
    }

    let newList = [];
    PhotoArray.map((value) => {
      if (value.album.toLowerCase() === name.toLowerCase()) {
        newList.push(value);
      }
    });

    changeGallery(newList);
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
        <button>Add Photo</button>
        <div className="spacing">
          <label htmlFor="sliderInput"># per view</label>
          <input type="range" id="sliderInput" />
        </div>
      </section>
    </div>
  );
};

export default Menu;
