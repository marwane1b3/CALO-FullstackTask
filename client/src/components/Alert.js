import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

export const AlertComponnent = ({ visible, message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  if (show)
    return (
      <Alert
        className="mt-5"
        variant="success"
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>{message}</Alert.Heading>
      </Alert>
    );
  return null;
};
