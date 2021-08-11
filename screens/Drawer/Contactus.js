//import liraries
import React, { useState, createRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image, TextInput, Alert } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import HeaderBar from './../../components/HeaderBar/index';
import FormInput from './../../components/Form/FormInput';
import { Ionicons } from 'react-native-vector-icons'
import { useSelector } from 'react-redux'
import Loader from '../Loader';
import {useNavigation} from '@react-navigation/native'
// create a component
const ContactUs = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [
        isQuerySubmitSuccess,
        setIsQuerySubmitSuccess
    ] = useState(false);
    
    const userInfo = useSelector(state => state.users);
    const nameInputRef = createRef();
    const emailInputRef = createRef();
    const queryInputRef = createRef();

    const handleSubmit = () => {
        setErrortext('');
        if (!name) {
            Alert.alert('Please fill Name');
            return;
        }
        if (!email) {
            Alert.alert('Please fill Email');
            return;
        }
        if (!query) {
            Alert.alert('Please fill Query');
            return;
        }
        setLoading(true);
        const myHeaders = new Headers();
        const formdata = new FormData();
        formdata.append("user_id", userInfo);
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("query", query);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/user_queries", requestOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                
                // If server response message same as Data Matched
                if (responseJson.responce === true) {
                    setIsQuerySubmitSuccess(true);

                } else {
                    setErrortext(responseJson.massage);
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    }

    if (isQuerySubmitSuccess) {
        return (<View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Image
                source={require('../../assets/images/Logo.png')}
                resizeMode='contain'
                style={{ width: 150, height: 100 }}
            />

            <Text style={styles.successTextStyle}>
                Your  Query Submit Successful
            </Text>
            <Text style={styles.textSu}>
                We will get Back to you soon. Thank you for your support.
            </Text>
            </View>
            
            <View style={{height:150}}>
            <TouchableOpacity style={{backgroundColor:COLORS.darkgray,padding:10,borderRadius:10,paddingHorizontal:18}}
            onPress={()=>navigation.navigate('Home')}>
                <Text style={{color:COLORS.white,fontWeight:'bold'}}>Back To Home Screen</Text>
            </TouchableOpacity>
            </View>
            

        </View>)
    }
    return (
        <View style={styles.container}>
            <HeaderBar titleText='Contact Us' onPress={() => navigation.goBack()} />
            <Loader loading={loading} />
            <View style={styles.headerContainer}>
                    <Text style={styles.heading}>Enter your Query Here</Text>
                </View>
            <KeyboardAvoidingView enabled>
                <View style={[styles.SectionStyle, { justifyContent: 'space-around' }]}>
                    <TextInput
                        style={[styles.inputStyle, { marginRight: 5 }]}
                        onChangeText={(e) => setName(e)}
                        underlineColorAndroid="#f000"
                        placeholder="Enter Your Name"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            nameInputRef.current && nameInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                    />
                   </View>
                   <View style={[styles.SectionStyle]}>
                   <TextInput
                        style={[styles.inputStyle, { marginRight: 5 }]}
                        onChangeText={(e) => setEmail(e)}
                        underlineColorAndroid="#f000"
                        placeholder="Enter Your Email"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            emailInputRef.current && emailInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                    />
                   </View> 
                   
                    <View style={[styles.SectionStyle,{height:100}]}>
                    <TextInput
                        style={[styles.inputStyle, { marginRight: 5 }]}
                        onChangeText={(e) => setQuery(e)}
                        underlineColorAndroid="#f000"
                        placeholder="Enter Your Query"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        numberOfLines={4}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            emailInputRef.current && emailInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={styles.ButtonContainer}>
                <Text style={{ ...FONTS.h2, color: COLORS.primary }}>Submit Your Query</Text>
                <TouchableOpacity style={styles.toBox} onPress={handleSubmit}>
                    <Ionicons name='ios-chevron-forward' size={SIZES.padding * 1.4} color={COLORS.white} />
                </TouchableOpacity>
            </View>


        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SIZES.padding * 1.5,
        backgroundColor: COLORS.white
    },
    heading:{
        fontSize:20,
        fontWeight:'bold',
        color:COLORS.primary,
        marginHorizontal:50,
        marginTop:15,
        elevation:6
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 50,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
      },
      inputStyle: {
        flex: 1,
        color: COLORS.gray,
        paddingLeft: 20,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: COLORS.primary,
      },
    containerBox: {
        flex: 1,
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        height: SIZES.height
    },
    ButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        marginTop: -40,
        height: SIZES.height * 0.45,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding * 1.5
    },
    toBox: {
        width: SIZES.padding * 3,
        height: SIZES.padding * 3,
        borderRadius: SIZES.padding * 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary
    },
    successTextStyle: {
        color: COLORS.lgray,
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    textSu: {
        color: COLORS.bgcolor,
        fontSize: 15,
        textAlign: 'center',
        paddingHorizontal: 25
    }
});

//make this component available to the app
export default ContactUs;
