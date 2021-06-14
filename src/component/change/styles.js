import { StyleSheet } from "react-native";
import { appStyle } from "../../utility";
import { TRANSPARENT } from "../../utility/colors";

export default StyleSheet.create({
  input: {
    backgroundColor: TRANSPARENT,
    borderColor: '#B2352C',
    borderBottomWidth:2,
    width: "85%",
    color: appStyle.fieldTextColor2,
    height: appStyle.fieldHeight,
    alignSelf: "center",
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 18,
  },
});