import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fonts } from './utils/fonts';
import { colors } from './utils/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  Accounts,
  AddAddress,
  Address,
  Cart,
  Checkout,
  Home,
  LoginSignup,
  Otp,
  ProductDetails,
  Products,
  Search,
  ThankYou,
} from './screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';
import CartProvider, { useCartContext } from './contexts/CartContext';
import AuthProvider, { useAuth } from './contexts/AuthContext';

const App = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const AuthStack = () => (
    <Stack.Navigator
      initialRouteName="LoginSignup"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="LoginSignup" component={LoginSignup} />
      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  );

  const HomeStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 400,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 400,
                },
              },
            },
          }}
        />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    );
  };

  const AccountStack = () => (
    <Stack.Navigator
      initialRouteName="Address"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Account" component={Accounts} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
    </Stack.Navigator>
  );

  const ShopStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Shop"
        screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}
      >
        <Stack.Screen name="Shop" component={Products} />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 400,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 400,
                },
              },
            },
          }}
        />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    );
  };

  const CartStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Cart"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="ThankYou" component={ThankYou} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => {
    const { numOfCarts } = useCartContext();
    return (
      <Tab.Navigator
        initialRouteName="Account"
        backBehavior="fullHistory"
        screenOptions={{
          headerShown: false,
          animation: 'shift',
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: colors.primary,
          tabBarStyle: {
            paddingVertical: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: fonts.medium,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={24} color={color} />
            ),
            tabBarHideOnKeyboard: true,
          }}
        />

        <Tab.Screen
          name="Shop"
          component={ShopStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="shopping-bag" size={24} color={color} />
            ),
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="add-shopping-cart" size={24} color={color} />
            ),
            tabBarBadge: numOfCarts > 0 ? numOfCarts : 0,
            tabBarBadgeStyle: {
              backgroundColor: colors.primary,
              color: '#fff',
            },
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person" size={24} color={color} />
            ),
            tabBarHideOnKeyboard: true,
          }}
        />
      </Tab.Navigator>
    );
  };

  const AppNav = () => {
    const { authToken } = useAuth();
    return (
      <NavigationContainer>
        {authToken ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  };

  return (
    <AuthProvider>
      <CartProvider>
        <AppNav />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
