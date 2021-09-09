//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { FONTS, SIZES, COLORS } from '../../constants/index'
import { BASE_URL } from './../../Base';
// create a component
const Privacy = () => {
    const [isLoading, setLoading] = useState(true);
    const [privacy, setPrivacy] = useState([]);

    const getFaqs = () => {
        const myHeaders = new Headers();

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(BASE_URL+"privacy_page", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setPrivacy(result.data);
                } else {
                    Alert.alert(result.message);
                }

            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }
    useEffect(() => {

        getFaqs();

    }, [1500])
    return (
        <ScrollView style={styles.container}>
           {isLoading ? <ActivityIndicator size="large" color="green" /> :  <View>
            <Image
                source={require('../../assets/images/Logo.png')}
                resizeMode='contain'
                style={{
                    width: '95%',
                    height: SIZES.height * 0.3
                }}
            />
                <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: COLORS.black, paddingTop: 5, paddingLeft: 10 }}>{privacy.title}</Text>
                <Text style={{ ...FONTS.body3, color: COLORS.gray, paddingTop: 5, paddingHorizontal: 10 }}>
                   {privacy.description}
                </Text>
            </View>}


        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
        paddingBottom: 20
    },

});

//make this component available to the app
export default Privacy;
