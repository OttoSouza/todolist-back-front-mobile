import React, { useState } from "react";
import "./styles.css";
import logo from "../../assets/todo.png";

import {
  Button,
  Row,
  Col,
  Image,
  Jumbotron,
  Container,
  Form,
} from "react-bootstrap";

import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import ErroAlert from "../alerts/erroAlert";
import SuccessAlert from "../alerts/sucessAlert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [message, setMessageError] = useState([]);

  const handleCloseError = () =>
    setTimeout(function () {
      setError(false);
    }, 1000);

  const handleSendHistory = () =>
    setTimeout(function () {
      history.push("/home");
    }, 2000);

  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();
    const data = { email, senha };

    await api
      .post("usuarios/auth", data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("nome", response.data.usuario.nome);
        setSucesso(true);
        handleSendHistory();
      })
      .catch((err) => {
        setError(!error);
        setMessageError(err.response.data.err);
        handleCloseError();
      });
  }

  return (
    <>
      <Container className="login-container">
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Image src={logo} />
            <Form className="login-form">
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Informe o E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Informe a Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </Form.Group>
              {!error ? "" : <ErroAlert message={message} />}
              {sucesso ? (
                <SuccessAlert message="Voce sera redirecionado para pagina inicial" />
              ) : (
                ""
              )}
              <Button
                onClick={handleLogin}
                variant="outline-info"
                className="login-button"
              >
                Entrar
              </Button>
            </Form>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6}>
            <Jumbotron className="login-jumbotorn">
              <h1>
                <MdKeyboardArrowRight /> Olá,
              </h1>
              <p>
                Todo List foi desenvolvido para meios de aprendizado.
                Cadastre-se e adicione suas atividades para não esquece-las
              </p>

              <Button as={Link} to="/cadastrar" variant="outline-info">
                Cadastrar
              </Button>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </>
  );
}
