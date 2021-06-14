import React, { useLayoutEffect, useState, useEffect, useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'
import { color } from '../../utility';
import firebase from '../../firebase/config';
import firestore from '@react-native-firebase/firestore';
import { LOADING_STOP } from "../../context/actions/type";
import { uuid} from "../../utility/constants";
import { Store } from '../../context/store';
import { clearAsyncStorage } from '../../asyncStorage';

export default function Messages({route, navigation}) {
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerLeft: ()=>(
                <Icon name="long-arrow-left" size={25} style={{color: color.WHITE, marginRight:125, paddingLeft:15}} onPress={()=>
                  navigation.replace('Cosnnect')}/>
            
                ),
            
        })
    
    }, [navigation]);
    
    const [userDetail, setUserDetail] = useState({ 
      name: '',
    });
    const globalState = useContext(Store);
    const {dispatchLoaderAction} = globalState;
    const {name} = userDetail
    const { thread } = route.params
    const user = firebase.auth().currentUser;
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
      try{
        firebase
        .database()
        .ref('users')
        .on('value', (dataSnapshot)=>{
          let users = [];
          let currentUser = {
            name: '',
          };
          dataSnapshot.forEach((child)=>{
            if(uuid === child.val().uuid){
              currentUser.name = child.val().name;
            }
            else{
              users.push({
                name: child.val().name,
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
        const unsubscribeListener = firestore()
          .collection('MESSAGE_THREADS')
          .doc(thread._id)
          .collection('MESSAGES')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const messages = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data()
      
              const data = {
                _id: doc.id,
                text: '',
                createdAt: new Date().getTime(),
                ...firebaseData
              }
      
              if (!firebaseData.system) {
                data.user = {
                  ...firebaseData.user,
                  name: firebaseData.user.displayName
                }
              }
      
              return data
            })
      
            setMessages(messages)
          })
      
        return () => unsubscribeListener()
      }, [])


    const [messages, setMessages] = useState([])

    async function handleSend(messages) {
	

        const text = messages[0].text
        
        firestore()
        .collection('MESSAGE_THREADS')
        .doc(thread._id)
        .collection('MESSAGES')
        .add({
        text,
        createdAt: new Date().getTime(),
        user: {
        _id: user.uid,
        displayName: user.displayName
    }
  })
    await firestore()
        .collection('MESSAGE_THREADS')
        .doc(thread._id)
        .set(
        {
      latestMessage: {
        text,
        createdAt: new Date().getTime()
        }
        },
        { merge: true }
        )
        }



      return (
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{
            _id: user.uid
          }}
        />
      )
}