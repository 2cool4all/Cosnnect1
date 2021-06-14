import React from 'react';
import { useLayoutEffect } from 'react';
import { View, SafeAreaView, Alert, FlatList, Text, ImageBackground} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import firebase from "../../firebase/config";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { clearAsyncStorage } from '../../asyncStorage';
import { uuid, smallDeviceHeight, email } from "../../utility/constants";
import { LogOutUser, UpdateUser } from '../../network';
import { Avatar, ShowUsers, StickyHeader } from "../../component";
import { color, globalStyle } from '../../utility';
import { useContext } from 'react';
import { Store } from '../../context/store';
import { useState } from 'react';
import { useEffect } from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import { deviceHeight } from '../../utility/styleHelper/appStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, CheckBox } from 'native-base';
import { TRANSPARENT } from '../../utility/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ProfileScreen = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;
  const [getScrollPosition, setScrollPosition] = useState(0);
  const [userDetail, setUserDetail] = useState({
    id: '',
    name: '',
    profileImg: '',
  });

  const [getEmail, setGetEmail] = useState({
    email: '',
  });

  const {email} = getEmail;

  const {name, profileImg}= userDetail;
  const [allUsers, setAllUsers] = useState([]);



useEffect(()=>{
  dispatchLoaderAction({
    type: LOADING_START,
  });
  try{
    firebase
    .database()
    .ref('users')
    .on('value', (dataSnapshot)=>{
      let users = [];
      let currentUser = {
        id: '',
        name: '',
        profileImg: '',
      };
      dataSnapshot.forEach((child)=>{
        if(uuid === child.val().uuid){
          currentUser.id = uuid;
          currentUser.name = child.val().name;
          currentUser.profileImg=child.val().profileImg;

        }
        else{
          users.push({
            id: child.val().uuid,
            name: child.val().name,
            profileImg: child.val().profileImg,
          });
        }
      });
      setUserDetail(currentUser)
      setAllUsers(users);
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
    });

  
  } catch(error){
    dispatchLoaderAction({
      type: LOADING_STOP,
    });
    alert(error);
    dispatchLoaderAction({
      type: LOADING_STOP,
    });
  }

const user = firebase.auth().currentUser;

  if (user) {
    return setGetEmail({
      ...getEmail,
      email: user.email,
    })
  }
  

}, []);

  const selectPhotoTapped = () => {
    const option = {
      storageOptions: {
        skipBackup:true,
      },
    };
    launchImageLibrary(option, (response)=>{
      console.log("Response = ", response);

      if(response.didCancel){
        console.log('User cancelled image picker')
      }else if(response.error){
        console.log('image picker error', response.error)
      }
      else{
        let source = 'data:image/jpeg;base64,'+response.data;
        dispatchLoaderAction({
          type: LOADING_START
        });
        UpdateUser(uuid, source)
        .then(()=>{
          setUserDetail({
            ...userDetail,
            profileImg:source,
          });
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        })
        .catch(()=>{
          alert(err)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
      }

    })
  }


const logout = () => {
  LogOutUser()
    .then(() => {
      clearAsyncStorage()
        .then(() => {
          navigation.replace("Login");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => alert(err));
};

const imgTap = (profileImg, name)=>{
  if(!profileImg){
    navigation.navigate('ShowFullImg', {
      name, 
      imgText:name.charAt(0)
    })
  }else{
    navigation.navigate('ShowFullImg', {
      name, 
      img:profileImg,
    });
  }
};






const getOpacity = () =>{

  if(deviceHeight<smallDeviceHeight){
    return deviceHeight/4;
  }else{
    return deviceHeight/6;
  }
}

  return(
    <ImageBackground
    source={require("./profile.png")}
    style={{height: null,
      resizeMode: "cover",
      overflow: "hidden",
      flex: 1}}>
  
  <View style={{backgroundColor: '#960A00', height:60}}>
    
    <ListItem style={{backgroundColor:TRANSPARENT}}>
    <Icon name="long-arrow-left" size={30} color="white" onPress={()=>navigation.navigate('Cosnnect')}/>
    <Text style={{marginLeft:20, color: color.WHITE, fontWeight:'bold', fontSize:20}}> Account Settings</Text>
    </ListItem>
    </View>
    <Avatar
        img={profileImg}
        name={name}
        onEditImgTap={()=>selectPhotoTapped()}
        onImgTap={()=>imgTap(profileImg, name)}/>
    
    <View style={{ justifyContent:'center', marginTop:25, height: 90, borderBottomWidth: 2, borderBottomColor: '#7f8fa6' }}>
    <ListItem>
<<<<<<< HEAD
    <Text style={{ color: '#192a56', fontSize: 25 }}>
        <Icon name="user" size={35} color='#440500'/>   {name}</Text>
        <View style={{marginLeft:68, marginTop:10}}>
=======
        <Text style={{ color: '#192a56', fontSize: 25 }}>
        <Icon name="user" size={35} color='#440500'/>   {name}</Text>
      <View style={{marginLeft:68, marginTop:10}}>
        
>>>>>>> 282aa9918d65a80a50796eed8684d58d1ad5bb27
        <Icon name="chevron-right" size={30} color='#440500'
        onPress={()=>{
          navigation.replace('ChangeName')
        }}/>
        </View>
      </ListItem>
    </View>
    <View style={{ justifyContent:'center', height: 90, borderBottomWidth: 2, borderBottomColor: '#7f8fa6' }}>
    <ListItem>
        <Text style={{ color: '#192a56', fontSize: 22 }}>
        <Icon name="inbox" size={35} color='#440500'/>  {email} </Text>
      </ListItem>
    </View>
    <View style={{ justifyContent:'center', height: 90, borderBottomWidth: 2, borderBottomColor: '#7f8fa6' }}>
    <ListItem>
        <Text style={{ color: '#192a56', fontSize: 23 }}>
        Change Password</Text>
        <View style={{marginLeft:148, marginTop:10}}>
        <Icon name="chevron-right" size={30} color='#440500' onPress={()=>{
          navigation.replace('ChangePass')
        }}/>
        </View>
      </ListItem>
    </View >
    <TouchableOpacity onPress={()=>Alert.alert(
          "Logout", "Are you sure you want to logout?",[
            {text: 'Cancel',},
            {text: 'Confirm',onPress:()=> logout()},],
          {cancelable:false,},
        )}>
    <View style={{ justifyContent:'center', height: 90, borderBottomWidth: 2, borderBottomColor: '#7f8fa6' }}>
    <ListItem>
        <Icon name="sign-out" size={35} color='#440500'/>
        <Text style={{ color: '#192a56', fontSize: 22, marginLeft:85 }}>   LOGOUT</Text>
      </ListItem>
    </View>
    </TouchableOpacity>        
  <SafeAreaView style={[globalStyle.flex1, {backgroundColor:color.BLACK,opacity:0}]}/>
    
      {
        getScrollPosition > getOpacity() && (
          <StickyHeader
          name= {name}
          img={profileImg}
          onImgTap={()=>imgTap(profileImg, name)}
          />
        )
      }
      
      <FlatList
      alwaysBounceVertical={false}
      onScroll={(event)=>setScrollPosition(event.nativeEvent.contentOffset.y)}
      ListHeaderComponent={
        <View
          style={{
            opacity : getScrollPosition < getOpacity() 
            ? (getOpacity() - getScrollPosition) / 100 
            : 0,
          }}
        >
       
       <Text style={{color: color.WHITE}} onPress={()=>Alert.alert(
          "Logout", "Are you sure you want to logout?",[
            {
              text: 'Yes',
              onPress:()=> logout(), 
            },
            {
              text: 'No'
            },
          ],
          {
            cancelable:false,
          },
        )}>Logout</Text>

        
        </View>
      }/>
      
      <SafeAreaView style={{opacity:0}}/>
  </ImageBackground> 

  ) 
};

export default ProfileScreen;