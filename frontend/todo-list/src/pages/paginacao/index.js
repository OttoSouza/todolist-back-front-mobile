import React from "react";
import { Pagination } from "react-bootstrap";

export default function Paginacao(props) {
  const numeroPaginas = [];

  for (let i = 1; i <= Math.ceil(props.tarefas / props.tarefaPorPagina); i++) {
    numeroPaginas.push(i);
  }

  return (
    <Pagination>
      {numeroPaginas.map((numero) => (
        <Pagination.Item onClick={() => props.mudarPagina(numero)}
        key={numero}>{numero}</Pagination.Item>
      ))}
    </Pagination>
  );
}
