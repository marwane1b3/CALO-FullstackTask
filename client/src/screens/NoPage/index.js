import React from "react";
import { Container } from "react-bootstrap/esm";

const NoPage = () => {
  return (
    <Container
      fluid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>no page found !</span>
    </Container>
  );
};

export default NoPage;
