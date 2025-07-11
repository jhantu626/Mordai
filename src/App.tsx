import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { fonts } from './utils/fonts';
import { color } from './utils/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginSignup } from './screens';

const App = () => {
  const Stack = createStackNavigator();

  const AuthStack = () => (
    <Stack.Navigator initialRouteName="LoginSignup">
      <Stack.Screen name="LoginSignup" component={LoginSignup} />
    </Stack.Navigator>
  );

  const AppNav = () => (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );

  return <AppNav />;
};

export default App;

const styles = StyleSheet.create({});
