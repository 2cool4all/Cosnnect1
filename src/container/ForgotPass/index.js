import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { ButtonLaunch, InputField } from '../../component'
import firebase from '../../firebase/config';





const ForgotPassword=({navigation})=> {
    
    const [reset, setReset]= useState({
        email: "",
    });

    const {email}=reset;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Forgot Password Screen</Text>
        <InputField value={email} onChangeText={(text)=>setReset({email:text})}></InputField>
        <ButtonLaunch title="Send Email" onPress={()=>
        {
            firebase.auth().sendPasswordResetEmail().then({
                
            }).catch(error)
        }
        }></ButtonLaunch>
      </View>
    )
  
}

export default ForgotPassword;