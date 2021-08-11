
import 'react-native-gesture-handler';

// Import React and Component
import React,{useState,useEffect} from 'react';
import { Provider as StoreProvider } from 'react-redux'
// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from './ReduxCart/store';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import DrawerNavigationRoutes from './navigation/DrawerNavigationRoutes';
import * as Font from 'expo-font'
import FlashMessage from "react-native-flash-message";
import OnBoarding from './screens/Auth/OnBoarding';
import {ForgotPassword} from './screens/index'
import PasswordConfirm from './screens/Auth/AuthPass';
import PrivacyPolicy from './screens/PrivacyPolicy';
import VerifyUser from './screens/OtpVerify';
const Stack = createStackNavigator();

const Auth = () => {
  
  return (
    <Stack.Navigator initialRouteName="OnBoarding">
    <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ForgotPass"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PassConf"
        component={PasswordConfirm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PryPol"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Verify"
        component={VerifyUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  
  return (
    <StoreProvider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    <FlashMessage position="top" />
    </StoreProvider>
  );
};

export default App;