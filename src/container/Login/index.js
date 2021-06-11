import React, { useContext } from 'react';
import {Text, SafeAreaView, View, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native';
import {color, globalStyle} from '../../utility';
import {Logo, InputField, RoundCornerButton} from '../../component';
import { useState } from 'react';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { LoginRequest } from '../../network';
import { keys, setAsyncStorage } from '../../asyncStorage';
import { setUniqueValue , keyboardVerticalOffset} from '../../utility/constants';

const Login = ({navigation}) => {

  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;
  const [showLogo, toggleLogo] = useState(true);

  const [credentials, setCredentials]= useState({
      email: "",
      password:"",
  });

  const {email, password} = credentials;


  const onLoginPress = () =>{
    if(!email){
      alert('Email is required');
    }else if(!password){
      alert('Password is required');
    }else{
      dispatchLoaderAction({
        type:LOADING_START,
      });
      LoginRequest(email,password)
      .then((res)=>{
        if(!res.additionalUserInfo){
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(res);
          return;
        }
        setAsyncStorage(keys.uuid, res.user.uid);
        setUniqueValue(res.user.uid);
        dispatchLoaderAction({
          type:LOADING_STOP,
        });
        navigation.replace('HomeTabs');
      })
      .catch((err)=>{
        dispatchLoaderAction({
          type:LOADING_STOP,
        });
        alert(err)
        
      })
    }
  };

const handleOnChange =(name, value)=> {
  setCredentials({
    ...credentials,
      [name]: value,
  });
};


const handleFocus = () => {
    setTimeout(() => {
      toggleLogo(false);
    }, 200);
  };

  const handleBlur = () => {
    setTimeout(() => {
      toggleLogo(false);
    }, 200);
  };


  return(
  <KeyboardAvoidingView
  style={[globalStyle.flex1,{backgroundColor: color.BLACK}]}
  behavior={Platform.OS==='ios'?'padding':'height'}
  keyboardVerticalOffset={keyboardVerticalOffset}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    
  
  <SafeAreaView style={[globalStyle.flex1,{backgroundColor: color.BLACK}]}>
      
      {
        showLogo && (
        <View style={[globalStyle.containerCentered]}>
        <Logo/>
      </View>
        )}
      
      
      
      <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
        <InputField placeholder="Enter email" value={email}
        onChangeText={(text)=>handleOnChange('email',text)}
        onFocus={()=>handleFocus()}
        onBlur={()=>handleBlur()}
        />
        <InputField placeholder="Enter password" secureTextEntry={true}
        value={password} onChangeText={(text)=>handleOnChange('password',text)}
        onFocus={()=>handleFocus()}
        onBlur={()=>handleBlur()}
        />
        <RoundCornerButton title="Login" onPress={()=>onLoginPress()}/>
        <Text
        style={{
          fontSize:28,
          fontWeight:'bold',
          color:color.LIGHT_GREEN
        }}

        onPress = {()=>navigation.navigate('SignUp')}>
          Sign Up as Student
        </Text>
        <Text
        style={{
          fontSize:28,
          fontWeight:'bold',
          color:color.LIGHT_GREEN
        }}
        onPress = {()=>navigation.navigate('SignUpProf')}>
          Sign Up as Faculty
        </Text>
      </View>
  </SafeAreaView>
  </TouchableWithoutFeedback>
  </KeyboardAvoidingView>

  );
};

export default Login;