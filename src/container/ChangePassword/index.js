import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { ButtonLaunch, InputField } from '../../component'
import firebase from '../../firebase/config';
import Firebase from 'firebase';

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Change Name Screen</Text>
        <Text>Current Password</Text><InputField secureTextEntry={true} onChangeText={(text)=>{
            handleOnChange("passwordHandler", text)
        }}></InputField>
        <Text>New Password</Text><InputField secureTextEntry={true} onChangeText={(text)=>{
            handleOnChange("newPass", text)
        }}></InputField>
        <Text>Confirm Password</Text><InputField secureTextEntry={true} onChangeText={(text)=>{
            handleOnChange("confirmNewPass", text)
        }}></InputField>


        <ButtonLaunch title="Change Password" onPress={onChangePassword}>
        </ButtonLaunch>
      </View>
    )
  
}

export default ChangePassword;