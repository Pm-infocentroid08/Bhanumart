// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from './loader';

const Login = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

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
    formdata.append("password",userPassword);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

    fetch('https://bhanumart.vitsol.in/api/login', requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        
        // If server response message same as Data Matched
        if (responseJson.responce === true) {
          AsyncStorage.setItem('user_id', responseJson.data.email);
          navigation.replace('Home');
          Alert.alert('Login Successfully',responseJson.data.email);
        } else {
          setErrortext(responseJson.msg);
          Alert.alert('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

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
        <Image
                        source={{uri:'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg'}}
                        resizeMode='contain'
                        style={styles.logo}
                    />
                    <Text style={styles.text}>Welcome Back </Text>
                    <Text style={styles.textsub}>to E-commerce </Text>
        <View>
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
                underlineColorAndroid="#f000"
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
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Register')}>
              New Here ? Register
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
    backgroundColor: '#7DE24E',
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
    color: '#000',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  logo:{
    height:150,
    width:150,
    resizeMode:'cover'
},

});
 
