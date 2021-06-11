import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Dashboard from '../Dashboard';
import Dashboard1 from '../Dashboard1';



const Tab = createBottomTabNavigator();

function HomeTabs(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Students" component={Dashboard}/>
            <Tab.Screen name="Faculty" component={Dashboard1}/>
        </Tab.Navigator>
    )

};

export default HomeTabs;