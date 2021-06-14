import { StyleSheet } from "react-native";
import { color } from "../../../utility";


export default StyleSheet.create({
    container:{
        backgroundColor: color.RED,
        width: 75, 
        height: 75,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        bottom:30,
        right:20,
    }
});

