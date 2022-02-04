import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./login.css";
import { Context } from "../../App";

export default function LoginPage() {
  var { http, state, setState, localStorageService } = useContext(Context);

  const navigate = useNavigate();

  function attemptLogin(user) {
    http
      .login(user)
      .then((res) => {
        //200 login success
        console.log(res.data.user);
        localStorageService.saveUser(res.data.user);
        setState({ ...state, user: res.data.user });
        navigate(`/`);

        //navigate(`/user/${res.data.user.id}`);
      })
      .catch((err) => {
        console.log(err);
        //mayb 404 email not exist
        //password not right 400
      });
  }

  return (
    <div className="login">
      <h1>Welcome!</h1>
      <LoginForm onSubmit={attemptLogin} />
      <hr />
      <Link to="/signup">
        <button type="button">Sign Up</button>
      </Link>
    </div>
  );
}

function LoginForm({ onSubmit }) {
  var [user, setUser] = useState({ email: "", password: "" });

  function handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (user.email && user.password) {
      onSubmit(user);
    }
  }

  return (
    <div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email"> Email: </label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="email"
            required
          />
          <br />
          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
          <br />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}
