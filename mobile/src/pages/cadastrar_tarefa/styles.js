import { StyleSheet } from "react-native";
import Contants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Contants.statusBarHeight + 20,
    backgroundColor: "rgb(247,247,247)",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 5,
    marginBottom: 100,
  },

  cadastroTarefas: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  tarefaInput: {
    width: "90%",
    padding: 15,
    marginBottom: 10,
    borderBottomColor: "#000",
    borderBottomWidth: 0.3,
    backgroundColor: "#ffffff",
    color: "#000",
  },

  think: { marginBottom: 30 },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },

  tarefaBtn: {
    backgroundColor: "#64a88c",
    padding: 15,
    width: "50%",
  },

  btnText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
  },
});
