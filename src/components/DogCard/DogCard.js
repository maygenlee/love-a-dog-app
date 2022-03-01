import React from "react";
import { useApi } from "../../services/axios.service";
import "./dogCard.css";

export default function DogCard({
  id,
  breeds,
  name,
  gender,
  age,
  size,
  url,
  primary_photo_cropped,
}) {
  var { primary, secondary } = breeds;
  var dog = {
    dogId: id,
    dogName: name,
    url: url,
  };

  const api = useApi();

  const getPhoto = () => {
    if (!primary_photo_cropped) {
      return <div>No photo</div>;
    } else {
      return <img src={primary_photo_cropped.small} />;
    }
  };

  function handleSavingDog() {
    api
      .addDogToLovedList(dog)
      .then((res) => {
        const dog = res.data;
        console.log(dog);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="dog-card-root">
      <div className="dog-card">
        <div>{getPhoto()}</div>
        <button onClick={handleSavingDog}>Click to love me!</button>
        <h1>{name}</h1>
        <h3>{breeds.primary}</h3>
        <h3>{gender}</h3>
        <h3>{age}</h3>
        <h3>{size}</h3>
      </div>
    </div>
  );
}
