import { StyleSheet } from "react-native";
import Contants from "expo-constants";
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Contants.statusBarHeight + 20,
    paddingHorizontal: 20,
    backgroundColor: "rgb(247,247,247)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },

  tarefaContainer: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },

  menuIcon: {
    marginLeft: 20,
  },

  tarefaPropriedade: {
    fontSize: 16,
    color: "#3fb16d",
    fontWeight: "bold",
  },
  tarefaValue: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 15,
    color: "#000",
  },
});
