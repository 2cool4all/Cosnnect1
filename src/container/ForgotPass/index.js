import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { ButtonLaunch, InputField } from '../../component'
import firebase from '../../firebase/config';





const ForgotPassword=({navigation})=> {

    
    const [reset, setReset]= useState({
        email: "",
    });

    const {email}=reset;


    const handleOnChange =(name, value)=> {
      setReset({
        ...reset,
          [name]: value,
      });
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Forgot Password Screen</Text>
        <InputField value={email} onChangeText={(text)=>
        {
            handleOnChange("email", text)
        
        }
        }></InputField>
        <ButtonLaunch title="Send Email" onPress={()=>
        {
          try {
            firebase.auth().sendPasswordResetEmail(email)
            alert('Passwrod Reset Email sent!');
            navigation.replace('Login');
          }catch(error){
            alert(error);
          }
        }
        }></ButtonLaunch>
      </View>
    )
  
}

export default ForgotPassword;