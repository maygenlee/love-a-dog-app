import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { useLocalStorage } from "../../services/localStorage.service";
import { useApi } from "../../services/axios.service";

export default function SignUpPage() {
  const { state, setState } = useContext(Context);
  var navigate = useNavigate();
  var api = useApi();
  var localStorage = useLocalStorage();

  function attemptSignUp(user) {
    api
      .createNewUser(user)
      .then((res) => {
        const user = res.data.user;
        localStorage.saveUser(user);
        setState({ ...state, user });
        navigate(`/user/${user.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="login">
      <h1>Sign Up Now For Love-A-Dog!</h1>
      <SignUpForm onSubmit={attemptSignUp} api={api} />
      <hr />
      <Link to="/login">
        <button type="button">Log In</button>
      </Link>
    </div>
  );
}

function SignUpForm({ onSubmit, api }) {
  var [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthday: "",
  });
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
      api
        .getUserByEmail(user.email)
        .then((res) => {
          setIsEmailTaken(true);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setIsEmailTaken(false);
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
          <div className="firstName">
            <label htmlFor="firstName"> First Name: </label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div className="lastName">
            <label htmlFor="lastName"> Last Name: </label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="birthday">
            <label htmlFor="birthday"> Birthday: </label>
            <input
              type="text"
              name="birthday"
              value={user.birthday}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
              required
            />
          </div>
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
