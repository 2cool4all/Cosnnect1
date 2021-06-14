import { StyleSheet } from "react-native";
import { appStyle } from "../../utility";
import { TRANSPARENT } from "../../utility/colors";

export default StyleSheet.create({
  input: {
    paddingLeft:15,
    marginLeft:5,
    backgroundColor: '#E6E6E6',
    borderRadius:15,
    width: "77%",
    color: appStyle.fieldTextColor2,
    height: appStyle.fieldHeight,
    alignSelf: "center",
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 18,
  },
});