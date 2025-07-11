import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { fonts } from './utils/fonts';
import { color } from './utils/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginSignup, Otp } from './screens';

const App = () => {
  const Stack = createStackNavigator();

  const AuthStack = () => (
    <Stack.Navigator
      initialRouteName="Otp"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_left',
      }}
    >
      <Stack.Screen name="LoginSignup" component={LoginSignup} />
      <Stack.Screen name="Otp" component={Otp} />
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
