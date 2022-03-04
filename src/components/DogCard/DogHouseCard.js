import React, { useEffect, useState } from "react";
import { useApi } from "../../services/axios.service";
import "./dogCard.css";

import { useToasts } from "../toastMessages/ToastService";

export default function DogHouseCard({
  dogName,
  id,
  url,
  imageUrl,
  status,
  onDogDeleted,
  onStatusChange,
}) {
  const api = useApi();
  const [newName, setNewName] = useState(dogName);
  const [timer, setTimer] = useState(null);

  var toast = useToasts();

  function deleteDog() {
    api
      .deleteDogFromList(id)
      .then((res) => {
        console.log("dog was deleted");
        onDogDeleted(id);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleSaving() {
    api
      .addDogToSavedList(id)
      .then((res) => {
        onStatusChange(status);
        toast.add({
          message: "Dog saved! You may now rename your dog.",
          sticky: true,
        });
        window.open(url);
        status++;
        window.location.reload();
        // setState(dogs.filter(d => d.id !== id))
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleNameChange() {
    if (newName !== dogName) {
      api
        .renameDog(newName, id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  useEffect(() => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        handleNameChange();
      }, 2000)
    );
  }, [newName]);

  return (
    <div className="dog-card-root">
      <div className="dog-card">
        <div className="img-container">
          <img src={imageUrl} />
        </div>
        {status === 1 && <h3>{dogName}</h3>}
        {status === 1 && <button onClick={handleSaving}>Save</button>}
        <div className="delete" onClick={deleteDog} value={id}>
          &times;
        </div>
        {status === 2 && (
          <input
            type="text"
            className="name-changer"
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
          />
        )}
      </div>
    </div>
  );
}
