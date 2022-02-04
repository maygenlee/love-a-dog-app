import React from "react";
import DogCard from "./DogCard";
import SearchDogs from "./SearchDogs";
import ZipCodeEntry from "./ZipCodeEntry";

export default function Homepage() {
  return (
    <div>
      <p>This app is in development</p>
      <ZipCodeEntry />
      <SearchDogs />
      <DogCard />
    </div>
  );
}
