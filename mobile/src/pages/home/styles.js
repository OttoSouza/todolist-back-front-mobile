import { StyleSheet } from "react-native";
import Contants from "expo-constants";
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: Contants.statusBarHeight + 20,
    backgroundColor: "rgb(247,247,247)",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    
  },

  menuIcon: {
    padding: 10,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20,
    color: "#000",
  },

  headerDescription: {
    fontSize: 24,
    paddingHorizontal: 10,
    color: "#9e9e9e",
  },

  tarefaList: {
    marginTop: 40
  },

  tarefa: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff'
  },

  tarefaPropriedade: {
    fontSize: 16,
    color: "#3fb16d",
    fontWeight: 'bold'
  },

  tarefaValue: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 15,
    color: "#000",
  },

  tarefaInformacoes:  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  tarefaInformacoesLink: {
    color: '#64a88c',
    fontSize: 15,
    fontWeight: "bold"
  }

});
