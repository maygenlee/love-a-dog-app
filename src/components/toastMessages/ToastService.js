import React, { createContext, useContext, useState } from "react";
import Toast from "./Toast";
import "./ToastParent.css";

const ToastContext = createContext(null);
var id = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function removeToast(id) {
    setToasts(
      toasts.filter((t) => {
        return t.id !== id;
      })
    );
  }

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
      <ToastMessenger toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToasts(params) {
  var { toasts, setToasts } = useContext(ToastContext);

  function addToast(toast) {
    if (!toast.position) {
      toast.position = "top-left";
    }
    setToasts([...toasts, { id: id++, ...toast }]);
  }

  return {
    success: (message, summary) => {
      let status = "success";
      addToast({
        message,
        summary,
        status,
        sticky: false,
      });
    },
    error: (message, summary) => {
      let status = "error";
      addToast({ message, summary, status, sticky: false });
    },
    info: (message, summary) => {
      let status = "info";
      addToast({ message, summary, status, sticky: false });
    },
    warn: (message, summary) => {
      let status = "warn";
      addToast({ message, summary, status, sticky: false });
    },
    add: ({ message, summary, sticky, position }) => {
      if (!message) {
        return;
      }
      let status = "success";
      addToast({
        message,
        summary,
        status,
        sticky,
        position,
      });
    },
    clear: () => {
      setToasts([]);
    },
  };
}

export function ToastMessenger({ toasts, removeToast }) {
  return (
    <div className="toast-parent">
      <div className="top left">
        {toasts
          .filter((t) => t.position === "top-left")
          .map((t) => (
            <Toast key={t.id} {...t} removeToast={removeToast} />
          ))}
      </div>
      <div className="top right">
        {toasts
          .filter((t) => t.position === "top-right")
          .map((t) => (
            <Toast key={t.id} {...t} removeToast={removeToast} />
          ))}
      </div>
      <div className="bottom left">
        {toasts
          .filter((t) => t.position === "bottom-left")
          .map((t) => (
            <Toast key={t.id} {...t} removeToast={removeToast} />
          ))}
      </div>
      <div className="bottom right">
        {toasts
          .filter((t) => t.position === "bottom-right")
          .map((t) => (
            <Toast key={t.id} {...t} removeToast={removeToast} />
          ))}
      </div>
    </div>
  );
}
