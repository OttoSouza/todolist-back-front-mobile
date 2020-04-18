import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import styles from "./styles.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons/";
import logo from "../../assets/todolist.png";
import api from "../../api/api.js";

// import { Container } from './styles';

export default function Informacoes() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const route = useRoute();

  const tarefa = route.params.tarefas;
  const token = route.params.token;

  function handleToBack() {
    navigation.goBack("Home");
  }

  async function handleAtualizar(id) {
    const data = { nome, descricao };
    await api
      .put(`tarefas/${id}`, data, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      .then((response) => {
        Alert.alert("", "Tarefa atualizada com Sucesso");
      })
      .catch((err) => {
        console.log(err.response.data.err);
      });
  }

  async function handleDeletar(id) {
    await api
      .delete(`tarefas/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      .then((response) => {
        Alert.alert("", "Tarefa deletada com Sucesso");
      })
      .catch((err) => {
        console.log(err.response.data.err);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity>
          <AntDesign
            name="arrowleft"
            color="#64a88c"
            size={30}
            onPress={handleToBack}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity onPress={() => handleAtualizar(tarefa.id)}>
          <AntDesign
            name="edit"
            color="rgb(253,184,52)"
            size={25}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletar(tarefa.id)}>
          <AntDesign
            name="delete"
            color="rgb(241,90,91)"
            size={25}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tarefaContainer}>
        <Text style={styles.tarefaPropriedade}>Nome Tarefa</Text>
        <TextInput
          style={styles.tarefaValue}
          onChangeText={(nome) => setNome(nome)}
        >
          {tarefa.nome}
        </TextInput>

        <Text style={styles.tarefaPropriedade}>Descricao Tarefa</Text>
        <TextInput
          style={styles.tarefaValue}
          onChangeText={(descricao) => setDescricao(descricao)}
        >
          {tarefa.descricao}
        </TextInput>

        <Text style={styles.tarefaPropriedade}>Data Tarefa</Text>
        <Text style={styles.tarefaValue}> {tarefa.data_criacao} </Text>
      </View>
    </View>
  );
}
