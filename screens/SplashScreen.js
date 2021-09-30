
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View, Text,
  StyleSheet,
  Image
} from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './../constants/theme';
import { Fontisto } from 'react-native-vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_USER } from '../ReduxCart/CartItem'
import { BASE_URL } from './../Base';
const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const [tokens, setToken] = useState('');
  console.log(tokens)
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      await AsyncStorage.getItem('user_id').then((value) =>{
        navigation.replace(
          value === null ? 'Auth' : 'Drawer'
        );
        //getToken(value);
      }
      
       );
      const datam = await AsyncStorage.getItem('user_toid')
      dispatch({ type: ADD_USER, payload: datam })
    } catch (e) {
      // error reading value
      console.error(e)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      getData();
      registerForPushNotificationsAsync().then(token => setToken(token))
      .catch(err => console.error(err));
    }, 5000);
    
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        
vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }


  /*const getToken = (e) => {
    const myHeaders = new Headers();
    
    const formdata = new FormData();
    formdata.append("user_id", e);
    formdata.append("token", tokens);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(BASE_URL+"update_token_user", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }*/

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Bhanu.png')}
        style={{ width: '90%', height: '30%', resizeMode: 'contain', margin: 30 }}
      />

      <ActivityIndicator
        animating={animating}
        color={COLORS.bgcolor}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});