import React from "react";
import NavBar from "./NavBar/NavBar";
import { useEffect, useState, useContext } from "react";
import "../App.css";
import { useApi } from "../services/axios.service";
import { useParams } from "react-router-dom";
import "../components/DogCard/dogCard.css";
import DogHouseCard from "./DogCard/DogHouseCard";

export default function UserPage() {
  const api = useApi();
  const [dogs, setDogs] = useState([]);
  const { userId } = useParams();

  function getListByUser() {
    api
      .getLovedDogsByUserId(userId)
      .then((res) => {
        setDogs(res.data.dogs);
        console.log(res.data.dogs);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getLovedDogs() {
    return dogs.filter((dog) => dog.status === 1);
  }

  function getSavedDogs() {
    return dogs.filter((dog) => dog.status === 2);
  }

  function deleteDog(id) {
    setDogs(dogs.filter((d) => d.id !== id));
  }

  function handleStatusChange(id) {
    setDogs(
      dogs.map((d) => {
        if (d.id !== id) {
          return d;
        } else {
          return { ...d, status: 2 };
        }
      })
    );
  }

  function makeDogCard(dog) {
    return (
      <DogHouseCard
        key={dog.dogId}
        {...dog}
        onDogDeleted={deleteDog}
        onStatusChange={handleStatusChange}
      />
    );
  }

  useEffect(() => {
    getListByUser(userId);
  }, []);

  return (
    <div>
      <div>
        <NavBar />
        <h1>Welcome to your Dog House!</h1>
      </div>
      <div>
        <div>
          <h2>Your Loved Dogs:</h2>
          {getLovedDogs().map((d) => makeDogCard(d))}
        </div>
        <br />
        <div>
          <h1>
            Make a donation in honor of the pet to get to save and name them!
          </h1>
          <h2>Your Saved Dogs:</h2>
          {getSavedDogs().map((d) => makeDogCard(d))}
        </div>
      </div>
    </div>
  );
}
