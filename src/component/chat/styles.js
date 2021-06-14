import { StyleSheet } from "react-native";
import { appStyle, color } from "../../utility";
import { TRANSPARENT } from "../../utility/colors";

export default StyleSheet.create({
  input: {
    paddingLeft:15,
    marginLeft:5,
    backgroundColor: color.WHITE,
    borderRadius:15,
    width: "86%",
    color: appStyle.fieldTextColor2,
    height: appStyle.fieldHeight,
    alignSelf: "center",
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 18,
  },
});