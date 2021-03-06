import { StyleSheet } from "react-native";
import { appStyle } from "../../utility";
import { TRANSPARENT } from "../../utility/colors";

export default StyleSheet.create({
  input: {
    paddingLeft: 20,
    backgroundColor: TRANSPARENT,
    borderColor: '#B2352C',
    borderWidth:2,
    borderRadius:15,
    width: "85%",
    color: appStyle.fieldTextColor2,
    height: appStyle.fieldHeight,
    alignSelf: "center",
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 18,
  },
});