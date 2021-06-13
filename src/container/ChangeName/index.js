import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { ButtonLaunch, InputField } from '../../component'
import firebase from '../../firebase/config';
import { UpdateUser } from '../../network';
import { uuid } from '../../utility/constants';
import { Store } from '../../context/store';
import { useContext, useEffect } from 'react';
import { LOADING_STOP, LOADING_START } from "../../context/actions/type";
import { UpdateUserName } from '../../network/user';


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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Change Name Screen</Text>
        <InputField value={tempName} onChangeText={(text)=>
        {
            handleOnChange("tempName", text)
        
        }
        }></InputField>


        <ButtonLaunch title="Change Name" onPress={()=>
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
    )
  
}

export default ChangeName;