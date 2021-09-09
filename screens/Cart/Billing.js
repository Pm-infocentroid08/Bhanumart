import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesome5 } from 'react-native-vector-icons'
import { BASE_URL } from './../../Base';
const Billing = ({ navigation }) => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const userInfo = useSelector(state => state.users);

    const getInvoice = () => {
        const myHeaders = new Headers();
        const formdata = new FormData();
        formdata.append("user_id", userInfo);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL+"get_order_history", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setProduct(result.data)
                } else {
                    setProduct(0)
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));

    }

    useEffect(() => {
        getInvoice();
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <HeaderBar titleText='Invoice' onPress={() => navigation.goBack()} />
                <View style={styles.headings}>
                    <Text>Invoice for your purchase</Text>
                </View>
                {loading? <ActivityIndicator size="large" color="orange" />:<View>
                   {product.map((item,index)=>(
                    <View key={index}>
                        <View style={styles.billings}>
                            <Text style={styles.billtext}>Billing details</Text>
                            <View style={styles.textflex}>
                                <Text style={styles.text}>Name : </Text>
                                <Text style={styles.text}>{item.first_name}{' '}{item.last_name}</Text>
                            </View>
                            <View style={styles.textflex}>
                                <Text style={styles.text}>Phone Number : </Text>
                                <Text style={styles.text}>{item.mobile}</Text>
                            </View>
                            <View style={styles.textflex}>
                                <Text style={styles.text}>Email Id : </Text>
                                <Text style={styles.text}>{item.email}</Text>
                            </View>
                            <View style={styles.textflex}>
                                <Text style={styles.text}>Address : </Text>
                                <Text style={styles.text}>{item.address},{' '}{item.pincode}</Text>
                            </View>

                        </View>
                        <View style={styles.orderSumm}>
                            <Text style={styles.billtext}>Order summary</Text>
                            <View style={styles.textflex}>
                                <Text style={styles.text}>Transaction Id : </Text>
                                <Text style={styles.text}>{item.address},{' '}{item.txn_id}</Text>
                            </View>
                            <View
                                style={{
                                    padding: 15,
                                    backgroundColor: 'tomato',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    paddingHorizontal: 20
                                }}>
                                <Text style={{ fontWeight: 'bold', color: '#fff' }}>Total:</Text>

                            </View>

                        </View>
                    </View>
                   ))}
                </View>}
                <View>
                    <TouchableOpacity
                        onPress={this.onPressButton}
                        style={{
                            margin: 10,
                            padding: 15,
                            backgroundColor: '#f7f7f7',
                            elevation: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8
                        }}>
                        <Text>Payment</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headings: {
        backgroundColor: '#f7f7f7',
        padding: 12,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        fontWeight: 'bold'
    },
    orderSumm: {
        flex: 1,
        margin: 10
    },
    billtext: {
        padding: 6,
        borderBottomWidth: 1,
        justifyContent: 'center',
        borderBottomColor: 'tomato',
        fontWeight: 'bold'
    },
    text: {
        margin: 5
    },
    billings: {
        padding: 10,
        margin: 10
    },
    totText: {
        textAlign: 'center',
        color: '#fff'
    },
    textflex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    }
});

export default Billing;