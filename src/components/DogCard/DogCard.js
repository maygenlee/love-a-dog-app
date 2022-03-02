import React, { useContext } from "react";
import { useApi } from "../../services/axios.service";
import "./dogCard.css";
import { Context } from "../../App";

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
  const { state } = useContext(Context);
  var { primary, secondary } = breeds;
  var dog = {
    dogId: id,
    dogName: name,
    url: url,
    imageUrl: primary_photo_cropped.small,
  };

  if (state.user) {
    var dog = {
      ...dog,
      userId: state.user.id,
    };
  }

  const api = useApi();

  const getPhoto = () => {
    if (!primary_photo_cropped) {
      return <div>No photo</div>;
    } else {
      return <img src={primary_photo_cropped.small} />;
    }
  };

  function handleLovingDog() {
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
        <div className="img-container">{getPhoto()}</div>
        <button onClick={handleLovingDog}>Click to love me!</button>
        <h1>{name}</h1>
        <div className="dog-info">
          <p>Breed: {breeds.primary}</p>
          <p>Sex: {gender}</p>
          <p>Age: {age}</p>
          <p>Size: {size}</p>
        </div>
      </div>
    </div>
  );
}
