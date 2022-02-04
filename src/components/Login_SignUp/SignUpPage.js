import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Context } from "../../App";

export default function SignUpPage() {
  const { http, localStorageService } = useContext(Context);
  var navigate = useNavigate();

  function attemptSignUp(user) {
    http
      .createNewUser(user)
      .then((res) => {
        const user = res.data.user;
        console.log(res);
        localStorageService.saveUser(user);
        navigate(`/user/${user.id}`);
        // navigate away to user's page -> useNavigate ?
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="login">
      <h1>Sign Up Now!</h1>
      <SignUpForm onSubmit={attemptSignUp} http={http} />
      <hr />
      <Link to="/login">
        <button type="button">Log In</button>
      </Link>
    </div>
  );
}

function SignUpForm({ onSubmit, http }) {
  var [user, setUser] = useState({ email: "", password: "" });
  const [isEmailTaken, setIsEmailTaken] = useState(false);

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

  useEffect(() => {
    if (user.email) {
      http
        .getUserByEmail(user.email)
        .then((res) => {})
        .catch((err) => {
          if (err.response.status == 404) {
            setIsEmailTaken(false);
          } else if (err.response.status == 401) {
            setIsEmailTaken(true);
          } else {
            console.err(err);
          }
        });
    }
  }, [user.email]);

  return (
    <div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="email">
            {isEmailTaken && (
              <div className="error-message">* Email is already taken</div>
            )}
            <label htmlFor="email"> Email: </label>
            <input
              type="text"
              className={isEmailTaken ? "email-taken" : ""}
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="email"
              required
            />
          </div>

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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
