import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import CadastrarUsuario from "./pages/cadastro_usuario";
import Home from "./pages/home";
import Tarefas from "./pages/tarefas";
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/cadastrar" component={CadastrarUsuario} />
        <Route path="/home" component={Home} />
        <Route path="/tarefas" component={Tarefas} />
      </Switch>
    </BrowserRouter>
  );
}
