import React, { useState } from "react";

import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "./styles";
import logo from "../../assets/todolist.png";
import { useNavigation } from "@react-navigation/native";
import api from "../../api/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState([]);

  const navigation = useNavigation();

  function navigationtoCadastroUsuario() {
    navigation.navigate("Cadastrar_Usuario");
  }

  async function handleLogin(event) {
    event.preventDefault();
    const data = { email, senha };
    await api
      .post("usuarios/auth", data)
      .then((response) => {
        AsyncStorage.multiSet([
          ["usuario", JSON.stringify(response.data.usuario)],
          ["token", JSON.stringify(response.data.token)],
        ]);
        navigation.navigate("Home");
      })
      .catch((err) => {
        setError(err.response.data.err);
      });
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Image style={styles.logo} source={logo} />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            onChangeText={(senha) => setSenha(senha)}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.usuarioBtn} onPress={handleLogin}>
              <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.usuarioBtn}
              onPress={navigationtoCadastroUsuario}
            >
              <Text style={styles.btnText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
