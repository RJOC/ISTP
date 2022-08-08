import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import descImg from "../assets/img/uoe.jpg";
import { Map, ChatDots, GeoAlt } from "react-bootstrap-icons";

export const Desc = () => {
  return (
    <section className="desc" id="home">
      <Container>
        <Row className="align-items-center">
          <h1>How ISTP Works</h1>
          <Col xs={12} md={6} xl={7} className="left">
            <h2>
              <Map size={50} />
              &nbsp;&nbsp;&nbsp; Create &amp; Join
            </h2>
            <p>Create your own trip or join trips proposed by other students</p>
            <h2>
              <ChatDots size={50} />
              &nbsp;&nbsp;&nbsp; Chat &amp; Plan
            </h2>
            <p>
              Chat with students to learn more about each other and plan a trip
              together
            </p>
            <h2>
              <GeoAlt size={50} />
              &nbsp;&nbsp;&nbsp; Meet &amp; Travel
            </h2>
            <p className="bottomSpace">
              Meet and travel Scotland with your new found friends
            </p>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img className="scotimg" src={descImg} alt="Scotland Outline" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
