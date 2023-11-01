"use client";
import React from 'react'
import styles from "./card.module.css";
import Image from 'next/image';
function Card({ data }) {
  const landing = Object.values(data?.rocket?.first_stage?.cores?.map(land_success => `${land_success?.land_success}`))?.join(',')
  const {
    mission_name,
    flight_number,
    mission_id,
    launch_year,
    launch_success,
    links,
  } = data ?? [];

  return (
    <React.Fragment>
      <div className={styles.card}>
        <div className={styles.imgContainer}>
          <Image
            src={links.mission_patch_small ?? "https://external-preview.redd.it/M4NA3mh7yh6pPSYpY2_bA-rS1MYXLaad81RPaCsu4F4.jpg?auto=webp&s=6a674775d355944412c57d66225a4c21861f5c56"}
            fill={true}
            alt='rocket-logo'
            sizes="100vh"
            className={styles.images}
            priority
          />
        </div>
        <div className={styles.cardTitles}>
          <p style={{ color: "#4f5272" }}>
            {mission_name} #{flight_number}
          </p>
          <div>
            <p>Mission Ids: <span>{mission_id?.join(",") ? mission_id?.join(",") : <span style={{ color: "lightgray" }}>
              Data not found
            </span>}</span></p>
            {/* <ul className={styles.ul}>
              <li >{mission_id?.join(",")}</li>
            </ul> */}
          </div>
          <p>
            Launch Year: <span >{launch_year}</span>
          </p>
          <p>
            Successful Launch:
            <span >
              {String(launch_success)}
            </span>
          </p>
          <p>
            Successful Landing: <span >{landing === "null" || landing === "undefined" ? <span style={{ color: "lightgray" }}>
              Data not found
            </span>
              : landing}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Card