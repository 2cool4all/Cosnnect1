import { StyleSheet } from "react-native";
import { color } from "../../utility";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: '#FAFAFA'
  },
  cardItemStyle: {
    backgroundColor: '#FAFAFA',
  },

  logoContainer: {
    height: 60,
    width: 60,
    borderColor: color.DARK_GRAY,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.WHITE,
  },
  thumbnailName: { fontSize: 25, color: '#545454' },
  profileName: { fontSize: 20, color: '#545454', marginLeft:5 },
});
