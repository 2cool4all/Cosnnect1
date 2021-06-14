
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './styles';

export default ({onPress}) => (
    <View style={styles.container}>
  <TouchableOpacity  onPress={onPress}>
    <Icon 
            name="android-messages"    
            size={45}
            color= "white"    
        />
  </TouchableOpacity>
  </View>
);
