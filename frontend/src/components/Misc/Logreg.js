import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useEffect, useState } from "react";

const Logreg = () => {
  const [activeLink, setActiveLink] = useState("home");

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <div>
      <Nav.Link
        href="/login "
        className={
          activeLink === "login" ? "active navbar-link" : "navbar-link"
        }
        onClick={() => onUpdateActiveLink("login")}
      >
        Login
      </Nav.Link>

      <Nav.Link
        href="/register"
        className={
          activeLink === "register" ? "active navbar-link" : "navbar-link"
        }
        onClick={() => onUpdateActiveLink("register")}
      >
        Register
      </Nav.Link>
    </div>
  );
};

export default Logreg;
