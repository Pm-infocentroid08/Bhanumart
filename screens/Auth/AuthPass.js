// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
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
import Loader from '../Loader';
import { COLORS } from './../../constants/theme';

import AsyncStorage from '@react-native-async-storage/async-storage';

const PasswordConfirm = ({ navigation }) => {
    const [userCPassword, setUserCPassword] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userOtp, setUserOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [errortext, setErrortext] = useState('');

    const passwordInputRef = createRef();
    const getData = async () => {
        try {

            const datam = await AsyncStorage.getItem('user_id')
            setId(datam)
        } catch (e) {
            // error reading value
            console.error(e)
        }
    }

    useEffect(() => {
        getData();
    }, []);
    const handleSubmitPress = () => {
        setErrortext('');
        if (!userOtp) {
            alert('Please fill Otp');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        if (userPassword !== userCPassword) {
            alert('Your Password and Re-Enter Password Not Matching')
        }
        setLoading(true);

        const myHeaders = new Headers();
        const formdata = new FormData();
        formdata.append("id", id);
        formdata.append("otp", userOtp);
        formdata.append("password", userPassword);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch('https://bhanumart.vitsol.in/api/update_password', requestOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);

                // If server response message same as Data Matched
                if (responseJson.responce === true) {
                    navigation.replace('login');
                } else {
                    setErrortext(responseJson.error);
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
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/Logo.png')}

                        style={styles.logo}
                    />
                    <Text style={styles.text}>BHANU MART </Text>
                    <Text style={styles.textsub}>Enter otp from email to get password updated!</Text>

                </View>
                <View>

                    <KeyboardAvoidingView enabled>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) =>
                                    setUserOtp(UserEmail)
                                }
                                placeholder="Enter Otp" //dummy@abc.com
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
                                onChangeText={(UserEmail) =>
                                    setUserPassword(UserEmail)
                                }
                                placeholder="Enter Password" //dummy@abc.com
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                secureTextEntry={true}
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserPassword) =>
                                    setUserCPassword(UserPassword)
                                }
                                placeholder="Re-Enter Password" //12345
                                placeholderTextColor="#8b9cb5"
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
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
                            <Text style={styles.buttonTextStyle}>Confirm</Text>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default PasswordConfirm;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.white,
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
        fontSize: 16,
        marginBottom: 10,
        color: COLORS.gray,
    },
});

