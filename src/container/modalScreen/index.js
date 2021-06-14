import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { InputField,ButtonLaunch, RoundCornerButton } from '../../component';
import firestore from '@react-native-firebase/firestore';



export default function AddRoomScreen({ navigation }) {
    
    const [roomName, setRoomName] = useState('')
    function handleButtonPress() {
      if (roomName.length > 0) {
        // create new thread using firebase & firestore
        firestore()
          .collection('MESSAGE_THREADS')
          .add({
            name: roomName,
            latestMessage: {
              text: `${roomName} created. Welcome!`,
              createdAt: new Date().getTime()
            }
          })
          .then(docRef => {
            docRef.collection('MESSAGES').add({
              text: `${roomName} created. Welcome!`,
              createdAt: new Date().getTime(),
              system: true
            })
            navigation.replace('Cosnnect')
          })

        }
      }

    return (
      <View style={styles.rootContainer}>
        <View style={styles.closeButtonContainer}>
          <Icon name='close'
            style={{paddingRight:25}}
            size={36}
            color='#6646ee'
            onPress={() => navigation.replace('Cosnnect')}/>
          
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Create a new chat room</Text>
          <InputField value={roomName} onChangeText={(text)=>setRoomName(text)}/>
          <ButtonLaunch title="Add room" onPress={()=>handleButtonPress()}/>
        </View>
      </View>
    );
  }


  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 30,
      right: 0,
      zIndex: 1,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
    },
    buttonLabel: {
      fontSize: 22,
    },
  });