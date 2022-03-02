import React, { useState } from "react";
import { useApi } from "../../services/axios.service";
import "./dogCard.css";

export default function DogHouseCard({ dogName, id, url, imageUrl, status }) {
  const api = useApi();

  function deleteDog() {
    api
      .deleteDogFromList(id)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  }

  function handleSaving() {
    api
      .addDogToSavedList(id)
      .then((res) => {
        console.log("dog saved!");
        window.open(url);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="dog-card-root">
      <div className="dog-card">
        <div className="dog-info">
          <div>
            <button className="delete" onClick={deleteDog} value={id}>
              X
            </button>
            <img src={imageUrl} />
            <h2>{dogName}</h2>
            <p>{status}</p>
            <button onClick={handleSaving}>Click to save me!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
