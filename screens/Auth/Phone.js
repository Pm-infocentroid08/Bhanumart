import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Touchable,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '../../constants';

import firebase from './../../Firebase/Fire';


export default function App() {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState('+91');
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === 'web'
      ? {
          text:
            'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
        }
      : undefined
  );
  const attemptInvisibleVerification = false;

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <Text style={styles.textH}>Enter phone number</Text>
      <TextInput
        style={styles.texIn}
        placeholder="+1 999 999 9999"
        placeholderTextColor='gray'
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
      />
      
      {!phoneNumber?(<View/>):(<TouchableOpacity
      style={styles.btn}
      onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: 'Verification code has been sent to your phone.',
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }}>
            <Text style={styles.teb}>Send Code</Text>
      </TouchableOpacity>)}
      
       {!verificationId?(<View/>):( <View
       style={{width:'100%'}}><Text style={styles.textH}>Enter Verification code</Text>
      <TextInput
        style={styles.texIn}
        editable={!!verificationId}        
        placeholder="123456"
        placeholderTextColor='gray'
        onChangeText={setVerificationCode}
      />
      </View>)}
      
      {verificationId?(<TouchableOpacity
      style={styles.btn}
      disabled={!verificationId}
      onPress={async () => {
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            showMessage({ text: 'Phone authentication successful 👍' });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }}>
            <Text style={styles.teb}>Confirm Verification Code</Text>
      </TouchableOpacity>):(<View/>)}
     
      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: 'center' },
          ]}
          onPress={() => showMessage(undefined)}>
          <Text
            style={{
              color: message.color || 'blue',
              fontSize: 17,
              textAlign: 'center',
              margin: 20,
              marginTop:50
            }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : (
        undefined
      )}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  );
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    marginTop:20,
    width:'100%',
    backgroundColor:COLORS.white
  },
  textH:{
    fontSize:20,
    fontWeight:'bold',
    letterSpacing:2,
    color:'black',
    paddingVertical:8
  },
  texIn:{
    fontSize:18,
    fontWeight:'bold',
    width:'100%',
    height:50,
    borderWidth:1,
    borderRadius:15,
    paddingLeft:15,
    marginVertical:10
  },
  btn:{
    width:'100%',
    height:60,
    backgroundColor:COLORS.black,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  teb:{
    fontSize:18,
    fontWeight:'bold',
    color:COLORS.white
  }
})