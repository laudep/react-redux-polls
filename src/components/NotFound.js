import React from "react";
import { Link } from "react-router-dom";
import { Row, Alert, Button, Image } from "react-bootstrap";

const NotFound = () => (
  <Row className="text-center justify-content-md-center not-found">
    <Alert variant="danger">
      <Alert.Heading>
        Oops!
        <br />
        There aren't any polls here.
      </Alert.Heading>
      <Link to="/">
        <Image
          src="../images/not_found.svg"
          alt="Page not found"
        />
        <Button variant="outline-dark">Home</Button>
      </Link>
    </Alert>
  </Row>
);

export default NotFound;
