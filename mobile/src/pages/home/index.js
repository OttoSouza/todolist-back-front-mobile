import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  AsyncStorage,
  Alert,
} from "react-native";
import styles from "./styles.js";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons/";
import api from "../../api/api";
import logo from "../../assets/todolist.png";

export default function Home() {
  const navigation = useNavigation();
  const [nome, setNome] = useState([]);
  const [token, setToken] = useState("");
  const [tarefas, setTarefas] = useState([]);

  AsyncStorage.getItem("token")
    .then((result) => {
      const data = JSON.parse(result);
      setToken(data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });

  AsyncStorage.getItem("usuario")
    .then((result) => {
      const data = JSON.parse(result);
      setNome(data.nome);
    })
    .catch((err) => {
      console.log(err.response.data);
    });

  function navigatetoCadastrarTarefa() {
    navigation.navigate("Cadastrar_Tarefa", { token });
  }

  function navigatetoToInformacoes(tarefas) {
    navigation.navigate("Informacoes", { tarefas, token });
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      `${nome}, deseja sair?`,
      "",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: logout },
      ],
      { cancelable: false }
    );

  function carregarTarefas() {
    api
      .get("tarefas", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setTarefas(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.err);
      });
  }

  function logout() {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("usuario");
    navigation.navigate("Login");
  }

  useEffect(() => {
    carregarTarefas();
  }, [token, tarefas]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />

        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={navigatetoCadastrarTarefa}
          >
            <AntDesign name="pluscircleo" size={30} color="#909f95" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={createTwoButtonAlert}
          >
            <AntDesign name="logout" size={30} color="#909f95" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.headerTitle}>
        Bem vindo, <Text style={{ color: "#64a88c" }}>{nome}</Text>
      </Text>
      <Text style={styles.headerDescription}>Essas são suas atividades</Text>

      <FlatList
        data={tarefas}
        style={styles.tarefaList}
        keyExtractor={(tarefa) => String(tarefa.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: tarefas }) => (
          <View style={styles.tarefa}>
            <Text style={styles.tarefaPropriedade}>Nome Tarefa: </Text>
            <Text style={styles.tarefaValue}>{tarefas.nome}</Text>

            <Text style={styles.tarefaPropriedade}>Descricao Tarefa: </Text>
            <Text style={styles.tarefaValue}>{tarefas.descricao}</Text>

            <TouchableOpacity
              style={styles.tarefaInformacoes}
              onPress={() => navigatetoToInformacoes(tarefas)}
            >
              <Text style={styles.tarefaInformacoesLink}>Mais Informações</Text>
              <AntDesign name="arrowright" size={24} color="#64a88c" />
            </TouchableOpacity>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
