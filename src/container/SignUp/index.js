import React, {useState, useContext} from 'react';
import {Text, SafeAreaView, ImageBackground, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native';
import {color, globalStyle} from '../../utility';
import { Verification, InputField, ButtonLaunchHollow, VerifyButton} from '../../component';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { AddUser, SignUpRequest } from '../../network';
import {setAsyncStorage, keys} from '../../asyncStorage';
import { setUniqueValue, keyboardVerticalOffset} from '../../utility/constants';
import firebase from '../../firebase/config';
import { TRANSPARENT } from '../../utility/colors';
import { ListItem } from 'native-base';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';

const SignUp = ({navigation}) => {

  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;
  const [showLogo, toggleLogo] = useState(true);
  const [getCourse, setgetCourse]= useState({
    coourse: "",
    year: "",
    section: "",
  })
  const [credentials, setCredentials]= useState({
      Fname: "",
      Lname: "",
      DoB: "",
      email: "",
      password:"",
      confirmPassword: "",
      isStudent: "",
      isFaculty: "",

  });

  const [shouldShow, setshouldShow]= useState(false);
  const [shouldShow1, setshouldShow1]= useState(false);
  const [shouldCheck, setshouldCheck] = useState(false);
  const [shouldCheck1, setshouldCheck1] = useState(false);

  const {Fname, Lname, DoB, email, password, confirmPassword, isStudent, isFaculty} = credentials;
  const {coourse, year, section}=getCourse;
  const [date, setDate] = useState();
  const [selectedValue, setSelectedValue] = useState();

  

  const onSignUpPress = () =>{
    if (!Fname) {
      alert("First Name is required");
    }else if(!Lname){
      alert('Last name is required');
    }else if(!email){
      alert('Email is required');
    }else if(!password){
      alert('Password is required');
    }else if(password !== confirmPassword){
      alert('Password did not match');
    }
    else{
      dispatchLoaderAction({
      type: LOADING_START,
      });
      SignUpRequest(email, password)
      .then((res)=>{
        if(!res.additionalUserInfo){
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(res);
          return;
        }
        let uid = firebase.auth().currentUser.uid;
        let profileImg = "";
          AddUser(Fname, Lname,DoB,  coourse, year, section, isStudent, isFaculty, email, uid, profileImg)
            .then(() => {
              setAsyncStorage(keys.uuid, uid);
              setUniqueValue(uid);
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              alert('Done')
              navigation.replace("Cosnnect");
            })
            .catch((err) => {
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              alert(err);
            });
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }
  };

const handleOnChange =(name, value)=> {
  setCredentials({
    ...credentials,
      [name]: value,
  });
};

const handleOnChange1 =(name, value)=> {
  setgetCourse({
    ...getCourse,
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
    style={[
      globalStyle.flex1,
      {backgroundColor: TRANSPARENT}]}
    behavior={Platform.OS==='ios'?'padding':'height'}
    keyboardVerticalOffset={keyboardVerticalOffset}>
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView>
  <ListItem>
    <Icon name="long-arrow-left" size={30} color="#900" style={{marginLeft:5, marginTop:10}} onPress={()=>navigation.navigate('Launch')}/>   
    <Text style={{marginTop:5,marginLeft:20, fontSize:25, color:'#320202'}}>Create Account</Text>
  </ListItem>
  <SafeAreaView 
    style={{marginTop:20,backgroundColor: color.WHITE, opacity:0}}/>
      <View style={[globalStyle.flex2, globalStyle.sectionCenteredLog]}>
      <Text style={{marginLeft:25, fontSize:18, color:'#320202'}}>First Name</Text>
      <InputField value={Fname}
        onChangeText={(text)=>handleOnChange('Fname',text)}
        onFocus={()=>handleFocus()}
        onBlur={()=>handleBlur()}
        />
         <Text style={{marginLeft:25, fontSize:18, color:'#320202'}}>Last Name</Text>
      <InputField value={Lname}
        onChangeText={(text)=>handleOnChange('Lname',text)}
        onFocus={()=>handleFocus()}
        onBlur={()=>handleBlur()}
        />
        <Text style={{marginLeft:25, marginBottom:8, fontSize:18, color:'#320202'}}>Date of Birth</Text>
        <DatePicker
          style={{width: '92%'}}
          date={date}
          mode="date"
          placeholder="Select your date of birth."
          format="DD-MM-YYYY"
          minDate="01-01-1990"
          maxDate="01-01-2002"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
            handleOnChange("DoB", date)
          }}
        />
        

        
        <ListItem style={{ marginTop:10,marginLeft:40}}>
        <CheckBox disable={false} value={shouldCheck}  onValueChange={(newVal)=>{
         setshouldCheck(newVal)
         setshouldCheck1(!newVal)
         setshouldShow(newVal)
         setshouldShow1(!newVal)
        handleOnChange("isStudent", newVal)

        }}
          />
        <Text style={{color:'#320202'}}>  Student</Text>
        <CheckBox disable={false} value={shouldCheck1}  style={{marginLeft:70}} onValueChange={(newVal)=>{
          setshouldCheck1(newVal)
          setshouldCheck(!newVal)
          setshouldShow1(newVal)
          setshouldShow(!newVal)
          handleOnChange("isFaculty", newVal)
        }}
         />
        <Text style={{color:'#320202'}}>  Faculty</Text>
        </ListItem>
        {
          shouldShow ? (
        <View>
        <ListItem style={{marginTop:20, marginLeft:28}} >
        <Text style={{fontSize:16, color:'#320202'}}>Course</Text>
        <Text style={{marginLeft:75, fontSize:16, color:'#320202'}}>Year</Text>
        <Text style={{marginLeft:88, fontSize:16, color:'#320202'}}>Section</Text>
        </ListItem>
        <ListItem>
        <Picker style={{height: 30, width:115,padding:1}} onValueChange={(itemValue, itemIndex) =>handleOnChange1( "coourse",itemValue)}>
          <Picker.Item label="BSCS" value="bscs"/>
          <Picker.Item label="BSIS" value="bsis"/>
          <Picker.Item label="BSIT" value="bsit"/>
        </Picker>
        <Picker style={{height: 30,width:120, marginLeft:8, padding:1}} onValueChange={(itemValue, itemIndex) =>handleOnChange1( "year",itemValue)}>
          <Picker.Item label="First" value="first"/>
          <Picker.Item label="Second" value="second"/>
          <Picker.Item label="Third" value="third"/>
          <Picker.Item label="Fourth" value="fourth"/>
        </Picker>
        <Picker style={{height: 30,width:91, marginLeft:5}} onValueChange={(itemValue, itemIndex) =>handleOnChange1( "section",itemValue)}>
          <Picker.Item label="A" value="a"/>
          <Picker.Item label="B" value="b"/>
          <Picker.Item label="C" value="c"/>
        </Picker>
        </ListItem>
        </View>
          ): null
        }


        {
          shouldShow1 ? (
        <ListItem>
        <Text style={{marginLeft:10, marginRight:10, fontSize:15, color:'#320202'}}>Verification Code</Text>
        <Verification/>
        <VerifyButton title="Verify" onPress={()=>onSignUpPress()}/>
        </ListItem>
          ): null
        } 
        <Text style={{marginLeft:25, fontSize:18, color:'#320202'}}>Email Address</Text>
        <InputField value={email}
        onChangeText={(text)=>handleOnChange('email',text)}
        onFocus={()=>handleFocus()}
        onBlur={()=>handleBlur()}
        />
        <Text style={{marginLeft:25, fontSize:18, color:'#320202'}}>Password</Text>
        <InputField secureTextEntry={true}
        value={password} onChangeText={(text)=>handleOnChange('password',text)}
        onFocus={()=>handleFocus()}
        onBlur={()=>handleBlur()}
        />
        <Text style={{marginLeft:25, fontSize:18, color:'#320202'}}>Confirm Password</Text>
        <InputField secureTextEntry={true}
        value={confirmPassword} onChangeText={(text)=>handleOnChange('confirmPassword',text)}
        onFocus={()=>handleFocus()}
        onBlur={()=>handleBlur()}
        />
      </View>
      <View style={[globalStyle.sectionCentered,{marginTop:25}]}>
      <ButtonLaunchHollow title="SignUp" onPress={()=>onSignUpPress()}/>
      </View>
  <SafeAreaView style={{opacity:0}}/>
  
  </ScrollView>
  
  </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
};

export default SignUp;