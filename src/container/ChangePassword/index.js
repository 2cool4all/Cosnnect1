import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { ButtonLaunch, ChangeInput } from '../../component'
import firebase from '../../firebase/config';
import Firebase from 'firebase';
import { ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { color, globalStyle } from '../../utility';

const ChangePassword=({navigation})=> {

    const [reset, setReset]= useState({
        passwordHandler: "",
        newPass: "",
        confirmNewPass: ""

    });
    
const {passwordHandler, newPass, confirmNewPass} = reset;
const [visible, setVisible] = useState(false);

    const reauthenticate = (passwordHandler) => {
        const user = firebase.auth().currentUser;
        const cred = Firebase.auth.EmailAuthProvider.credential(user.email, passwordHandler);
        return user.reauthenticateWithCredential(cred);
    }

    const onChangePassword = () =>{

        reauthenticate(reset.passwordHandler).then(()=>{
            const user = firebase.auth().currentUser;
        user.updatePassword(reset.newPass).then(()=>{
            Alert.alert("Password was changed");
            navigation.replace('Account Settings')
        }).catch((error)=>{
            Alert.alert(error.message);
        });
        }).catch((error)=>{
            Alert.alert(error.message);
        })

        
    }
    
    const handleOnChange =(name, value)=> {
        setReset({
          ...reset,
            [name]: value,
        });
      };

    return (
    <View>
        <View style={{backgroundColor: '#960A00', height:60, marginBottom:20}}>
        <ListItem>
            <Icon name="long-arrow-left" size={30} color="white" onPress={()=>navigation.navigate('Account Settings')}/>
            <Text style={{marginLeft:20, color: color.WHITE, fontWeight:'bold', fontSize:20}}> Reset Password</Text>
        </ListItem>
        </View>
        <ChangeInput placeholder="Current Password" secureTextEntry={true} onChangeText={(text)=>{
            handleOnChange("passwordHandler", text)
        }}></ChangeInput>
        <ChangeInput placeholder="New Password" secureTextEntry={true} onChangeText={(text)=>{
            handleOnChange("newPass", text)
        }}></ChangeInput>
        <ChangeInput placeholder="Confirm New Password" secureTextEntry={true} onChangeText={(text)=>{
            handleOnChange("confirmNewPass", text)
        }}></ChangeInput>
        <View style={{marginTop:50, alignItems:'center'}}>
        <ButtonLaunch title="Change Password" onPress={onChangePassword}>
        </ButtonLaunch>
        </View>
      </View>
    )
  
}

export default ChangePassword;