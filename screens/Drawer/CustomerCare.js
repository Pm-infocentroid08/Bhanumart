//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView ,ActivityIndicator} from 'react-native';
import { COLORS, FONTS, SIZES } from './../../constants/theme';
import HeaderBar from './../../components/HeaderBar/index';
import { Ionicons, Fontisto, Entypo } from 'react-native-vector-icons'
import { Feather } from 'react-native-vector-icons';

const ListBox = ({ titleText, subTitle1, subTitle2 }) => {
    const [show, setShow] = React.useState(null);
    return (
        <View style={{ padding: 10 }}>
            <TouchableOpacity style={styles.hBox} onPress={() => setShow(!show)}>
                <Text style={{ ...FONTS.h3, fontWeight: 'bold' }}>{titleText}</Text>
                <Ionicons name='ios-chevron-forward' size={SIZES.padding} color={COLORS.black} />
            </TouchableOpacity>
            {
                show ? (
                    <View style={styles.subContainer}>
                        <Text style={{ ...FONTS.body3, paddingVertical: 8 }}>{subTitle1}</Text>
                        <Text style={{ ...FONTS.body3, paddingVertical: 8 }}>{subTitle2}</Text>
                    </View>
                ) : null
            }

        </View>
    )
}
const CustomerCare = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [faqs, setFaqs] = useState([]);

    const getFaqs = () => {
        const myHeaders = new Headers();
        
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/faq_page", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.responce === true) {
                setFaqs(result.data);
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
            <HeaderBar titleText='FAQs' onPress={() => navigation.goBack()} />

            <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: COLORS.black, paddingLeft: SIZES.radius }}>Top Ask FAQs</Text>
            {isLoading ? <ActivityIndicator size="large" color="green" /> :  <View style={styles.mbox}>
              
                <ListBox titleText={faqs.title} subTitle1={faqs.description} />
              
            </View>}
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: COLORS.lightGray,
    },
    mbox: {
        padding: 15,
        margin: SIZES.radius,
        borderRadius: SIZES.base,
        backgroundColor: COLORS.white
    },
    flbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 2,

    },
    card: {
        width: SIZES.width * 0.28,
        padding: 10,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.base
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: COLORS.lightGray,
        marginBottom: 5
    },
    shadow: {
        shadowColor: COLORS.bgcolor,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.86,
        elevation: 16
    },
    seperator: {
        height: 1,
        backgroundColor: COLORS.gray,
        marginHorizontal: 15
    },
    hBox: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.base
    },
    subContainer: {
        padding: 10
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', backgroundColor: COLORS.white,
        marginHorizontal: 10, height: 60, borderRadius: 25
    }
});

//make this component available to the app
export default CustomerCare;
