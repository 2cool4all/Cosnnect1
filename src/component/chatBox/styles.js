import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";

export default StyleSheet.create({
  chatContainer: { padding: 4, backgroundColor: color.WHITE, borderTopRightRadius: 20, marginLeft:5 },
  chatTxt: {
    color: color.BLACK,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "500",
    padding: 10,
  },
});
