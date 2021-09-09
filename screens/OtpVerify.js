//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { COLORS } from './../constants/theme';
import { BASE_URL } from './../Base';

// create a component
const TextO = ({ ...rest }) => {
    return (
        <View style={styles.otpCon}>
            <TextInput
                style={styles.input}
                numberOfLines={1}
                maxLength={1}
                returnKeyType="next"
                keyboardType="numeric"
                {...rest}
            />
        </View>
    );
}
const VerifyUser = ({ route, navigation }) => {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState('');
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');
    const [otp5, setOtp5] = useState('');
    const [otp6, setOtp6] = useState('');
    const [otp7, setOtp7] = useState('');
    const [otp8, setOtp8] = useState('');
    const [errors, setErrors] = useState('');
    
    
    React.useEffect(() => {
        let { user } = route.params;
        setUserId(user.id);
        setUser(user);
        console.log(user)
    },[])

    const resendOtp = () => {
        const myHeaders = new Headers();
        const formdata = new FormData();
        formdata.append("firstname", user.firstname);
        formdata.append("lastname", user.lastname);
        formdata.append("email", user.email);
        formdata.append("password", user.password);
        formdata.append("telephone", user.telephone);
        formdata.append("address_1", "");
        formdata.append("address_2", "");
        formdata.append("city_id", "");
        formdata.append("postcode", "");
        formdata.append("country_id", "");
        formdata.append("state_id", "");
        formdata.append("newsletter", user.newsletter);
        formdata.append("token", user.token);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL+'registration', requestOptions)
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.response === true) {
                    alert('Otp Send Successfully')
                } else {
                    setErrortext(responseJson.error);
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    }

    

    let cont = `${otp1}${otp2}${otp3}${otp4}`;
    let cont2 = `${otp5}${otp6}${otp7}${otp8}`;
    const verify = () => {
        if (!cont) {
            alert('Fill Email otp Field')
            return;
        }
        
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("id", userId);
        formdata.append("otp", cont);
        formdata.append("mobile_otp", cont2);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL+"check_otp", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    navigation.replace('Auth');
                } else {
                    setErrors('You have entered wrong OTP')
                }
            })
            .catch(error => console.log('error', error));
    }
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuckAtDO6skSzw6BokB-sHe00v1NEHT9YF2h1H--CD3CSv6_7qIdqpxguJYxOvgnhJClM&usqp=CAU' }}
                style={{ alignSelf: 'center', width: 200, height: 300 }}
                resizeMode='contain'
            />
            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: COLORS.gray, fontSize: 20, width: '100%', paddingHorizontal: 15, marginTop: -50 }}>Verify your OTP Send on your Email Address and Mobile Number</Text>
            <ScrollView style={{ flex: 1 }}>

                <KeyboardAvoidingView enabled>
                    <Text style={{ color: COLORS.bgcolor, fontWeight: 'bold', paddingVertical: 5, textAlign: 'center', fontSize: 18 }}>Enter your Email OTP</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, height: 50, marginHorizontal: 30, alignSelf: 'center' }}>
                        <TextO onChangeText={(UserAge) => setOtp1(UserAge)} />
                        <TextO onChangeText={(UserAge) => setOtp2(UserAge)} />
                        <TextO onChangeText={(UserAge) => setOtp3(UserAge)} />
                        <TextO onChangeText={(UserAge) => setOtp4(UserAge)} />

                    </View>
                    <Text style={{ color: COLORS.bgcolor, fontWeight: 'bold', paddingVertical: 5, textAlign: 'center', fontSize: 18 }}>Enter your Mobile OTP</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, height: 50, marginHorizontal: 30, alignSelf: 'center' }}>
                        <TextO onChangeText={(UserAge) => setOtp5(UserAge)} />
                        <TextO onChangeText={(UserAge) => setOtp6(UserAge)} />
                        <TextO onChangeText={(UserAge) => setOtp7(UserAge)} />
                        <TextO onChangeText={(UserAge) => setOtp8(UserAge)} />

                    </View>
                    <View style={{ height: 80, width: '100%' }}>
                        <TouchableOpacity style={{
                            height: 40, marginHorizontal: 60, marginVertical: 15, backgroundColor: COLORS.bgcolor,
                            justifyContent: 'center', alignItems: 'center', borderRadius: 15
                        }}
                            onPress={verify}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.white, textTransform: 'uppercase', letterSpacing: 2 }}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                    
                        <TouchableOpacity onPress={resendOtp}>
                            <Text style={{ fontWeight: '200', color: COLORS.gray, textAlign: 'center' }}>I don't received OTP...!{' '}
                                <Text style={{ fontWeight: 'bold', color: COLORS.bgcolor, textTransform: 'uppercase', letterSpacing: 2, fontSize: 15 }}>Resend Otp ?</Text></Text>

                        </TouchableOpacity>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 10, color: COLORS.bgcolor }}>{errors}</Text>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: COLORS.white,
    },
    otpCon: {
        width: 45,
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.gray,
        marginHorizontal: 5
    },
    input: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        textAlign: 'center'
    },
});

//make this component available to the app
export default VerifyUser;
