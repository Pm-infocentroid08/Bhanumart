// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useEffect,useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView, Alert
} from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_USER } from '../ReduxCart/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader';
import { COLORS } from './../constants/theme';
import VerifyUser from './OtpVerify';
import { BASE_URL } from './../Base';
import {useNavigation} from '@react-navigation/native'


const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [user, setUser] = useState('');
  const [type, setType] = useState(0);
  const [tokens, setToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const dispatch = useDispatch()
  const passwordInputRef = createRef();

  

  useEffect(() => {

    //expo token registration purpose
    registerForPushNotificationsAsync().then(token => setToken(token))
      .catch(err => console.error(err));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        navigation.navigate('Notification');
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        navigation.navigate('Notification');
      });

     
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
  }, []);

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);

    const myHeaders = new Headers();

    const formdata = new FormData();
    formdata.append("email_mobile", userEmail);
    formdata.append("password", userPassword);
    formdata.append("token", tokens);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(BASE_URL+"login", requestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      //Hide Loader
      setLoading(false);

      // If server response message same as Data Matched
      if (responseJson.responce === true) {
        AsyncStorage.setItem('user_id', responseJson.data.email);
        AsyncStorage.setItem('user_toid', responseJson.data.id);
        dispatch({ type: ADD_USER, payload: responseJson.data.id })
        navigation.replace('Drawer');
      } else {
        setErrortext(responseJson.error);
        setUser(responseJson.data||'');
        setType(responseJson.type);
      }
    })
    .catch((error) => {
      //Hide Loader
      setLoading(false);
      console.error(error);
    });
  };

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

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/images/Logo.png')}

            style={styles.logo}
          />
          <Text style={styles.text}>Welcome Back </Text>
          <Text style={styles.textsub}>to BHANU MART </Text>

        </View>
        <View>
          {errortext != '' ? (
            <Text style={[styles.errorTextStyle, { paddingVertical: 5 }]}>
              {errortext}
            </Text>
          ) : null}
          <KeyboardAvoidingView enabled>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                returnKeyType="next"
              />
            </View>

            {
              type === 1 ?
                <View style={{ width: 120, height: 40, borderRadius: 20, marginBottom: 15, alignSelf: 'center', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => navigation.navigate('Verify', { user })}>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Verify User</Text>
                  </TouchableOpacity>
                </View> : <View />
            }

            <View style={{ height: 20, justifyContent: 'center', alignItems: 'flex-end', marginRight: 45 }}>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
                <Text style={{ color: COLORS.bgcolor, fontWeight: 'bold' }}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Register')}>
              New Here ? {' '}
              <Text style={{ color: COLORS.bgcolor }}>Register</Text>
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.bgcolor,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: COLORS.white,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  inputStyle: {
    flex: 1,
    color: COLORS.gray,
    paddingLeft: 20,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.gray,
  },
  registerTextStyle: {
    color: COLORS.gray,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  logo: {
    height: 100,
    width: '90%',
    resizeMode: 'contain'
  },
  text: {
    fontSize: 25,
    marginBottom: 10,
    color: '#051f5f',
  },
  textsub: {
    fontSize: 22,
    marginBottom: 10,
    color: COLORS.gray,
  },
});

/*

 const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);

    const myHeaders = new Headers();
    const formdata = new FormData();
    formdata.append("email_mobile", userEmail);
    formdata.append("password", userPassword);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(BASE_URL+'login', requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);

        // If server response message same as Data Matched
        if (responseJson.responce === true) {
          AsyncStorage.setItem('user_id', responseJson.data.email);
          AsyncStorage.setItem('user_toid', responseJson.data.id);
          dispatch({ type: ADD_USER, payload: responseJson.data.id })
          navigation.replace('Drawer');
        } else {
          setErrortext(responseJson.error);
          setUser(responseJson.data||'');
          setType(responseJson.type);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

*/
