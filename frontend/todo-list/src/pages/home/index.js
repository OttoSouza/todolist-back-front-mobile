import React, { useState, useEffect } from "react";
import "./styles.css";
import { Container, Row, Col, Table } from "react-bootstrap";

import Header from "../nav";
import AtualizarTarefas from "../atualizar_tarefa";
import DeletarTarefa from "../deletar_tarefa";
import Paginacao from "../paginacao";
import api from "../../services/api";

export default function Home() {
  const token = localStorage.getItem("token");

  const [tarefas, setTarefas] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tarefasPorPagina] = useState(4);

  const ultimaPagina = paginaAtual * tarefasPorPagina;
  const primeiraPagina = ultimaPagina - tarefasPorPagina;
  const atualTarefa = tarefas.slice(primeiraPagina, ultimaPagina);

  useEffect(() => {
    api
      .get("tarefas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTarefas(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  function handleMudarPagina(numero) {
    setPaginaAtual(numero);
  }

  const row = atualTarefa.map((tarefa) => (
    <tr key={tarefa.id}>
      <td>{tarefa.nome}</td>
      <td>{tarefa.descricao}</td>
      <td>{tarefa.data_criacao}</td>
      <td>
        <AtualizarTarefas tarefa={tarefa} token={token} />

        <DeletarTarefa tarefa={tarefa} token={token} />
      </td>
    </tr>
  ));

  return (
    <div className="home-container">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Header />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>{row}</tbody>
            </Table>
          </Col>
          <Col>
            <Paginacao
              tarefas={tarefas.length}
              tarefaPorPagina={tarefasPorPagina}
              mudarPagina={handleMudarPagina}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
