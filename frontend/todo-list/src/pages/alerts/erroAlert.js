import React, { useState } from "react";
import { Alert } from "react-bootstrap";

// import { Container } from './styles';

export default function ErroAlert(props) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} >
        {props.message}
      </Alert>
    );
  }
  return "";
}
