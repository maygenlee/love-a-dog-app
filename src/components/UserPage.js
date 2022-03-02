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

  function deleteDog(id) {
    setDogs(dogs.filter((d) => d.id !== id));
  }

  function makeDogCard(dog) {
    return <DogHouseCard key={dog.id} {...dog} onDogDeleted={deleteDog} />;
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
          <h2>Loved List:</h2>
          {getLovedDogs().map((d) => makeDogCard(d))}
        </div>
        <br />
        <div>
          <h2>Saved List:</h2>
          {dogs.filter((dog) => dog.status === 2).map((d) => makeDogCard(d))}
        </div>
      </div>
    </div>
  );
}
