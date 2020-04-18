import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../services/api";
import { MdDelete } from "react-icons/md";
import ErroAlert from "../alerts/erroAlert";
export default function DeletarTarefa(props) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);
  const handleClose = () =>
    setTimeout(function () {
      setShow(false);
    }, 2000);
  
  const handleShow = () => setShow(true);

  async function handleDelete(id) {
    await api
      .delete(`/tarefas/${id}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((response) => {
        setMessage(true);
        handleClose();
      })
      .catch((err) => {
        alert("Tarefa nao pode ser deletada");
      });
  }

  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>
        <MdDelete />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "17px" }}>
            Você deseja deletar, "<strong>{props.tarefa.nome}</strong>" ?
          </Modal.Title>
        </Modal.Header>
        {message ? (
              <ErroAlert
                message="Tarefa Deleteada com Sucesso"
              />
            ) : (
              ""
            )}
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="info" onClick={() => handleDelete(props.tarefa.id)}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
