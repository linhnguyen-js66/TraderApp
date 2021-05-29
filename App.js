/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {AppNavigator} from './src/navigation/AppNavigator'
import {Provider} from 'react-redux'
import store from './src/redux/createStore'
const App = () => {
  return (
    <Provider store={store}>
       <AppNavigator/> 
    </Provider>
   
  );
};


export default App;
