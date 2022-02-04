import React from "react";
import DogCard from "./DogCard";
import NavBar from "./NavBar/NavBar";
import SearchDogs from "./SearchDogs";
import ZipCodeEntry from "./ZipCodeEntry";
import { useEffect, useState } from "react";
import { usePetFinderApi } from "../services/PetFinderApi.service";
import "../App.css";
import SignUpPage from "./Login_SignUp/SignUpPage";

export default function Homepage() {
  var [dogs, setDogs] = useState([]);

  function GetAllDogs() {
    const petApi = usePetFinderApi();

    useEffect(() => {
      petApi
        .getDogById(54421012)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
          // if(err.response.status)
        });
    }, []);

    return <p>To Be Completed March 1st</p>;
  }

  /*useEffect(() => {
    GetAllDogs();
  }, []); */

  return (
    <div className="dogs">
      <NavBar />
      <p>This app is in development</p>
    </div>
  );
}
/*{<ZipCodeEntry />
      <SearchDogs />
      <DogCard />} 
      {dogs.map((dog) => (
        <DogCard key={dog.id} {...dog} />
      ))}
      */
