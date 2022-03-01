import React from "react";
import DogCard from "./DogCard/DogCard";
import NavBar from "./NavBar/NavBar";
import { useEffect, useState } from "react";
import { usePetFinderApi } from "../services/PetFinderApi.service";
import "../App.css";

export default function Homepage() {
  var [dogs, setDogs] = useState([]);
  var [zip, setZip] = useState("");

  const petApi = usePetFinderApi();
  console.log("pet api responded");

  const handleSubmit = (e) => {
    setZip(e.target);
  };

  function getDogs(zip) {
    console.log(petApi);
    petApi
      .getLotsOfDogs(zip)
      .then((res) => {
        console.log(res.data);
        setDogs(res.data.animals);
      })
      .catch((err) => {
        //console.log(err, err.response);
        // if(err.response.status)
      });
  }

  useEffect(() => {
    if (petApi.isReady()) {
      // status is good
      getDogs();
    } else {
      // need a token
      petApi
        .getNewToken()
        .then((res) => {
          petApi.updateAuthToken(res.data.access_token);
          // now send request
          getDogs();
        })
        .catch((err) => {
          console.error(err, "error getting token");
        });
    }
  }, []);

  return (
    <div>
      <div className="dogs">
        <NavBar />
      </div>
      <h1>Enter a zipcode to see adoptable dogs near you!</h1>
      <form className="zip-input" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Zip Code" name="location" />
      </form>
      <div>
        {dogs.map((d) => (
          <DogCard key={d.id} {...d} />
        ))}
      </div>
    </div>
  );
}
