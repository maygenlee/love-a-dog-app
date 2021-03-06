import React, { useContext, useEffect, useState } from "react";
import { useApi } from "../../services/axios.service";
import "./dogCard.css";
import { Context } from "../../App";
import { useToasts } from "../toastMessages/ToastService";

export default function DogCard({
  id,
  breeds,
  name,
  gender,
  age,
  size,
  url,
  primary_photo_cropped,
  isLoved,
  addDogToLovedList,
}) {
  const { state } = useContext(Context);
  var { primary, secondary } = breeds;
  var dog = {
    dogId: id,
    dogName: name,
    url: url,
    imageUrl: primary_photo_cropped?.small,
    isLoved: isLoved,
  };

  if (state.user) {
    var userId = state.user.id;
    var dog = {
      ...dog,
      userId: userId,
    };
  }
  const api = useApi();
  var toast = useToasts();

  const getPhoto = () => {
    if (!primary_photo_cropped) {
      return (
        <img
          src={
            "https://th.bing.com/th/id/R.3540153ad4ed2d8eb92756cbc806cca0?rik=OHVDK18llqkZnA&riu=http%3a%2f%2fgetdrawings.com%2fimg%2fdog-paw-print-silhouette-13.jpg&ehk=2kRm3ZpAJK4dGbLZqQHK9swtJ%2fxZFICB5vhV6whiOD0%3d&risl=&pid=ImgRaw&r=0"
          }
        />
      );
    } else {
      return <img src={primary_photo_cropped.small} />;
    }
  };

  function handleLovingDog() {
    if (isLoved) {
      return;
    } else {
      api
        .addDogToLovedList(dog, state.user)
        .then((res) => {
          const dog = res.data;
          //window.location.reload();
          toast.add({
            message: "Dog loved! View in your doghouse.",
          });
          addDogToLovedList({
            id,
            breeds,
            name,
            gender,
            age,
            size,
            url,
            primary_photo_cropped,
            isLoved,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div className="dog-card-root">
      <div className="dog-card">
        <div className="img-container">{getPhoto()}</div>
        <h3>{name}</h3>
        {isLoved ? (
          <button>Loved</button>
        ) : (
          <button onClick={handleLovingDog}>Click to love me!</button>
        )}
        <div className="dog-info">
          <p>{breeds.primary}</p>
          <p>{gender}</p>
          <p>{age}</p>
          <p>Size: {size}</p>
        </div>
      </div>
    </div>
  );
}
