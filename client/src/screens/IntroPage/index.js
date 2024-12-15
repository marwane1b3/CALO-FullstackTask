import React from "react";
import "./IntroPage.css";
import { VerticalStack } from "src/components/Stack";
import { Container } from "react-bootstrap";
export const IntroPage = () => {
  return (
    <div className="full-image">
      <Container
        fluid
        className="pt-4"
        style={{
          marginTop: 50,
        }}
      >
        <VerticalStack />
      </Container>
    </div>
  );
};
