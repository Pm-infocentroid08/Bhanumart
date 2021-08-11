
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,Text,
  StyleSheet,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './../constants/theme';
import {Fontisto} from 'react-native-vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import {ADD_USER} from '../ReduxCart/CartItem'
const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      await AsyncStorage.getItem('user_id').then((value) =>
      navigation.replace(
        value === null ? 'Auth' : 'Drawer'
      ));
      const datam=await AsyncStorage.getItem('user_toid')
      dispatch({ type: ADD_USER, payload: datam })
    } catch(e) {
      // error reading value
      console.error(e)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      getData();
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Bhanu.png')}
        style={{width: '90%',height:'30%', resizeMode: 'contain', margin: 30}}
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