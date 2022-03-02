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
        {dogs.map((d) => (
          <DogHouseCard key={d.id} value={d.id} {...d} />
        ))}
      </div>
    </div>
  );
}
