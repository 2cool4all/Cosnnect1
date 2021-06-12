import React from 'react';
import { useLayoutEffect } from 'react';
import { View, SafeAreaView, Alert, FlatList, Text} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import firebase from "../../firebase/config";
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { clearAsyncStorage } from '../../asyncStorage';
import { uuid, smallDeviceHeight } from "../../utility/constants";
import { LogOutUser, UpdateUser } from '../../network';
import { Profile, ShowUsers, StickyHeader } from "../../component";
import { color, globalStyle } from '../../utility';
import { useContext } from 'react';
import { Store } from '../../context/store';
import { useState } from 'react';
import { useEffect } from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import { deviceHeight } from '../../utility/styleHelper/appStyle';
import { Body, Header, Left, Right } from 'native-base';
import { ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Tab } from '../../component';

const Dashboard = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;
  const [getScrollPosition, setScrollPosition] = useState(0);
  const [userDetail, setUserDetail] = useState({
    id: '',
    name: '',
    profileImg: '',
  });

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
        profileImg: ''
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


const nameTap = (profileImg, name, guestUserId) => {
  if(!profileImg){
    navigation.navigate('Chat', {
      name,
      imgText : name.charAt(0),
      guestUserId,
      currentUserId : uuid
    })
  }else{
    navigation.navigate('Chat', {
      name,
      img: profileImg,
      guestUserId,
      currentUserId : uuid
    })
  }
}



const getOpacity = () =>{

  if(deviceHeight<smallDeviceHeight){
    return deviceHeight/4;
  }else{
    return deviceHeight/6;
  }
}

  return(
  <SafeAreaView style={{flexDirection:'column', backgroundColor:color.WHITE}}>
      {
        getScrollPosition > getOpacity() && (
          <StickyHeader
          name= {name}
          img={profileImg}
          onImgTap={()=>navigation.navigate('Account Settings')}
          />
        )
      }

      <FlatList
      alwaysBounceVertical={false}
      keyExtractor={(_,index)=>index.toString()}
      onScroll={(event)=>setScrollPosition(event.nativeEvent.contentOffset.y)}
      ListHeaderComponent={
        <View
          style={{
            opacity : getScrollPosition < getOpacity() 
            ? (getOpacity() - getScrollPosition) / 100 
            : 0,
          }}
        >
        <View style={{height:85, width:'100%', backgroundColor:'#960A00', justifyContent:'center'}}>
          <ListItem>
            <Text style={{color: color.WHITE, fontSize:18,marginBottom:5, fontWeight:"bold", marginRight:67}}>COSnnect</Text>
            <Profile 
            img={profileImg}
            name={name}
            onEditImgTap={()=>selectPhotoTapped()}
          onImgTap={()=>navigation.navigate('Account Settings')}/>
          <Icon name="search" size={25} style={{color: color.WHITE, marginLeft:125}} onPress={()=>navigation.navigate('Account Settings')}/>   
          </ListItem>
        </View>
        <View style={{height:50, backgroundColor:color.WHITE, justifyContent:'center'}}>
        <ListItem>
        <Tab title="Message"/>
        <Tab title="Group Chat"/>
        </ListItem>
        </View>


        </View>
      }  
      />
  </SafeAreaView>
  ) 
};

export default Dashboard;