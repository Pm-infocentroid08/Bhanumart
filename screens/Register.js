// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef,useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  ScrollView,Alert,ToastAndroid
} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import Loader from './Loader';
import { COLORS } from './../constants/theme';
import { FontAwesome,MaterialIcons } from 'react-native-vector-icons'
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';                   
import PhoneInput from "react-native-phone-number-input";

const Register = (props) => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userEmailOtp, setUserEmailOtp] = useState('');
  const [userMobileOtp, setUserMobileOtp] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [tokens, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [cVal,setCVal] = useState(0);
  const [errortext, setErrortext] = useState('');
  const [user, setUser] = useState('');
  const [emailVerifyClick,setEmailVerifyClick] = useState(false);
  const [emailVerified,setEmailVerified] = useState(true);
  const [mobileVerifyClick,setMobileVerifyClick] = useState(false);
  const [mobileOtoVerified,setMobileOtpVerified] = useState(true);
  const [disbled,setDisabled]= useState(true);

  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const navigation=useNavigation();
  const emailInputRef = createRef();
  const emailOtpInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();
  const mobileInputRef = createRef();
  
  useEffect(()=>{
    registerForPushNotification()
    .then(token=>setToken(token))
    .catch(err=>console.error(err))
  },[])
  async function registerForPushNotification(){
    let token;
    const {status} =  await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if(status!='granted'){
      const {status} =  await Permissions.getAsync(Permissions.NOTIFICATIONS); 
    }
    if(status!='granted'){
      alert('Failed to get push token.');
      return;
    }
    token =(await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }
  const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
    );
};

function mobileNumber(text) {
  
  if (text[0]<6) {
    setErrortext('Enter Valid Mobile Number');
  }
  else if(text.length>9) {
    setErrortext('Mobile Number should not be greater than 10 digit');
  }
  else if(text[0]>5 && text.length<10) {
    setUserContact(text);
  }
  else {
    setUserContact('');
  }
}
  const handleSubmitButton = () => {
    setErrortext('');
    if (!userFirstName) {
      alert('Please fill First Name');
      return;
    }
    if (!userLastName) {
      alert('Please fill Last Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    //Show Loader
    setLoading(true);
    
    const myHeaders = new Headers();
    const formdata = new FormData();
        formdata.append("firstname", userFirstName);
        formdata.append("lastname", userLastName);
        formdata.append("email", userEmail);
        formdata.append("password", userPassword);
        formdata.append("telephone", userContact);
        formdata.append("address_1", "");
        formdata.append("address_2", "");
        formdata.append("city_id", "");
        formdata.append("postcode", "");
        formdata.append("country_id", "");
        formdata.append("state_id", "");
        formdata.append("newsletter", cVal);
        formdata.append("token", tokens);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

    fetch('https://bhanumart.vitsol.in/api/registration',requestOptions )
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        
        // If server response message same as Data Matched
        if (responseJson.responce === true) {
          setUser(responseJson.massage);
          setIsRegistraionSuccess(true);          
          showToastWithGravity(
            'Registration Successful. Please Login!'
          );
        } else {
          setErrortext(responseJson.error);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  
  const verifyEmailOtp=()=>{
    alert('Email Otp click');
    setEmailVerifyClick(false);
    setEmailVerified(true)
  }
  const verifyMobileOtp=()=>{
    alert('Mobile Otp click');
    setMobileVerifyClick(false);
    setMobileOtpVerified(true)
  }
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          justifyContent: 'center',
        }}>
        <Image
          source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbU1fmijLWP6ecutT0jJpiPKLTF-y1YozXlgrnV6bGGWBy74pQhP2HidqxQgw7e9yJqsY&usqp=CAU'}}
          style={{alignSelf:'center',width:200,height:300}}
          resizeMode='contain'
        />
        <Text style={[styles.successTextStyle,{color:'green',fontSize:22,paddingBottom:20}]}>
          Registration Successful
        </Text>
        <Text style={styles.successTextStyle}>
          Verify your Email and Mobile Number
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Verify',{user})}>
          <Text style={styles.buttonTextStyle}>Verify Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white,paddingTop:60}}>
      <Loader loading={loading} />
      <View style={styles.headerContainer}>
                    <Text style={styles.heading}>Register Now</Text>
                </View>
     
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        
        <KeyboardAvoidingView enabled>
          <View style={[styles.SectionStyle,{justifyContent:'space-around'}]}>
            <TextInput
              style={[styles.inputStyle,{marginRight:5}]}
              onChangeText={(UserName) => setUserFirstName(UserName)}
              placeholder="Enter First Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserLastName(UserName)}
              placeholder="Enter Last Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) =>{
                setUserEmail(UserEmail);
                setEmailVerified(false)
              }}
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
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
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(e) => {
                mobileNumber(e);
                setMobileOtpVerified(false)
                }}
              placeholder="Enter Mobile Number"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={ageInputRef}
              onSubmitEditing={() =>
                addressInputRef.current &&
                addressInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          
          <View style={{flexDirection:'row',
          justifyContent:'flex-start',alignItems:'center',
          paddingHorizontal:50,marginVertical:5}}>
              <View>
              {cVal===1 ?
                                
                              <TouchableOpacity onPress={()=>{setCVal(0);setDisabled(true)}}>
                               <FontAwesome name='check-circle-o' color={COLORS.bgcolor} size={20} />
                              </TouchableOpacity> :
                              <TouchableOpacity onPress={()=>{setCVal(1);setDisabled(false)}}>
                               <FontAwesome name='circle-o' color={COLORS.gray} size={20} />
                              </TouchableOpacity>
              }
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{color:COLORS.gray,fontWeight:'bold',marginLeft:20}}>Agree to our</Text>
                <Pressable onPress={()=>navigation.navigate('PryPol')}>
                <Text style={{color:COLORS.primary,fontWeight:'bold' ,fontSize:16}}> Terms & Policy</Text>
                </Pressable>
              </View>
            
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={[styles.buttonStyle,{backgroundColor:disbled===true?COLORS.gray:COLORS.bgcolor}]}
            activeOpacity={0.5}
            disabled={disbled}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
            {
              disbled ? <Text style={{marginLeft:20,textAlign:'center'}}>Please agree to our Terms & Policy to get Register.</Text>:<View/>
            }
        </KeyboardAvoidingView>
        <View style={{marginTop:10}}>
                        <Pressable style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}
                        onPress={()=>navigation.navigate('login')}>
                            <Text style={{color:COLORS.gray,fontWeight:'bold' ,fontSize:18}}>Already have any account </Text>
                            <Text style={{color:COLORS.bgcolor,fontWeight:'bold' ,fontSize:19,borderBottomWidth:2,borderBottomColor:'#eb4034'}}> Sign In</Text>
                        </Pressable>
                </View>     
              
      </ScrollView>
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
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
    color: COLORS.white,
    borderColor: COLORS.gray,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
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
  heading:{
    fontSize:30,
    fontWeight:'bold',
    color:COLORS.primary,
    marginHorizontal:50,
    marginTop:15,
    elevation:6
},
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: COLORS.gray,
    textAlign: 'center',
    fontSize: 18,
  },
});

