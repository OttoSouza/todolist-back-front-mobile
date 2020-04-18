import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(247,247,247)",
    paddingHorizontal: 30,
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
    justifyContent: "space-between",
    width: "90%",
  },

  usuarioBtn: {
    backgroundColor: "#64a88c",
    padding: 15,
    width: "45%",
  },

  btnText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
  },
});
