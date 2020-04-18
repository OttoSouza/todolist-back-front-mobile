import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons/";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import logo from "../../assets/todolist.png";
import api from "../../api/api";
export default function CadastrarUsuarios() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  async function handleCadastroUsuario(event) {
    event.preventDefault();
    const data = { nome, senha, email };
    await api
      .post("usuarios", data)
      .then((response) => {
        Alert.alert(
          "Cadastro realizado com sucesso",
          "Obrigado por se cadastrar"
        );
      })
      .catch((err) => {
        Alert.alert("Erro ao Cadastrar", `${err.response.data.err}`, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]);
      });
  }

  function navigateBack() {
    navigation.goBack();
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.cadastroContainer}>
          <View style={styles.header}>
            <TouchableOpacity>
              <MaterialIcons
                name="arrow-back"
                size={28}
                color="#64a88c"
                onPress={navigateBack}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <TextInput
              style={styles.input}
              placeholder="Nome"
              onChangeText={(nome) => setNome(nome)}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              onChangeText={(senha) => setSenha(senha)}
            />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              onChangeText={(email) => setEmail(email)}
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.usuarioBtn}
                onPress={handleCadastroUsuario}
              >
                <Text style={styles.btnText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
