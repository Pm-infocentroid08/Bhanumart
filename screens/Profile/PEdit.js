//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, Alert,KeyboardAvoidingView,ScrollView } from 'react-native';
const { width, height } = Dimensions.get('screen');
import { useDispatch, useSelector } from 'react-redux'
import { COLORS, SIZES, FONTS } from './../../constants/theme';
import { FontAwesome5 } from 'react-native-vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from "react-native-flash-message";
// create a component
const FormInput = ({ labelValue, placeholderText, ...rest }) => {
  return (
    <View style={styles.inBox}>
      <View style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <FontAwesome5 name='edit' color='tomato' size={20} />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor='#666'
        {...rest}
      />
    </View>
  )
}
const ProfileUpdate = ({navigation}) => {
  const [users, setUsers] = useState('');
  const [loading, setLoading] = useState(true);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const userInfo = useSelector(state => state.users);

  const getProfile = () => {
    const myHeaders = new Headers();


    const formdata = new FormData();
    formdata.append("user_id", userInfo);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://bhanumart.vitsol.in/api/get_profile", requestOptions)
      .then(response => response.json())
      .then(result => {
        setUsers(result.data);
        setFname(result.data.firstname);
        setLname(result.data.lastname);
        setEmail(result.data.email);
        setPhone(result.data.telephone);
      })
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false))
      .finally(setLoading.bind(undefined, false));
  }



  useEffect(() => {

    getProfile();
  }, []);

  function updateUser() {
    const myHeadersup = new Headers();
    const formdataup = new FormData();
    formdataup.append("user_id", userInfo);
    formdataup.append("firstname", fname);
    formdataup.append("lastname", lname);
    formdataup.append("email", email);
    formdataup.append("telephone", phone);
    const requestOptionsup = {
      method: 'POST',
      headers: myHeadersup,
      body: formdataup,
      redirect: 'follow'
    };
    fetch("https://bhanumart.vitsol.in/api/updateprofile", requestOptionsup)
    .then(response => response.json())
    .then(result => {
      if (result.responce === true) {
        showMessage({
            message: 'User Profile Updated',
            description: "Profile Updated Successfully",
            type: "success",
        });
       navigation.navigate('Profile');
    } else {
        Alert.alert(result.error);
    }
    })
    .catch(error => console.log('error', error));
    
  }


  return (
    <View style={styles.container}>
      <View style={styles.imBox}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcaHa76x9Ub4pBpc2Oth_fVuYn5gJ3zfkgpQ&usqp=CAU' }}
          style={styles.img}
        />
      </View>

      <KeyboardAvoidingView style={{ flex: 1, padding: 10, marginTop: 10 }}>
        <ScrollView style={{ flex: 1}}>        
        <FormInput
          placeholderText={fname || 'Enter First Name'}
          labelValue={fname}
          onChangeText={(e) => setFname(e)}
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
        />
        <FormInput
          placeholderText={lname || 'Enter Last Name'}
          labelValue={lname}
          onChangeText={(e) => setLname(e)}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <FormInput
          placeholderText={email || 'Enter Email'}
          labelValue={email}
          onChangeText={(e) => setEmail(e)}
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
        />
        <FormInput
          placeholderText={phone || 'Enter Phone Number'}
          labelValue={phone}
          onChangeText={(e) => setPhone(e)}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:50 }}>
          <TouchableOpacity style={{ width: 150, height: 40, borderRadius: 15, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={updateUser}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'tomato' }}>Update</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgCon: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'center'
  },
  imBox: {
    flex: 1,
    maxHeight: SIZES.height * 0.24,
    paddingTop: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'gray'
  },
  inBox: {
    height: 50,
    margin: 5,
    flexDirection: 'row'
  },
  btn: {
    height: 60,
    width: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'gray'
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderRadius: 15,
    borderBottomColor: 'gray',
    paddingLeft: 15
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.50,
    elevation: 20
  }
});

//make this component available to the app
export default ProfileUpdate;
