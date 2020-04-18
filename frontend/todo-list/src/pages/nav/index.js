import React from "react";
import { MdExitToApp, MdPlaylistAdd } from "react-icons/md";
import { Image, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/todo.png";
import "./styles.css";

export default function Header(props) {
  const history = useHistory();
  const nome = localStorage.getItem("nome");
  function handleSair() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <>
      <Navbar className="header-container">
        <Navbar.Brand>
          <Image src={logo} />
        </Navbar.Brand>
        <Navbar.Text>
          Seja bem vindo, <strong>{nome}</strong>
        </Navbar.Text>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link to="/tarefas">
            <MdPlaylistAdd size="30" color="#000" />
          </Link>

          <MdExitToApp
            size="25"
            color="#000"
            onClick={handleSair}
            type="submit"
          />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
