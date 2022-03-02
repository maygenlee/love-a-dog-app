import React, { useState } from "react";
import { useApi } from "../../services/axios.service";
import "./dogCard.css";

export default function DogHouseCard({
  dogName,
  id,
  url,
  imageUrl,
  status,
  onDogDeleted,
}) {
  const api = useApi();

  function deleteDog() {
    api
      .deleteDogFromList(id)
      .then((res) => {
        console.log("dog was deleted");
        onDogDeleted(id);
      })
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
        <div className="img-container">
          <img src={imageUrl} />
        </div>
        <h2>{dogName}</h2>
        {status === 1 && (
          <button onClick={handleSaving}>Click to save me!</button>
        )}
        <div className="delete" onClick={deleteDog} value={id}>
          &times;
        </div>
      </div>
    </div>
  );
}
