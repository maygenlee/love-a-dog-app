import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { Context } from "../../App";
import { useApi } from "../../services/axios.service";
import { useLocalStorage } from "../../services/localStorage.service";

export default function LoginPage() {
  return (
    <div className="login">
      <h1>Welcome to Love-A-Dog!</h1>
      <LoginForm />
      <hr />
      <Link to="/signup">
        <button type="button">Sign Up</button>
      </Link>
    </div>
  );
}

function LoginForm() {
  var { state, setState } = useContext(Context);
  const api = useApi();
  const localStorage = useLocalStorage();
  const navigate = useNavigate();
  var emailRef = useRef(null);
  var passwordRef = useRef(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  }

  function attemptLogin(e) {
    e.preventDefault();
    if (user.email && user.password) {
      api
        .login(user)
        .then((res) => {
          localStorage.saveUser(res.data.user);
          setState({ ...state, user: res.data.user });
          navigate(`/user/${res.data.user.id}`);
        })
        .catch((err) => {
          console.log(err);
          setUser({ email: "", password: "" });
        });
    }
  }

  return (
    <div>
      <div className="form">
        <form onSubmit={attemptLogin}>
          <label htmlFor="email"> Email: </label>
          <input
            ref={emailRef}
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="password"> Password: </label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}
