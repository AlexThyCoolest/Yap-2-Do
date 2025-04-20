import { StyleSheet } from "react-native";

export default StyleSheet.create({
  logo: {
    textAlign: "center",
    color: "#6e22b0",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 40,
    padding: 0,
  },

  subText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 40,
    padding: 0,
  },

  landingButton: {
    backgroundColor: "rgb(148, 68, 214)",
    borderRadius: 50,
    boxShadow:
      "inset 4px 4px 10px rgba(110, 34, 176, 0.5), inset -4px -4px 10px rgba(200, 140, 255, 0.7), 4px 4px 10px rgba(110, 34, 176, 0.15), -4px -4px 10px rgba(200, 140, 255, 0.25)",
    color: "#fff",
    cursor: "pointer",
    fontSize: 18,
    width: 200,
    height: 65,
    borderWidth: 2,
    borderColor: "rgb(180, 110, 240)",
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },

  buttonText: {
    color: "white",
    textAlign: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },

  checkbox: {
    borderRadius: 20,
    marginBottom: 20,
    marginLeft: 10,
  },

  voiceButton: {
    backgroundColor: "rgb(148, 68, 214)",
    borderRadius: "50%",
    boxShadow:
      "inset 4px 4px 10px rgba(110, 34, 176, 0.5), inset -4px -4px 10px rgba(200, 140, 255, 0.7), 4px 4px 10px rgba(110, 34, 176, 0.15), -4px -4px 10px rgba(200, 140, 255, 0.25)",
    color: "#fff",
    cursor: "pointer",
    fontSize: 18,
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "rgb(180, 110, 240)",
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorContainer: {
    backgroundColor: "#ffeded",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#d32f2f",
  },

  timerContainer: {
    alignItems: "center",
    // paddingTop: 150,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
  },

  timerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
