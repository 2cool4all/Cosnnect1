import { StyleSheet } from "react-native";
import { appStyle } from "../../utility";
import { TRANSPARENT } from "../../utility/colors";

export default StyleSheet.create({
  input: {
    backgroundColor: TRANSPARENT,
    borderColor: '#B2352C',
    borderWidth:2,
    borderRadius:15,
    width: "30%",
    color: appStyle.fieldTextColor2,
    height: appStyle.fieldHeight,
    textAlign: "center",
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 15,
  },
});