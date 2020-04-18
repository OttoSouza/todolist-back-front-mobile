import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, Container } from "react-bootstrap";
import api from "../../services/api";
import { MdEdit } from "react-icons/md";

import SuccessAlert from "../alerts/sucessAlert";
import ErroAlert from "../alerts/erroAlert";

export default function AtaulziarTarefa(props) {
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState(props.tarefa.nome);
  const [descricao, setDescricao] = useState(props.tarefa.descricao);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState([]);
  const [sucesso, setSucesso] = useState(false);

  const handleClose = () =>
    setTimeout(function () {
      setShow(false);
    }, 1000);
  const handleShow = () => setShow(true);

  const handleCloseError = () =>
    setTimeout(function () {
      setError(false);
    }, 2000);

  async function handleEditar(id) {
    const data = { nome, descricao };
    await api
      .put(`/tarefas/${id}`, data, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((response) => {
        setNome(nome);
        setDescricao(descricao);
        setSucesso(true);
        handleClose();
      })
      .catch((err) => {
        setError(!error);
        setMessage(err.response.data.err);
        handleCloseError();
      });
  }
  return (
    <>
      <Button variant="outline-warning" onClick={handleShow}>
        <MdEdit />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Informe os Dados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row className="show-grid">
                <Col xs={12}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Informe o Nome da tarefa"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Informe a Descrição da tarefa"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            {!error ? "" : <ErroAlert message={message} />}
            {sucesso ? (
              <SuccessAlert message="Tarefa Atualizada com Sucesso" />
            ) : (
              ""
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="info" onClick={() => handleEditar(props.tarefa.id)}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
