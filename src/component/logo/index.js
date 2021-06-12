import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

export default () => (
  <View>
    <Image
          source={require("./logo.png")}
          style={ styles.image }
        />
  </View>
);

const styles = StyleSheet.create({
image: {
  flex:1,
    width: 500,
    height: 500,
    alignSelf: 'center'
},
});