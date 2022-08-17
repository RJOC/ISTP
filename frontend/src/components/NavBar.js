import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import Logreg from "./Misc/Logreg";
import NavPro from "./Misc/NavPro";

import logo from "../assets/img/logo.png";

export const NavBar = () => {
  const [scrolled, seScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        seScrolled(true);
      } else {
        seScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className={"navbar-link"}>
              Home
            </Nav.Link>
            <Nav.Link href="/inspire" className={"navbar-link"}>
              Discover
            </Nav.Link>
            <Nav.Link href="/groups" className={"navbar-link"}>
              Groups
            </Nav.Link>
            <Nav.Link href="/chat" className={"navbar-link"}>
              Chats
            </Nav.Link>
            &nbsp;&nbsp;&nbsp;
          </Nav>

          {/*START OF TESTING */}
          <Nav>{loggedIn ? <NavPro /> : <Logreg />}</Nav>
          {/*End of testing */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
