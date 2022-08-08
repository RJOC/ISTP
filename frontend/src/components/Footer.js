import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";


export const Footer = () => {
    return (
      <footer className="footer">
        <Container className="foottext">
          <Row className="align-items-center">
            <Col size={12} sm={6}>
            <Link to="/" style={{ textDecoration: 'none' }}> <img src={logo} alt="Logo" /></Link>
            </Col>
            <Col size={12} sm={6} className="text-center text-sm-end">
                    <p>An Online Platform to Encourage International Students to Explore Scotland</p>
                    <p>Masters Dissertation - s2238084</p>
            </Col>
          </Row>
        </Container>
      </footer>
    )
  }