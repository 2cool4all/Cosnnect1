import * as React from 'react';
import {Assets, createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { Login, SignUp, ProfileScreen, Splash, ShowFullImg, Chat, ForgotPassword, ChangeName, ChangePassword} from '../container';
import { color } from '../utility';
import Launch from '../container/Launch';
import SignUpProf from '../container/SignUpProf';
import Hometab from '../container/HomeTab';

const Stack = createStackNavigator();


function NavContainer(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash"
            screenOptions={{
                headerShown:true,
                headerTitle:false,
                headerStyle:{backgroundColor: '#960A00'},
                headerTintColor:color.WHITE,
                headerTitleAlign: 'center',
                headerTitleStyle:{
                    fontWeight:'bold',
                    fontSize: 20,
                },
            }}>
                <Stack.Screen 
                name="Splash" 
                component={Splash}
                options={{headerShown: false}}
                />
                
                <Stack.Screen 
                name="Launch" 
                component={Launch}
                options={{headerShown: false}}
                />

                <Stack.Screen 
                name="Login" 
                component={Login}
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name="ForgotPass" 
                component={ForgotPassword}
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name="Cosnnect"
                component={Hometab}
                />
                <Stack.Screen 
                name="Account Settings" 
                component={ProfileScreen}
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name="ChangeName" 
                component={ChangeName}
                options={{headerShown: false}}
                />
                 <Stack.Screen 
                name="ChangePass" 
                component={ChangePassword}
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name="ShowFullImg" 
                component={ShowFullImg}
                options={{
                    headerBackTitle: null,
                }}
                />
                <Stack.Screen 
                name="Chat" 
                component={Chat}
                options={{
                    headerBackTitle: null,
                }}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default NavContainer;