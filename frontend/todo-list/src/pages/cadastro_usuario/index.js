import React, { useState } from "react";
import "./styles.css";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import logo from "../../assets/todo.png";
import api from "../../services/api";
import ErroAlert from "../alerts/erroAlert";
import SuccessAlert from "../alerts/sucessAlert";

export default function CadastrarUsuario() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState([]);
  const [sucesso, setSucesso] = useState(false);
  const history = useHistory();

  const handleCloseError = () =>
    setTimeout(function () {
      setError(false);
    }, 2000);

  const handleSendHistory = () =>
    setTimeout(function () {
      history.push("/");
    }, 2000);

  async function handleRegistrar(event) {
    event.preventDefault();

    const data = { nome, senha, email };

    await api
      .post("usuarios", data)
      .then((response) => {
        setSucesso(true);
        handleSendHistory();
      })
      .catch((err) => {
        setError(!error);
        setMessage(err.response.data.err);
        handleCloseError();
      });
  }

  return (
    <Container className="cadastro-container">
      <Row>
        <Col xs={12}>
          <Image src={logo} />
        </Col>
        <Col xs={12}>
          <Form style={{ marginBottom: "10px" }}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Informe o Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Informe a senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Informe o E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {!error ? "" : <ErroAlert message={message} />}
            {sucesso ? (
              <SuccessAlert message="Usuario Cadastrado com sucesso" />
            ) : (
              ""
            )}
            <Row>
              <Col xs={6}>
                <Button variant="outline-info" as={Link} to="/">
                  <MdKeyboardArrowLeft />
                </Button>
              </Col>
              <Col xs={6}>
                <Button
                  variant="outline-info"
                  className="cadastro-button-cadastrar"
                  onClick={handleRegistrar}
                >
                  Cadastrar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
