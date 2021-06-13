import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { uuid} from "../../utility/constants";
import { UpdateUser } from '../../network';
import Dashboard from '../Dashboard';
import Dashboard1 from '../Dashboard1';
import { useLayoutEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from '../../utility';
import { Avatar, Profile } from '../../component';
import { useState } from 'react';
import { useEffect } from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import { useContext } from 'react';
import { Store } from '../../context/store';
import firebase from "../../firebase/config";
import {View, Text} from "react-native"



const Tab = createMaterialTopTabNavigator();



const Hometab=({navigation})=>{
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
      
    
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>(
                <Icon name="search" size={25} style={{color: color.WHITE, marginLeft:125, paddingRight:15}} onPress={()=>navigation.navigate('Account Settings')}/>
            ),
            headerTitle:()=>(
              
                <Profile
            img={profileImg}
            name={name}
            onEditImgTap={()=>selectPhotoTapped()}
            onImgTap={()=>navigation.navigate('Account Settings')}/>
            
            
            ),
            headerLeft: () =>(
                <Text style={{color: color.WHITE, fontSize:18,marginBottom:5, fontWeight:"bold", marginRight:67, paddingLeft:15}}>COSnnect</Text>
            ),
        })
    
    }, [navigation]);

    return(
        
        <Tab.Navigator>
            <Tab.Screen name="Message" component={Dashboard}/>
            <Tab.Screen name="Group Chats" component={Dashboard1}/>
        </Tab.Navigator>
        )
}

export default Hometab;