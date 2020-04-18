import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons/";
import styles from "./styles";
import logo from "../../assets/todolist.png";
import think from "../../assets/think.png";
import api from "../../api/api";
export default function CadastrarTarefa() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const token = route.params.token;

  function handleToBack() {
    navigation.goBack("Home");
  }

  async function handleCadastrarTarefa() {
    const data = {nome, descricao};
    await api
      .post("tarefas", data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        Alert.alert("", "Tarefa cadastrada com sucesso");
      })
      .catch((err) => {
        console.log(err.response.data.err);
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={handleToBack}>
          <AntDesign name="arrowleft" color="#64a88c" size={30} />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.cadastroTarefas}>
          <Image source={think} style={styles.think} />
          <TextInput
            placeholder="Nome Tarefa"
            style={styles.tarefaInput}
            onChangeText={(nome) => setNome(nome)}
          />
          <TextInput
            placeholder="Descrição Tarefa"
            style={styles.tarefaInput}
            onChangeText={(descricao) => setDescricao(descricao)}
          />

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.tarefaBtn}
              onPress={handleCadastrarTarefa}
            >
              <Text style={styles.btnText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
