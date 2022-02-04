import "./App.css";
import { usePetFinderApi } from "./services/PetFinderApi.service";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import UserPage from "./components/UserPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Homepage />}>
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
      <Test />
    </div>
  );
}

export default App;

function Test() {
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
