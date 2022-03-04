import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import Icon from "../Images/Icon.JPG";
import { Context } from "../../App";
import { useLocalStorage } from "../../services/localStorage.service";

export default function NavBar({ links }) {
  const [windowSize, setWindowSize] = useState({});
  const [isMobileBarOpen, setIsMobileBarOpen] = useState(false);
  const { state } = useContext(Context);
  const localStorage = useLocalStorage();

  const dropdownOptions = [{}, {}];

  useEffect(() => {
    function handleResize() {
      // // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const longNavBar = (
    <div className="nav-bar">
      <div className="links">
        <span className="home-link active">
          <Link to={`/`}>
            <span>
              <img src={Icon} width="40" />
            </span>
          </Link>
        </span>
        <Link to={`/`}>
          <h1>Love-A-Dog</h1>
        </Link>

        {links?.map((link, i) => {
          if (Array.isArray(link)) {
            //dropdown
            return <Dropdown key={i} text={link[0]} contents={link[1]} />;
          } else {
            //just a reg link
            return <span className="link fancy-hover"></span>;
          }
        })}

        <span className="links fancy-hover"></span>
        <Dropdown text="" contents={dropdownOptions} />
      </div>

      {/*search bar here ie <SearchBar /> */}

      <div className="long-nav">
        {state.user ? (
          <>
            <Link to={`/user/${state.user.id}`}>
              <button type="button" className="primary">
                Dog House
              </button>
            </Link>
            <Link to={`/login`}>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeActiveUser();
                }}
              >
                Logout
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to={`/login`}>
              <button type="button" className="primary">
                Log In
              </button>
            </Link>
            <Link to={`/signup`}>
              <button type="button">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );

  const mobileNavBar = (
    <div className="nav-bar mobile">
      <div className="links">
        <span className="home-link fancy-hover active">
          <Link to={`/`}>
            <span>
              <img src={Icon} width="35" />
            </span>
          </Link>
        </span>
        <Link to={`/`}>
          <h1>Love-A-Dog</h1>
        </Link>
        <span
          className="hamburger-icon"
          onClick={() => {
            setIsMobileBarOpen(!isMobileBarOpen);
          }}
        >
          {!isMobileBarOpen ? "☰" : "✕"}
        </span>
      </div>

      {isMobileBarOpen && (
        <div className="right-menu">
          <div className="nav-buttons">
            {state.user ? (
              <>
                <Link to={`/user/${state.user.id}`}>
                  <button type="button" className="primary">
                    Dog House
                  </button>
                </Link>
                <Link to={`/login`}>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeActiveUser();
                    }}
                  >
                    Logout
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to={`/login`}>
                  <button type="button" className="primary">
                    Log In
                  </button>
                </Link>
                <Link to={`/signup`}>
                  <button type="button">Sign Up</button>
                </Link>
              </>
            )}
          </div>

          {links?.map((link, i) => {
            if (Array.isArray(link)) {
              return <Accordion key={i} text={link[0]} contents={link[1]} />;
            } else {
              return (
                <div key={i} className="link fancy-hover">
                  {link.text}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );

  const isMobile = windowSize.width < 650;

  return (
    <div className={`nav-bar-root ${isMobile ? "mobile" : ""}`}>
      {isMobile ? mobileNavBar : longNavBar}
    </div>
  );
}

function Dropdown({ text, contents }) {
  function handleClick(target) {
    /**
     * react-router:
     * navigate()
     */
  }

  return (
    <span className="dropdown-parent fancy-hover">
      <div className="hoverable">{text}</div>
      <div className="hidden-menu">
        {contents.map((c, i) => (
          <div
            key={i}
            className="option fancy-hover"
            onClick={() => {
              handleClick(c.target);
            }}
          >
            {c.text}
          </div>
        ))}
      </div>
    </span>
  );
}

function Accordion({ text, contents }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(target) {
    /**
     * react-router:
     * navigate()
     */
  }

  return (
    <>
      <div
        className="accordion clickable fancy-hover"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {text}
      </div>
      <div className={`accordion hidden-menu ${isOpen ? "open" : ""}`}>
        {contents.map((c, i) => (
          <div
            key={i}
            className="option fancy-hover"
            onClick={() => {
              handleClick(c.target);
            }}
          >
            {c.text}
          </div>
        ))}
      </div>
    </>
  );
}
