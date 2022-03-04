import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import "../Loader/Loader.css";

export default function Loader() {
  return (
    <div className="paw-prints">
      <FontAwesomeIcon size="5x" className="paw icon1" icon={faPaw} />
      <FontAwesomeIcon size="5x" className="paw icon2" icon={faPaw} />
      <FontAwesomeIcon size="5x" className="paw icon3" icon={faPaw} />
    </div>
  );
}
