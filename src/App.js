import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import LoginPage from "./components/Login_SignUp/LoginPage";
import SignUpPage from "./components/Login_SignUp/SignUpPage";
import UserPage from "./components/UserPage";
import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "./services/localStorage.service";

export var Context = createContext();

function App() {
  const [state, setState] = useState({
    user: undefined,
  });
  const localStorage = useLocalStorage();

  useEffect(() => {
    var activeUser = localStorage.getActiveUser();
    if (activeUser) {
      setState({ ...state, user: activeUser });
    }
  }, []);

  useEffect(() => {
    console.log("app use effect");
    console.log(state);
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        state,
        setState,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/user/:userId" element={<UserPage />}></Route>
            <Route
              path="*"
              element={<div>404 - page does not exist</div>}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default App;
