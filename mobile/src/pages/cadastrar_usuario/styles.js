import { StyleSheet } from "react-native";
import Constans from "expo-constants";
export default StyleSheet.create({
  cadastroContainer: {
    flex: 1,
    backgroundColor: "rgb(247,247,247)",
  },
  header: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: Constans.statusBarHeight + 20,
  },
  container: {
    flex: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  
  input: {
    width: "90%",
    padding: 15,
    marginBottom: 10,
    borderBottomColor: "#000",
    borderBottomWidth: 0.3,
    color: "#000",
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },

  usuarioBtn: {
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
