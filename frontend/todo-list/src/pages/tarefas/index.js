import React, { useState } from "react";
import "./styles.css";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import logo from "../../assets/todo.png";
import thinking from "../../assets/think.png";
import api from "../../services/api";
import ErroAlert from "../alerts/erroAlert";
export default function Tarefas() {
  
  const token = localStorage.getItem("token");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState(false);
  const [mensagem, setMensagem] = useState([]);

  const history = useHistory();

  async function handleTarefas(event) {
    event.preventDefault();
    const data = { nome, descricao };
    await api
      .post("tarefas", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        history.push("/home");
      })
      .catch((err) => {
        setError(!error);
        setMensagem(err.response.data.err);
      });
  }

  return (
    <Container className="tarefas-container">
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Image src={thinking} className="think" />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className="box">
            <Form className="tarefas-form">
              <Image src={logo} style={{ marginBottom: "15px" }} />
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Informe o Nome da tarefa"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Informe a Descrição da tarefa"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>

              {!error ? "" : <ErroAlert message={mensagem} />}

              <Row>
                <Col xs={6}>
                  <Button variant="outline-info" as={Link} to="/home">
                    <MdKeyboardArrowLeft />
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    variant="outline-info"
                    className="cadastro-button-cadastrar"
                    onClick={handleTarefas}
                  >
                    Adicionar
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
