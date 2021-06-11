import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { color, globalStyle} from '../../utility';
import { ButtonLaunch, ButtonLaunchHollow } from '../../component';

const Launch = ({navigation}) => {
  
    return(
    <SafeAreaView style={[globalStyle.container,{backgroundColor: color.WHITE}]}>
        
        <View>
        <Image 
        source={require("./logo.png")} 
        style={{ alignSelf: 'center', width: 500, height: 500}} />
        </View>
        
        <View style={[globalStyle.centerAligned]}>
          <ButtonLaunchHollow title="Signup" onPress={()=>navigation.navigate('SignUp')}/>
          <ButtonLaunch title="Login" onPress={()=>navigation.navigate('Login')}/>
        </View>

    </SafeAreaView>
    );
  };

export default Launch;