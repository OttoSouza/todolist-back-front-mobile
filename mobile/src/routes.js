import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./pages/login";
import CadastrarUsuarios from "./pages/cadastrar_usuario";
import Home from "./pages/home";
import CadastrarTarefa from "./pages/cadastrar_tarefa";
import Informacoes from "./pages/informacoes";

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen
          name="Cadastrar_Usuario"
          component={CadastrarUsuarios}
        />
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Cadastrar_Tarefa" component={CadastrarTarefa} />
        <AppStack.Screen name="Informacoes" component={Informacoes} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
