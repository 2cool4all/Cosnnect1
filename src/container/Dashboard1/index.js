import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import firebase from '../../firebase/config'
import FloatingButton from '../../component/button/FloatingButton';
import  Separator  from '../../component';
import { color } from '../../utility';

export default function Dashboard1({navigation}){

  const [threads, setThreads] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {



    const unsubscribe = firestore()
      .collection('MESSAGE_THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            latestMessage: { text: '' },
            ...documentSnapshot.data()
          }
        })

        setThreads(threads)
        
        if (loading) {
          setLoading(false)
        }
      })
      return () => unsubscribe();
  }, [])
  if (loading) {
    return <ActivityIndicator size='large' color='#555' />
  }

      return (
        <View style={styles.container}>
          <FlatList
            data={threads}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity style={{
                marginTop:10,
                marginBottom:10,
                borderBottomWidth:1,
                borderBottomColor: '#E1D6D6'}}onPress={() =>navigation.replace('Messages', {thread:item})}>
                <View style={styles.row}>
                  <View style={styles.content}>
                    <View style={styles.header}>
                      <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                    <Text style={styles.contentText}>
                      {item.latestMessage.text.slice(0, 90)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

            )}
          />
         
        
        <FloatingButton onPress={()=>navigation.replace('AddRoomScreen')}/> 

        </View>
      )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: '500'
  },
  row: {
    paddingRight: 10,
    paddingLeft: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    flexShrink: 1
  },
  header: {
    flexDirection: 'row'
  },
  nameText: {
    fontWeight: '600',
    fontSize: 25,
    color: '#000',
    marginLeft:20
  },
  dateText: {},
  contentText: {
    color: '#949494',
    fontSize: 16,
    marginTop: 2,
    marginLeft:20,
    marginBottom:15
  }

})