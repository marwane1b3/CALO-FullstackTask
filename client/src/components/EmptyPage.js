import React from "react";
import { Container } from "react-bootstrap/esm";

const EmptyPage = ({ message = "" }) => {
  return (
    <Container
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        style={{
          color: "red",
          fontSize: 14,
          fontWeight: "bold",
        }}
      >
        {message}
      </span>
    </Container>
  );
};

export default EmptyPage;
