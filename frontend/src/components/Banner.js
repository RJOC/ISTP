import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import headerImg from "../assets/img/header-img.png";

export const Banner = () => {
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline">University of Edinburgh</span>
            <h1>International Student Travel Portal</h1>
            <p> Travel Scotland with friends you're yet to meet...</p>
            <span className="butcen center">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search Travel Groups"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-light">Search</Button>
              </Form>
            </span>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img className="scotimg" src={headerImg} alt="Scotland Outline" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
