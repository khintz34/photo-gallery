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

  const getPlaceList = () => {
    let list = [];
    PhotoArray.map((val) => {
      if (val.places.length !== 0) {
        val.places.map((place) => {
          list.push(capAll(place));
          console.log(capAll(place));
        });
      }
    });
    eliminateDuplicates(list);
  };

  function eliminateDuplicates(arr) {
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
    sortList(out);
  }

  function sortList(arr) {
    arr.sort();
    setPlaceList(arr);
  }

  useEffect(() => {
    getPlaceList();
  }, []);

  return (
    <div id="menuContainer">
      <ul className="menuList">
        <li>All Photos</li>
        <li>People</li>
        <li>Places</li>
        <label htmlFor="places">Places</label>

        <select name="places" id="places">
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
          <li>ALNUM NAME EX</li>
          <li>Example</li>
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
