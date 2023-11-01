"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from 'react-dom'
import styles from "./main.module.css";
import Card from "@/components/Card";
import Loader from "@/components/Loader";

const years = [
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",

];
const launch_success = [
  false,
  true
];
const launch_landing = [
  false,
  true
];

function FilterContentBox({ title, data, property, getData, array }) {
  const uniqueLaunchYears = [...new Set(data?.map((item) => item[property]))];

  const [active, setActive] = useState(0);

  return (
    <React.Fragment>
      <div className={styles.subTitle}>
        <p>{title}</p>
      </div>
      <div className={styles.yearsContainer}>
        {array?.map((item, index) => (
          String(item) !== "undefined" && <p
            onClick={() => {
              getData(100, property, item)
              setActive(index)
            }}
            key={index}
            className={active === index ? styles.activeYears : ""}
          >
            {String(item)}
          </p>

        ))}
      </div>
    </React.Fragment>
  );
}





const Main = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    console.log("Render...")
  }, [isActive])
  const getData = async (limit, property, item) => {
    if (property === 'launch_success') {
      console.log(property, item)
      setIsActive(true)
      const response = fetchData_launch_success(setIsLoading, setIsActive, property, item)
      setData(await response)
      setIsActive(false)
      setIsLoading(false)
    }
    if (property === 'launch_year') {
      console.log(property, item)
      setIsActive(true)
      const response = fetchData_launch_years(setIsLoading, setIsActive, property, item)
      setData(await response)
      setIsActive(false)
      setIsLoading(false)
    }
    if (property === 'land_success') {
      console.log(property, item)
      setIsActive(true)
      const response = fetchData_land_success(setIsLoading, setIsActive, property, item)
      const result = await response

      setData(result)
      setIsActive(false)
      setIsLoading(false)
    }
  };



  async function fetchData_launch_success(setIsLoading, setIsActive, property, item) {
    const response = await fetch(`https://api.spacexdata.com/v3/launches?limit=100&${property}=${item}`);
    if (response.ok) {
      setIsActive(false)
      setIsLoading(true)
    }
    return await response.json();
  }
  async function fetchData_launch_years(setIsLoading, setIsActive, property, item) {
    const response = await fetch(`https://api.spacexdata.com/v3/launches?limit=100&${property}=${parseInt(item)}`);
    if (response.ok) {
      setIsActive(false)
      setIsLoading(true)
    }
    return await response.json();
  }
  //https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true
  async function fetchData_land_success(setIsLoading, setIsActive, property, item) {
    console.log(property, item)
    const response = await fetch(`https://api.spacexdata.com/v3/launches?limit=100&${property}=${item}`);
    if (response?.ok) {
      setIsActive(false)
      setIsLoading(true)
    }
    return await response.json();
  }


  useEffect(() => {
    //All Data
    async function getAllData() {
      const response = await fetch(`https://api.spacexdata.com/v3/launches?limit=100`);
      if (response.ok) {
        setIsLoading(true)
      }
      return await response.json();
    }
    getAllData().then((result) => {
      if (isNaN(result)) {
        setIsLoading(false)
        setData(result)
      }

    });
  }, []);



  return (
    <main className={styles.mainContainer} style={{ filter: isLoading ? "blur(5px)" : "" }}>
      <div className={styles.titleHeading}>
        <p className={styles.desktopView}>DESKTOP VIEW</p>
        <p className={styles.mobileView}>MOBILE VIEW</p>
      </div>
      <div className={styles.content}>
        <div className={styles.contentHeading}>
          <p>SpaceX Launch Programs</p>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.sideBar}>
            <p className={styles.title}> Filter</p>

            <FilterContentBox
              array={years}
              title='Launch Year'
              data={data}
              getData={getData}
              property='launch_year'
            />
            <FilterContentBox array={launch_success} title='Successful Launch' data={data} property='launch_success' getData={getData} />
            <FilterContentBox array={launch_landing} getData={getData} title='Successful Landing' data={data}
              property='land_success'

            />
          </div>
          <div className={styles.CardsContainer}>
            {isLoading ? Loader() : data?.map((item, index) => (
              <Card data={item} key={index} index={index} />
            ))}

          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
