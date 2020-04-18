import React, { useState } from "react";
import { Alert } from "react-bootstrap";

// import { Container } from './styles';

export default function SuccessAlert(props) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} >
        {props.message}
      </Alert>
    );
  }
  return "";
}
