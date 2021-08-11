
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './../../constants/theme';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const getData = async () => {
    try {
      await AsyncStorage.getItem('user_id').then((value) =>
      navigation.replace(
        value === null ? 'Auth' : 'Drawer'
      ))
      
    } catch(e) {
      // error reading value
      console.log(e)
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
        source={{uri:'https://cdn.logo.com/hotlink-ok/logo-social.png'}}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
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
    backgroundColor: COLORS.bgcolor,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});