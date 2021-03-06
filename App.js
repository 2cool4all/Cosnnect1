import React, { Fragment } from 'react';
import {Text, SafeAreaView} from 'react-native';
import { Loader } from './src/component';
import { StoreProvider } from './src/context/store';
import Nav from './src/navigation'


const App = () => (
    <StoreProvider>
    <Nav/>
    <Loader/>
    </StoreProvider>
    
);
export default App;