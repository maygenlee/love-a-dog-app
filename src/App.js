import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import LoginPage from "./components/Login_SignUp/LoginPage";
import SignUpPage from "./components/Login_SignUp/SignUpPage";
import UserPage from "./components/UserPage";
import { createContext, useEffect, useState } from "react";

const axiosService = require("./services/axios.service");
const localStorageService = require("./services/localStorage.service");

export const Context = createContext();

function App() {
  const [state, setState] = useState({
    user: undefined,
  });

  useEffect(() => {
    var activeUser = localStorageService.getActiveUser();
    if (activeUser) {
      setState({ ...state, user: activeUser });
    }
  }, []);
  return (
    <Context.Provider
      value={{
        http: axiosService,
        localStorageService,
        state,
        setState,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />}>
              <Route path="login" element={<LoginPage />}></Route>
              <Route path="signup" element={<SignUpPage />}></Route>
              <Route path="user" element={<UserPage />}></Route>
            </Route>
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
