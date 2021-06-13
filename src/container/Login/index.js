import React, { useContext } from 'react';
import {Text, SafeAreaView, ImageBackground,  View, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native';
import {color, globalStyle} from '../../utility';
import { InputField, ButtonLaunch } from '../../component';
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
        navigation.replace('Cosnnect');
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
  style={[globalStyle.flex1,{backgroundColor: color.WHITE}]}
  behavior={Platform.OS==='ios'?'padding':'height'}
  keyboardVerticalOffset={keyboardVerticalOffset}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <ImageBackground
    source={require("./avatar.png")}
    style={{height: null,
      resizeMode: "cover",
      overflow: "hidden",
      flex: 1}}>
  <SafeAreaView style={[globalStyle.flex1,{backgroundColor: color.WHITE, opacity:0}]}/>
  
      <View style={[globalStyle.flex2, globalStyle.sectionCenteredLog]}>
      <Text style={{marginLeft:25, fontSize:18, color:'#320202'}} >USERNAME</Text>
        <InputField value={email}
        onChangeText={(text)=>handleOnChange('email',text)}
        onFocus={()=>handleFocus()}
        onBlur={()=>handleBlur()}
        />
        <Text style={{ marginLeft:25, fontSize:18, color:'#320202'}} >PASSWORD</Text>
        <InputField secureTextEntry={true}
        value={password} onChangeText={(text)=>handleOnChange('password',text)}
        onFocus={()=>handleFocus()}
        onBlur={()=>handleBlur()}
        />
        <Text style={{ marginBottom:50,marginRight:30, alignSelf:"flex-end", fontSize:15, color:'#320202'}} onPress={()=>navigation.replace('ForgotPass')}>Forgot Password?</Text>
        <View style={[globalStyle.sectionCentered]}>
        <ButtonLaunch title="Login" onPress={()=>onLoginPress()}/>
        <Text style={{ fontSize:15, color:'#320202'}}>Don't have an account?
        <Text
        style={{
          fontSize:15,
          color:'green'
        }}
        onPress = {()=>navigation.navigate('SignUp')}> Create one.
        </Text>
        </Text>
        </View>
      </View>
  <SafeAreaView style={{opacity:0}}/>
  </ImageBackground>
  </TouchableWithoutFeedback>
  </KeyboardAvoidingView>

  );
};

export default Login;