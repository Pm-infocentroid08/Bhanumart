//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from './../../constants/theme';
import Loader from '../Loader';
import { BASE_URL } from './../../Base';
const PaymentStatus = ({ route, navigation }) => {
    const [status, setStatus] = useState(false);
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    console.log(data)
    useEffect(() => {
        let { ids } = route.params;
        getData(ids)
    }, [2000])

    const getData = (id) => {
        const myHeaders = new Headers();
        const formdata = new FormData();
        formdata.append("order_id", id);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL+"payment_status", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setData(result.data)
                } else {
                    setData('')
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    
    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <View style={[styles.fBox, styles.shadow]}>
            {
                    data.status === 'TXN_FAILURE'?  <Image
                    source={{ uri: 'https://kvnmail.com/in/wp-content/uploads/2017/08/round-error-icon-16.jpg' }}
                    resizeMode='contain'
                    style={styles.img}
                />:
               
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTszlCtFNIssoRYZgJTpLH1eHKkNGN2scIsAO-J8EQ39aLophtURhtmFlA6v83PhpgzoGk&usqp=CAU' }}
                    resizeMode='contain'
                    style={styles.img}
                />}
                {
                    data.status === 'TXN_FAILURE'?<Text style={{ fontSize: 22, color: COLORS.bgcolor, fontWeight: '900', paddingVertical: 15 }}>Payment Failed</Text>:
                    <Text style={{ fontSize: 22, color: 'green', fontWeight: '900', paddingVertical: 15 }}>Payment done Successfully</Text>
                }
                
                <Text style={{ fontSize: 12, color: COLORS.primary, fontWeight: '600' }} >Tnx. Id : {data.txnid}</Text>
                <View style={styles.box}>
                    <Text style={{ fontSize: 16, color: COLORS.black, fontWeight: '600', marginBottom: 15 }}>Tnx. Amount :</Text>
                    <Text style={{ fontSize: 16, color: COLORS.lgray, fontWeight: '600', marginBottom: 15 }} numberOfLines={2}> {data.txnamount}</Text>
                </View>
                <View style={[styles.box, { marginTop: -30, width: '100%' }]}>
                    <Text style={{ fontSize: 16, color: COLORS.black, fontWeight: '600', marginBottom: 15 }}>Tnx. Date :</Text>
                    <Text style={{ fontSize: 16, color: COLORS.lgray, fontWeight: '600', marginBottom: 15 }} numberOfLines={2}> {data.txndate}</Text>
                </View>


            </View>
            <View style={{ justifyContent: 'space-around', alignItems: 'center', marginTop: 40,flexDirection:'row' }}>
                <TouchableOpacity style={[styles.btn, styles.shadow,{height:40}]}
                    onPress={() => navigation.navigate('Orders')}>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Manage Your Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.shadow,{backgroundColor:COLORS.white,height:40,
                marginHorizontal:5,borderWidth:1,borderColor:COLORS.gray,marginRight:20}]}
                    onPress={() => navigation.navigate('Home')}>
                    <Text style={{ color: COLORS.gray, fontWeight: 'bold' }}>Back to Store</Text>
                </TouchableOpacity>
            </View>

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
    },
    fBox: {
        flex: 1,
        maxHeight: SIZES.height * 0.5,
        width: SIZES.width * 0.9,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        alignItems: 'center'
    },
    img: {
        width: 150,
        height: 150,
        marginTop: 10
    },
    btn: {
        flex: 1,
        maxHeight: 40,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.gray,
        borderRadius: 8,
        marginHorizontal: 20
    },
    shadow: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.6,
        shadowRadius: 4.24,
        elevation: 20
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        flex: 1,
        width: '100%',
        height: 20
    }
});

//make this component available to the app
export default PaymentStatus;

