import React, { useEffect, useState } from "react";
import "./Menu.css";
import { PhotoArray } from "../../assets/PhotoArray";
import { useViewPortStore } from "../../stores/viewPortStore";
import { useViewNumberStore } from "../../stores/viewNumberStore";
import { capAll } from "../../assets/utils";

const Menu = () => {
  const viewingStatus = useViewPortStore((state) => state.viewingStatus);
  const changeViewingStatus = useViewPortStore((state) => state.changeStatus);
  const viewingNumber = useViewNumberStore((state) => state.viewingNumber);
  const changeViewingNumber = useViewNumberStore((state) => state.changeStatus);
  const increaseNumber = useViewNumberStore((state) => state.increaseNumber);
  const decreaseNumber = useViewNumberStore((state) => state.decreaseNumber);
  const [placeList, setPlaceList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [albumList, setAlbumList] = useState([]);

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

  return (
    <div id="menuContainer">
      <ul className="menuList">
        <li>All Photos</li>
        <label htmlFor="people">People</label>

        <select name="people" id="people">
          <option value="" disabled selected hidden>
            Choose Person
          </option>
          {peopleList.map((val) => {
            return (
              <option value={val} key={`option-${val}-people`}>
                {val}
              </option>
            );
          })}
        </select>
        <label htmlFor="places">Places</label>

        <select name="places" id="places">
          <option value="" disabled selected hidden>
            Choose Place
          </option>
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
        <p>Albums</p>
        <ul className="menuList">
          {albumList.map((val) => {
            return <li key={`album-${val}`}>{val}</li>;
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
