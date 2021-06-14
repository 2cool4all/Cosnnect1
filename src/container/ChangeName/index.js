import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { ButtonLaunch, ChangeInput } from '../../component'
import firebase from '../../firebase/config';
import { UpdateUser } from '../../network';
import { uuid } from '../../utility/constants';
import { Store } from '../../context/store';
import { useContext, useEffect } from 'react';
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { UpdateUserName } from '../../network/user';
import { ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { color, globalStyle } from '../../utility';


const ChangeName=({navigation})=> {
    const globalState = useContext(Store);
    const {dispatchLoaderAction} = globalState;
    
    const [reset, setReset]= useState({
        id:"",
        tempName: "",

    });
    const [allUsers, setAllUsers] = useState([]);

    const {tempName} = reset;

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
            };
            dataSnapshot.forEach((child)=>{
              if(uuid === child.val().uuid){
                currentUser.id = uuid;
      
              }
              else{
                users.push({
                  id: child.val().uuid,
                });
              }
            });
            setReset(currentUser)
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
        <Text style={{marginLeft:20, color: color.WHITE, fontWeight:'bold', fontSize:20}}> Edit Name</Text>
        </ListItem>
        </View>
      <View style={{ justifyContent: 'center'}}>
        <ChangeInput placeholder="First Name" value={tempName} onChangeText={(text)=>
        {
            handleOnChange("tempName", text)
        
        }
        }></ChangeInput>

        <ChangeInput placeholder="Last Name" value={tempName}  onChangeText={(text)=>
        {
            handleOnChange("tempName", text)
        
        }
        }></ChangeInput>
        <View style={{marginTop:50, alignItems:'center'}}>
        <ButtonLaunch title="SAVE" onPress={()=>
        {
          UpdateUserName(uuid, tempName).then(()=>{
            setUserDetail({
                ...reset,
                name: tempName
            });
          })
          navigation.replace('Account Settings')
        }
        }></ButtonLaunch>
        </View>
        </View>
      </View>
    )
  
}

export default ChangeName;