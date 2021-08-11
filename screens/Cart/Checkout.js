//import liraries
import React, { useState, createRef, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, SafeAreaView, ScrollView, ToastAndroid, KeyboardAvoidingView, TextInput, TouchableOpacity, FlatList ,ActivityIndicator} from 'react-native';
import { FONTS, SIZES, COLORS } from '../../constants'
import HeaderBar from './../../components/HeaderBar/index';
import Button from './../../components/Container/Button';

import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader';
// create a component
const CheckOut = ({ navigation }) => {
    function renderBody() {
        const [address1, setAddress1] = useState('');
        const [address2, setAddress2] = useState('');
        const [pinco, setPinCo] = useState('');
        const [loading, setLoading] = useState(false);
        const [city, setCity] = useState('');
        const [states, setStates] = useState('');
        const [country, setCountry] = useState('');
        const [district, setDistrict] = useState('');
        const [errortext, setErrortext] = useState('');
        const addressInputRef = createRef();
        const cityInputRef = createRef();
        const pinInputRef = createRef();
        
        const userInfo = useSelector(state => state.users);
       
       
        
        const showToast = (msg) => {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        };
        const handleSubmit = () => {
            
            if (!address1) {
                showToast('Address missing');
                return;
            }
            if (!city) {
                showToast('City missing');
                return;
            }
            if (!pinco) {
                showToast('City Code missing');
                return;
            }
            setLoading(true)
            let address = `${address1}, ${address2}`;
            const myHeaders = new Headers();
            const formdata = new FormData();
            formdata.append("user_id", userInfo);
            formdata.append("address", address);
            formdata.append("address_2", address2);
            formdata.append("country_id", 'India');
            formdata.append("state_id", states);
            formdata.append("district_id", 'Indore');
            formdata.append("city_id", city);
            formdata.append("postcode", pinco);
            formdata.append("type", "1");
           
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };
            fetch('https://bhanumart.vitsol.in/api/add_shiping_addres', requestOptions)
                .then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.responce === true) {
                        navigation.replace('AddEdt');

                    } else {
                        setErrortext(responseJson.msg);
                    }
                })
                .catch((error) => {
                    //Hide Loader
                    setLoading(false);
                    console.error(error);
                });

        }
        return (
            <View style={styles.bodyContainer}>
                <HeaderBar titleText='User Details' onPress={() => navigation.goBack()} />
                <Loader loading={loading}/>
                <View style={styles.header}>
                    <Text style={styles.htext}> Address Information</Text>
                </View>
                <View style={styles.header}>
                    <Text style={[styles.htext,{color:COLORS.bgcolor}]}>{errortext}</Text>
                </View>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>
                    <KeyboardAvoidingView enabled>

                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(e) => setAddress1(e)}
                                placeholder="* Enter Your Address"
                                placeholderTextColor="#8b9cb5"
                                keyboardType="email-address"
                                value={address1}
                                ref={addressInputRef}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    addressInputRef.current &&
                                    addressInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(e) => setAddress2(e)}
                                placeholder="* Enter Your Address"
                                placeholderTextColor="#8b9cb5"
                                keyboardType="email-address"
                                value={address2}
                                ref={addressInputRef}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    addressInputRef.current &&
                                    addressInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={[styles.SectionStyle, { justifyContent: 'space-around' }]}>
                        <TextInput
                                style={styles.inputStyle}
                                onChangeText={(e) => setCity(e)}
                                placeholder="* Enter Your City"
                                placeholderTextColor="#8b9cb5"
                                keyboardType="email-address"
                                value={city}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    cityInputRef.current &&
                                    cityInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                            />
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(e) => setStates(e)}
                                placeholder="* Enter Your State"
                                placeholderTextColor="#8b9cb5"
                                keyboardType="email-address"
                                value={states}
                                ref={addressInputRef}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    addressInputRef.current &&
                                    addressInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                            />

                        </View>

                        <View style={styles.SectionStyle}>
                        <TextInput
                                style={[styles.inputStyle, { marginRight: 5 }]}
                                onChangeText={(e) => setPinCo(e)}
                                placeholder="* Enter Your Pincode"
                                value={pinco}
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="sentences"
                                ref={pinInputRef}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    pinInputRef.current && pinInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                            />
                        </View>
                        
                    </KeyboardAvoidingView>
                </ScrollView>

                <Button bText='Confirm' onPress={handleSubmit} />

            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderBody()}
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyContainer: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: COLORS.white,
        padding: 10
    },
    header: {
        maxHeight: 30,
        justifyContent: 'center',
        padding: 10
    },
    htext: {
        color: COLORS.darkgray,
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 10
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        color: COLORS.gray,
        paddingLeft: 10,
        paddingRight: 5,
        borderWidth:1,
        borderColor:COLORS.gray,
        marginHorizontal: 2,
        borderRadius:8
    },
    
    modal: {
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
        alignItems: 'center',
        flex:1,
        marginTop:80,
        maxHeight:SIZES.height*0.5,
        margin:10,
        borderRadius:10
    },
    option: {
        alignItems: 'center',
        paddingLeft: 15,
        flex:1,
        width:'100%'
    },
    text: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color:COLORS.bgcolor
    }
});

//make this component available to the app
export default CheckOut;
 




