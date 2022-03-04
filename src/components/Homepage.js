import React from "react";
import DogCard from "./DogCard/DogCard";
import NavBar from "./NavBar/NavBar";
import { useEffect, useState, useContext } from "react";
import { usePetFinderApi } from "../services/PetFinderApi.service";
import { useApi } from "../services/axios.service";
import { Context } from "../App";
import "../App.css";
import Loader from "./Loader/Loader";

export default function Homepage() {
  var [dogs, setDogs] = useState([]);
  var [lovedDogs, setLovedDogs] = useState([]);
  var [zip, setZip] = useState("");
  var [inputTimeout, setInputTimeout] = useState(null);
  const api = useApi();
  const petApi = usePetFinderApi();
  const { state } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  function getDogs() {
    petApi
      .getLotsOfDogs()
      .then((res) => {
        setIsLoading(true);
        setDogs(res.data.animals);
      })
      .catch((err) => {
        //console.log(err, err.response);
        // if(err.response.status)
      });
  }

  function getDogsByZipCode() {
    petApi.getDogsByZipCode(zip).then((res) => {
      setIsLoading(true);
      setDogs(res.data.animals);
    });
  }

  function getListByUser() {
    api
      .getLovedDogsByUserId(state.user.id)
      .then((res) => {
        setLovedDogs(res.data.dogs);
        console.log("loved: ", res.data.dogs);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function addDogToLovedList(newDog) {
    setLovedDogs([...lovedDogs, newDog]);
  }

  useEffect(() => {
    clearTimeout(inputTimeout);
    if (zip.length > 5) {
      setZip(zip.substring(0, 5));
    } else {
      setInputTimeout(
        setTimeout(() => {
          // valid zip code (maybe)
          setIsLoading(true);
          getDogsByZipCode();
        }, 3000)
      );
    }
  }, [zip]);

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

  useEffect(() => {
    if (state.user) {
      getListByUser();
    }
  }, [state.user]);

  useEffect(() => {
    if (dogs.length > 0) {
      setIsLoading(false);
    }
  }, [dogs]);

  var dogList = dogs.map((d) => {
    // find out if this dog is 'loved'
    let isLoved = false;
    for (let loved of lovedDogs) {
      if (d.id === loved.id) {
        // mark as special
        isLoved = true;
        break;
      }
    }

    return <DogCard key={d.id} {...d} isLoved={isLoved} />;
  });

  return (
    <div>
      <div className="dogs">
        <NavBar />
      </div>
      <h1>Enter a zipcode to see adoptable dogs near you!</h1>
      <input
        type="text"
        className="zip-code-input"
        name="location"
        placeholder="Zip Code"
        onChange={(e) => setZip(e.target.value)}
        value={zip}
      />
      <br />
      <br />
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="dogs-container">
          {dogs.map((d) => {
            // find out if this dog is 'loved'
            let isLoved = false;
            for (let loved of lovedDogs) {
              if (d.id == loved.id) {
                // mark as special
                isLoved = true;
                break;
              }
            }
            return (
              <DogCard
                key={d.id}
                {...d}
                addDogToLovedList={addDogToLovedList}
                isLoved={isLoved}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
