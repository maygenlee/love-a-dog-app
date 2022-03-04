import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import "./toast.css";

function Toast({ id, message, status, summary, sticky, removeToast }) {
  function handleOnClick() {
    removeToast(id);
  }

  if (!sticky) {
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }

  var icon = faCommentAlt;

  if (status == "success") {
    icon = faCheck;
  } else if (status == "info") {
    icon = faInfoCircle;
  } else if (status == "warn") {
    icon = faExclamationTriangle;
  } else if (status == "error") {
    icon = faBan;
  } else {
    status = "message";
  }

  return (
    <div className={`toast-root ${status} ${sticky && "sticky"}`}>
      <FontAwesomeIcon size="2x" className="icon" icon={icon} />
      <div className="summary">{summary || status}</div>
      <div>{message || "..."}</div>
      <span onClick={handleOnClick} className="x-button">
        x
      </span>
    </div>
  );
}

export default Toast;
