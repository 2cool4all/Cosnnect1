import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";
import { TRANSPARENT } from "../../utility/colors";

export default StyleSheet.create({
  sendMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  input: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: "70%",
  },

  sendBtnContainer: {
    backgroundColor: TRANSPARENT,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
