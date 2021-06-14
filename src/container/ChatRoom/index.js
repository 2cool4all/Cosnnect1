import React, { useLayoutEffect, useState, useEffect, useContext } from 'react'
import { GiftedChat, SystemMessage, Bubble, Time } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'
import { color } from '../../utility';
import firebase from '../../firebase/config';
import firestore from '@react-native-firebase/firestore';
import { LOADING_STOP } from "../../context/actions/type";
import { uuid} from "../../utility/constants";
import { Store } from '../../context/store';
import { clearAsyncStorage } from '../../asyncStorage';
import auth from '@react-native-firebase/auth'
import { View, Text } from 'react-native';
import { TRANSPARENT } from '../../utility/colors';


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
      
        return () => unsubscribeListener();
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

        const customSystemMessage = props => {
          return (
            <View style={{backgroundColor:TRANSPARENT, alignItems:'center', marginTop:20, marginBottom:20, }}>
              <Text></Text>
              <Icon name="lock" color="#9d9d9d" size={30} />
              <Text style={{color:color.BLACK}}>Your chat is secured.</Text>
                <Text>Remember to be cautious about what you share with others.</Text>
                <Text></Text>
            </View>
          );
        }

        const ChatTime = ({ currentMessage, timeFormat }) => {
          return (
            <Time
              currentMessage={currentMessage}
              timeFormat={timeFormat}
              timeTextStyle={{
                left: {
                  color: color.DARK_GRAY,
                },
                right: {
                  color: color.BLACK,
                },
              }}
            />
          );
        };

      return (
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{
            _id: user.uid
          }}
          renderSystemMessage={props => customSystemMessage(props)}
          renderTime={props => ChatTime(props)}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  left: {
                    color: color.DARK_GRAY,
                  },
                  right: {
                    color: color.BLACK,
                  },
                }}
                wrapperStyle={{
                  left: {
                    padding:10,
                    backgroundColor: '#fafafa',
                    marginBottom:20,
                  },
                  right: {
                    padding:10,
                    backgroundColor: '#FFDEDE',
                  },
                }}
              />
            );
          }}
          
          containerStyle={{
            backgroundColor: "white",
            borderTopColor: "#E8E8E8",
            borderTopWidth: 1,
            padding: 8,
          }}
        />
        
      )
}