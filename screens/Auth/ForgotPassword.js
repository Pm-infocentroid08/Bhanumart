//import liraries
import React, { useState, createRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { Entypo } from 'react-native-vector-icons'
import FormInput from './../../components/Form/FormInput';
import FormButton from '../../components/Form/FormButton';
import { COLORS, SIZES } from './../../constants/theme';
import Loader from '../Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component
const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
    const emailInputRef = createRef();
    const onSubmit = () => {
        setErrortext('');
        if (!email) {
            alert('Please fill Email Id Field');
            return;
        }
        setLoading(true);
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("email", email);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/forgotpassword", requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
          setLoading(false);
  
          // If server response message same as Data Matched
          if (responseJson.responce === true) {
            AsyncStorage.setItem('user_id', responseJson.id);
            navigation.navigate('PassConf')
          } else {
            setErrortext(responseJson.massage);
            Alert.alert('Please check your email id ');
          }
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
        
    }
    return (
        <View style={styles.container}>
        <Loader loading={loading} />
            <Image
                source={{ uri: 'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg' }}
                resizeMode='contain'
                style={styles.logo}
            />
            <Text style={styles.text}>BHANU MART </Text>
            <Text style={styles.textsub}>Password Reset Page</Text>
            <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                    <Entypo name='email' size={25} color='tomato' />
                </View>
                <TextInput
                    onChangeText={(UserEmail) =>
                        setEmail(UserEmail)
                    }
                    placeholder="Enter Email" //dummy@abc.com
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        emailInputRef.current &&
                        emailInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                    style={styles.input}
                />
            </View>

            <FormButton
                titleText='Forgot Password'
                iconType='arrow-forward'
                onPress={onSubmit} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 20,
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover'
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051f5f',
    },
    textsub: {
        fontSize: 22,
        marginBottom: 10,
        color: COLORS.gray,
    },
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: 50,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: SIZES.padding,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: COLORS.gray,
        borderRightWidth: 1,
        width: 60
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: SIZES.height / 1.5,
        height: SIZES.height / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1
    }
});

//make this component available to the app
export default ForgotPassword;
