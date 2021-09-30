//import liraries
import React, { useState, createRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, ToastAndroid, TextInput } from 'react-native';
import { SIZES, COLORS } from '../../constants';
import HeaderBar from '../../components/HeaderBar';
import { useSelector } from 'react-redux'
import Loader from '../Loader';
import { BASE_URL } from './../../Base';

// create a component
const OrderDetails = ({ route, navigation }) => {
    const [order, setOrder] = useState(null);
    const [reason, setReason] = useState('');
    const [caVisible, setCavisible] = useState(false);
    const userInfo = useSelector(state => state.users);
    const reasonInputRef = createRef();
    const [loading, setLoading] = useState(false);
    
    const showToastWithGravity = (msg) => {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };
    const orderCancel = () => {
        if (!reason) {
            alert('Please Mention Reason');
            return;
        }
        setLoading(true);
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("user_id", userInfo);
        formdata.append("order_id", order?.order_id);
        formdata.append("reason", reason);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(BASE_URL+"cancel_order", requestOptions)
            .then(response => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                if (responseJson.responce === true) {
                    navigation.navigate('Orders');
                } else {
                    console.error('Please check your email id or password');
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });


    }
    React.useEffect(() => {
        let { item } = route.params;
        setOrder(item)
    })
    const getButton=()=>{
        if(order?.order_status === '8'||order?.order_status === '0'){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100, flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.btn, styles.shadow]}
                            onPress={() => navigation.navigate('Home')}>
                            <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Back to Home</Text>
                        </TouchableOpacity>

                    </View>  )
        }
        if(order?.order_status === '7'){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100, flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.btn, styles.shadow]}
                            onPress={() => navigation.navigate('Home')}>
                            <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Back to Home</Text>
                        </TouchableOpacity>

                    </View>  )
        }
        else if(order?.order_status === '6'){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100, flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.btn, styles.shadow]}
                            onPress={() => navigation.navigate('Home')}>
                            <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Back to Home</Text>
                        </TouchableOpacity>

                    </View>  )
        }
        else if(order?.order_status === '5'){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100, flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.btn, styles.shadow]}
                            onPress={() => navigation.navigate('Home')}>
                            <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Back to Home</Text>
                        </TouchableOpacity>

                    </View>  )
        }else{
            return(
                <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', height: 100, flexDirection: 'row' }}>
                            <TouchableOpacity style={[styles.btn, styles.shadow]}
                                onPress={() => navigation.navigate('Home')}>
                                <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Back to Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, styles.shadow, { backgroundColor: COLORS.bgcolor }]}
                                onPress={() => setCavisible(true)}>
                                <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Cancel Order</Text>
                            </TouchableOpacity>
                        </View>
            )
        }
    }
    const getTotal = () => {
        let total = 0;
        const items = order?.salelist;
        for (let i = 0; i < order?.salelist.length; i++) {
          let sum = Number(items[i].product_price * items[i].qty)
          total = total + sum
        }
        return <Text >Rs.{' '}{total}</Text>
      }
      const getTotalSave = () => {
        let total = 0;
        const items = order?.salelist;
        for (let i = 0; i < order?.salelist.length; i++) {
          let sum = Number(items[i].product_price * items[i].qty)-Number(items[i].sale_price * items[i].qty)
          total = total + sum
        }
        return <Text >Rs. -{' '}{total}</Text>
      }
    if (caVisible === true) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Loader loading={loading} />
                <View style={{ padding: 10, borderRadius: 15, borderColor: COLORS.lgray, borderWidth: 1 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: COLORS.black, paddingVertical: 6 }}>Specify Reason to Cancel your Order</Text>
                    <View style={styles.seperator} />
                    <TextInput
                        placeholder='Enter Reason'
                        placeholderTextColor={COLORS.gray}
                        style={{
                            height: 40,
                            borderRadius: 8,
                            marginHorizontal: 10,
                            paddingLeft: 16,
                            borderWidth: 1,
                            borderColor: COLORS.primary,
                            marginTop: 10,
                            color: COLORS.gray
                        }}
                        onChangeText={(UserEmail) =>
                            setReason(UserEmail)
                        }
                        onSubmitEditing={() =>
                            reasonInputRef.current &&
                            reasonInputRef.current.focus()
                        }
                    />
                    <TouchableOpacity style={[styles.btn, styles.shadow, { backgroundColor: COLORS.bgcolor, marginTop: 10, alignSelf: 'center' }]}
                        onPress={orderCancel}>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    function renderBody() {
        return (
            <View style={{ flex: 1, paddingTop: 40 }}>
                <HeaderBar titleText='Order History' onPress={() => navigation.goBack()} />
                <Loader loading={loading} />
                <View style={styles.fDox}>
                    <Text style={{ color: COLORS.black, fontWeight: 'bold', marginRight: '50%', fontSize: 16 }}>Order Id :</Text>
                    <Text style={{ color: COLORS.gray, fontWeight: '600', textAlign: 'left', fontSize: 16 }}>#{order?.order_id}</Text>
                </View>
                <View style={styles.fDox}>
                    <Text style={{ color: COLORS.black, fontWeight: 'bold', marginRight: '45%', fontSize: 16 }}>Order Date :</Text>
                    <Text style={{ color: COLORS.gray, fontWeight: '600', textAlign: 'left', fontSize: 16 }}>{order?.order_date}</Text>
                </View>
                <View style={styles.seperator} />

                <View>
                    <View style={{ flex: 1 }}>
                        {order?.salelist.map(item => (
                            <View style={{ flex: 1, flexDirection: 'row', borderColor: COLORS.lgray, paddingHorizontal: 10, backgroundColor: COLORS.white, paddingVertical: 10, margin: 5, borderWidth: 1 }}>
                                <View style={{ flex: 1, marginTop: 10 }}>
                                    <Text>{item.product_name}</Text>
                                    <Text>{item.size}</Text>
                                    <Text>Rs. {item.sale_price}</Text>
                                    <Text style={{fontWeight:'bold',color:COLORS.gray}}>Quantity. {item.qty}</Text>
                                    <Text style={{fontWeight:'bold',color:COLORS.black}}>Total. Rs.{Number(item.qty)*Number(item.sale_price)}</Text>
                                </View>
                                <View style={{
                                    width: 100,
                                    height: 100
                                }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        resizeMode='contain'
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.seperator} />
                    <View style={{ flex: 1, width: '95%', backgroundColor: COLORS.white, marginVertical: 8, marginHorizontal: 10, padding: 10 }}>
                        <Text style={{ color: COLORS.darkgray, paddingVertical: 4, fontWeight: 'bold' }}>Shipping Details</Text>
                        <View style={styles.seperator} />
                        <Text style={{ fontWeight: 'bold', paddingVertical: 8, fontSize: 15 }}>{order?.first_name}{' '}{order?.last_name}</Text>
                        <Text style={{ fontWeight: '600', paddingVertical: 8, fontSize: 12, color: COLORS.gray }}>{order?.address}{' '}{order?.pincode}</Text>
                        <Text style={{ fontWeight: '600', paddingVertical: 8, fontSize: 12, color: COLORS.gray }}>Mobile Number :{' '}{order?.mobile}</Text>
                        <Text style={{ fontWeight: '600', paddingVertical: 8, fontSize: 12, color: COLORS.gray }}>Selected Time Slot :{' '}{order?.time_slot}</Text>
                    </View>
                    <View style={[styles.seperator]} />
                    <View style={{ flex: 1, width: '95%', backgroundColor: COLORS.white, marginTop: 5, marginHorizontal: 10, padding: 10 }}>
                        <Text style={{ color: COLORS.darkgray, paddingVertical: 4, fontWeight: 'bold' }}>Billing Details</Text>
                        <View style={styles.seperator} />
                        <View style={styles.fDox}>
                            <Text style={{ color: COLORS.black, fontWeight: 'bold', marginRight: 40, fontSize: 16 }}>Transaction Id :</Text>
                            <Text style={{ color: COLORS.gray, fontWeight: '600', textAlign: 'left', fontSize: 16 }}>#{order?.txn_id}</Text>
                        </View>
                        <View style={styles.fDox}>
                            <Text style={{ color: COLORS.black, fontWeight: 'bold', marginRight: 40, fontSize: 16 }}>Payment Mode :</Text>
                            <Text style={{ color: COLORS.gray, fontWeight: '600', textAlign: 'left', fontSize: 16 }}>{order?.payment_mode}</Text>
                        </View>
                        <View style={styles.fDox}>
                            <Text style={{ color: COLORS.black, fontWeight: 'bold', marginRight: 40, fontSize: 16 }}>Payment Status :</Text>
                            {
                                order?.payment_mode==='Online' ? 
                                <Text style={{ color: COLORS.gray, fontWeight: '600', textAlign: 'left', fontSize: 16 }}>{order?.order_status==='8' || order?.order_status==='0'? 'Failed':'Success'}</Text>:
                                <Text style={{ color: COLORS.gray, fontWeight: '600', textAlign: 'left', fontSize: 16 }}>{order?.order_status==='8' || order?.order_status==='0'? 'Failed':'pending'}</Text>
                            }
                            
                        </View>
                        <View style={styles.fDox}>
                            <Text style={{ color: COLORS.black, fontWeight: 'bold', marginRight: 50, fontSize: 16 }}>Item Quantity :</Text>
                            <Text style={{ color: COLORS.gray, fontWeight: '600', textAlign: 'left', fontSize: 16 }}>{order?.item_qty}</Text>
                        </View>
                        <View style={styles.fDox}>
                            <Text style={{ color: COLORS.black, fontWeight: 'bold', marginRight: 75, fontSize: 16 }}>Total MRP :</Text>
                            <Text style={{ color: COLORS.gray, fontWeight: '600', textAlign: 'left', fontSize: 16 }}>{getTotal()}</Text>
                        </View>
                        <View style={styles.fDox}>
                            <Text style={{ color: COLORS.black, fontWeight: 'bold', marginRight: 28, fontSize: 16 }}>Delivery Charges :</Text>
                            <Text style={{ color: COLORS.gray, fontWeight: '600', textAlign: 'left', fontSize: 16 }}>Rs.{' '}{order?.delivery_fee}</Text>
                        </View>
                        <View style={styles.fDox}>
                            <Text style={{ color: COLORS.black, fontWeight: 'bold', marginRight: 48, fontSize: 16 }}>Total Save :</Text>
                            <Text style={{ color: COLORS.bgcolor, fontWeight: '600', textAlign: 'left', fontSize: 16 }}>{'       '}{getTotalSave()} </Text>
                        </View>
                        <View style={styles.fDox}>
                            <Text style={{ color: COLORS.black, fontWeight: 'bold', marginRight: 48, fontSize: 16 }}>Coupon Discount :</Text>
                            <Text style={{ color: COLORS.bgcolor, fontWeight: '600', textAlign: 'left', fontSize: 16,marginLeft:-22}}>Rs. -{order?.discount} </Text>
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.fDox}>
                            <Text style={{ color: COLORS.black, fontWeight: 'bold', marginRight: 48, fontSize: 16 }}>Total Payment :</Text>
                            <Text style={{ color: COLORS.gray, fontWeight: '600', textAlign: 'left', fontSize: 16 }}>Rs.{' '}{Number(order?.total_price)}</Text>
                        </View>
                    </View>
                </View>
               
                {getButton() }

                <View style={{marginTop:-20}}>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginVertical:10}}
                    onPress={()=>navigation.navigate('CanPol')}>
                        <Text style={{color:COLORS.primary,fontSize:16,fontWeight:'bold'}}>Check our Cancelation Policy Here</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                {renderBody()}
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SIZES.width,
        height: SIZES.height
    },
    fDox: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 5
    },
    seperator: {
        backgroundColor: COLORS.lgray,
        height: 1
    },
    btn: {
        flex: 1,
        maxHeight: 40,
        height: 40,
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
});

//make this component available to the app
export default OrderDetails;
