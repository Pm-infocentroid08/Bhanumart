//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ToastAndroid, 
    ActivityIndicator, Image, TextInput, Platform,ActionSheetIOS,Button } from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AntDesign, FontAwesome } from 'react-native-vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { getBasketTotal } from '../../ReduxCart/CartItem';
import { Picker } from '@react-native-picker/picker';
//import { Dropdown } from 'react-native-material-dropdown-v2-fixed'
import Geocoder from 'react-native-geocoding'
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { event } from 'react-native-reanimated';
import { WebView } from 'react-native-webview';
import Loader from '../Loader';
import { useIsFocused } from '@react-navigation/native'
// create a component
const Invoice = ({ route, navigation }) => {
    const [amount, setAmount] = useState('');
    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(true);
    const [errortext, setErrortext] = useState('');
    const [usesShow, setUsesShow] = useState(false);
    const [payShow, setPayShow] = useState(false);
    const [webview, setWebview] = useState(null);
    const [adds, setAdds] = useState('');
    const [resu, setResu] = useState(null);
    const [couponcode, setCouponCode] = useState('');
    const [coupontitle, setCoupontitle] = useState('');
    const [coupon_id, setCoupon_Id] = useState('');
    const [catData, setCatData] = useState('');
    const [catError, setCatError] = useState('');
    const [location, setLocation] = useState('')
    const isFocused = useIsFocused();

    const userInfo = useSelector(state => state.users);

    const [tislo, setTislo] = useState([])
    
    const [selectedTime, setSelectedTime] = useState('Select Delivery Slot')
    let dilivery_slot = `${selectedTime.slote_time}, ${selectedTime.type}`;

    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };

     const getProfile = () => {
        const myHeaders = new Headers();


        const formdata = new FormData();
        formdata.append("user_id", userInfo);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/get_profile", requestOptions)
            .then(response => response.json())
            .then(result => setUsers(result.data))
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    const getDelivery = () => {
        const myHeadersd = new Headers();


        const requestOptionsd = {
            method: 'GET',
            headers: myHeadersd,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/get_delivery_charge", requestOptionsd)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setTislo(result.data)
                } else {
                    setTislo('')
                }
            })
            .catch(error => console.log('error', error));
    }

    const getCartDeteils = () => {
        const myHeaderscat = new Headers();


        const formdatacat = new FormData();
        formdatacat.append("user_id", userInfo);
        formdatacat.append("coupon", couponcode);

        const requestOptionscat = {
            method: 'POST',
            headers: myHeaderscat,
            body: formdatacat,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/get_order_amount", requestOptionscat)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setCatData(result.data)
                    setAmount(result.data.totalprices);
                    if (result.message) {
                        setCatError(result.message || 'Coupon code Apply Successfully');
                    } else {
                        setCatError('');
                    }
                } else {
                    setCatData('')
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }
    React.useEffect(() => {
        let { sadd } = route.params;
        let geo = `${sadd.address}, ${sadd.pincode}`
        getCurrentData(geo)
        setAdds(sadd);
        getProfile();

        getDelivery();
        getCartDeteils();

        const unsubscribe = navigation.addListener('focus', () => {
            getCartDeteils();
        });
        return unsubscribe;

    }, [navigation, isFocused])
    const getCurrentData = async (addr) => {
        Geocoder.init("AIzaSyDtB5sgvGxdLTOK3kAJJ8xvCtElO87pchI");
        Geocoder.from(addr)
		.then(json => {
        		//var addressComponent = json.results[0].address_components[0];
                
                var location = json.results[0].geometry.location;
                console.log(location)
                setLocation(location);
                /*if (location) {
                    const { latitude, longitude } = location;
        
                    getLocationData(latitude, longitude)
                }*/
            
		})
		.catch(error => console.warn(error));
    }


    const placeOrder = (type) => {
        if (type === 'Cash On Delivery') {
            const myHeadersp = new Headers();

            const formdatap = new FormData();
            formdatap.append("user_id", userInfo);
            formdatap.append("fname", users.firstname);
            formdatap.append("lname", users.lastname);
            formdatap.append("telephone", users.telephone);
            formdatap.append("email", users.email);
            formdatap.append("address1", adds.address);
            formdatap.append("postcode", adds.pincode);
            formdatap.append("shipping", catData.charge);
            formdatap.append("time_slot", dilivery_slot);
            formdatap.append("total_price", catData.ordertotal);
            formdatap.append("coupon", catData.applycoupon);
            formdatap.append("coupon_id", coupon_id);
            formdatap.append("coupon_name",coupontitle);
            formdatap.append("country_id", adds.country);
            formdatap.append("state_id", adds.state);
            formdatap.append("city_id", adds.city);
            formdatap.append("district", '1');
            formdatap.append("payment_group", type);
            formdatap.append("TXNID", "");
            formdatap.append("TXNAMOUNT", "");
            formdatap.append("PAYMENTMODE", "");
            formdatap.append("CURRENCY", "");
            formdatap.append("TXNDATE", "");
            formdatap.append("STATUS", "");
            formdatap.append("RESPCODE", "");
            formdatap.append("RESPMSG", "");
            formdatap.append("BANKTXNID", "");
            formdatap.append("GATEWAYNAME", "");
            formdatap.append("BANKNAME", "");
            formdatap.append("CHECKSUMHASH", "");

            const requestOptionsp = {
                method: 'POST',
                headers: myHeadersp,
                body: formdatap,
                redirect: 'follow'
            };

            fetch("https://bhanumart.vitsol.in/api/placed_order", requestOptionsp)
                .then(response => response.json())
                .then((responseJson) => {
                    if (responseJson.responce === true) {
                        navigation.replace('OrderP');
                        showToast(responseJson.massage)

                    } else {
                        setErrortext(responseJson.massage);
                        showToast(responseJson.massage)
                    }
                })
                .catch(error => console.log('error', error));
        } else {
            const myHeadersp = new Headers();

            const formdatap = new FormData();
            formdatap.append("user_id", userInfo);
            formdatap.append("fname", users.firstname);
            formdatap.append("lname", users.lastname);
            formdatap.append("telephone", users.telephone);
            formdatap.append("email", users.email);
            formdatap.append("address1", adds.address);
            formdatap.append("postcode", adds.pincode);
            formdatap.append("shipping", catData.charge);
            formdatap.append("time_slot", dilivery_slot);
            formdatap.append("total_price", catData.ordertotal);
            formdatap.append("coupon", catData.applycoupon);
            formdatap.append("coupon_id", coupon_id);
            formdatap.append("coupon_name",coupontitle);
            formdatap.append("country_id", adds.country);
            formdatap.append("state_id", adds.state);
            formdatap.append("city_id", adds.city);
            formdatap.append("district", "1");
            formdatap.append("payment_group", "Online");
            formdatap.append("TXNID", "");
            formdatap.append("TXNAMOUNT", "");
            formdatap.append("PAYMENTMODE", "");
            formdatap.append("CURRENCY", "");
            formdatap.append("TXNDATE", "");
            formdatap.append("STATUS", "");
            formdatap.append("RESPCODE", "");
            formdatap.append("RESPMSG", "");
            formdatap.append("BANKTXNID", "");
            formdatap.append("GATEWAYNAME", "");
            formdatap.append("BANKNAME", "");
            formdatap.append("CHECKSUMHASH", "");

            const requestOptionsp = {
                method: 'POST',
                headers: myHeadersp,
                body: formdatap,
                redirect: 'follow'
            };

            fetch("https://bhanumart.vitsol.in/api/placed_order", requestOptionsp)
                .then(response => response.json())
                .then((responseJson) => {
                    if (responseJson.responce === true) {

                        navigation.navigate('Paytm', { uri: responseJson.last_id, pid: responseJson.lastid });
                        //WebBrowser.openBrowserAsync('https://bhanumart.vitsol.in/response/transaction/${responseJson.last_id}');    
                    } else {
                        setErrortext(responseJson.massage);
                        showToast(responseJson.massage)
                    }
                })
                .catch(error => console.log('error', error));
        }

    }
    const applyCouponCode = (co_id) => {
        setLoading(true)
        const myHeadersca = new Headers();


        const formdataca = new FormData();
        formdataca.append("user_id", userInfo);
        formdataca.append("coupon", co_id);

        const requestOptionsca = {
            method: 'POST',
            headers: myHeadersca,
            body: formdataca,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/get_order_amount", requestOptionsca)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setCatData(result.data)
                } else {
                    setCatData('')
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }
    const matchCuponCode = () => {
        setLoading(true)
        const myHeadersck = new Headers();


        const formdatack = new FormData();
        formdatack.append("user_id", userInfo);
        formdatack.append("coupon", couponcode);
        formdatack.append("totalamount", amount);
        const requestOptionsck = {
            method: 'POST',
            headers: myHeadersck,
            body: formdatack,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/get_coupon", requestOptionsck)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setCoupon_Id(result.data.id);
                    setCoupontitle(result.data.title);
                    applyCouponCode(result.data.title);
                    setCatError(result.message)

                } else {
                    setCatError(result.message)
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));

    }
    /*function onChangeTextPress(key, value){
        selectedTime[key] = value;
        setSelectedTime(value)
       
      }
    const dropDown=()=>{
        var dataSelected=tislo.map((item,index)=>{
            let data = `${item.slote_time}, ${item.type}`;
            return(
                <Dropdown
                dropdownOffset={{top:5}}
                containerStyle={{borderWidth:1, borderColor:'lightgrey', borderRadius:50, width:DeviceWidth*0.8, paddingLeft:DeviceWidth*0.02}}
                rippleCentered={true}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                data={data}
                valueExtractor={({value})=> value}
                onChangeText={(value)=>{onChangeTextPress(item.name, value)}}
              />
            )
        })
        return dataSelected;
    }
     <Dropdown
                        icon='chevron-down'
                        iconColor='#E1E1E1'
                        label={selectedTime.slote_time}
                        data={tislo}
                        valueExtractor={valueExtractor}
                        value={selectedTime.slote_time}
                    />

                    <View>
                        <TouchableOpacity
                        onPress = {() => {Linking.openURL(`https://www.google.co.in/maps/@${location.lat},${location.lng}`)}}>
                            <Text>Location</Text>
                        </TouchableOpacity>
                    </View>
                    */
    const valueExtractor=val=>{
        setSelectedTime(val.slote_time)
    }
    
    function renderBody() {
        return (
            <View style={styles.bodyContainer}>
                <HeaderBar titleText='Payment Options' onPress={() => navigation.goBack()} />
                <Loader loading={loading} />
                <View style={styles.perDetail}>
                    <View style={styles.bgCont}>
                        <Text style={{ color: COLORS.black, fontWeight: 'bold', paddingVertical: 4, fontSize: 16 }}>Delivery Details</Text>
                        <View style={styles.seperator} />
                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginVertical: 4, padding: 5 }}>
                            {'   '}{users.firstname}{' '}{users.lastname}</Text>
                        <Text style={{ ...FONTS.h3, paddingLeft: 10, textTransform: 'capitalize', color: COLORS.gray }}>

                            {' '}{adds.address},{' '}{adds.city},{'   '}{adds.state},{' '}{adds.pincode},{adds.country}</Text>
                    </View>
                    
                    <View style={{ height: 35, borderRadius: 10, flexDirection: 'row', marginTop: 10, marginHorizontal: 5 }}>
                        <TextInput
                            style={{
                                width: '60%', height: '100%', borderWidth: 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                                paddingLeft: 10, borderColor: COLORS.gray
                            }}
                            placeholder='Enter Coupon Code here'
                            placeholderTextColor={COLORS.lgray}
                            onChangeText={(e) => setCouponCode(e)}
                        />
                        <TouchableOpacity style={{
                            width: '40%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10,
                            backgroundColor: COLORS.gray, justifyContent: 'center', alignItems: 'center'
                        }}
                            onPress={matchCuponCode}>
                            <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Apply Coupon</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: COLORS.gray, paddingLeft: 15, paddingTop: 10 }}>{catError}</Text>
                    <View style={{ flex: 1, borderRadius: 10, marginTop: 10 }}>

                        <Text style={{ color: COLORS.black, fontSize: 16, paddingLeft: 10, fontWeight: 'bold' }}>Select Your delivery slot</Text>
                        {
                            Platform.OS==='ios'?<Text style={{ color: COLORS.gray, fontSize: 16, paddingLeft: 10, fontWeight: '400',width:'100%' }} numberOfLines={2}>Selected Slot : {`${selectedTime.slote_time},${selectedTime.type}`}</Text>:<View/>
                        }
                        {
                            tislo === '' ?
                                <View style={{ height: Platform.OS==='android'?35:100, paddingLeft: 10, borderWidth: 1, borderColor: COLORS.gray, marginHorizontal: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: COLORS.lgray }}>No Delivery slot Available Yet </Text>
                                    
                                </View> :
                                <View style={{ height: Platform.OS==='android'?35:50, paddingLeft: Platform.OS==='android'?10:0, borderWidth: 1, borderColor: COLORS.gray, marginHorizontal: 10, borderRadius: 5 }}>
                                    <Picker
                                        selectedValue={selectedTime}                                        
                                        itemStyle={{height:50,flex:1}}
                                        style={{ height: Platform.OS==='android'?35:50, borderWidth: Platform.OS==='android'?1:0, paddingLeft: Platform.OS==='android'?5:0, borderColor: Platform.OS==='android'?COLORS.bgcolor:COLORS.white, borderRadius: Platform.OS==='android'?10:0, color: COLORS.gray }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedTime(itemValue)
                                        }>

                                        {
                                            tislo.map(item => (
                                                <Picker.Item label={`${item.slote_time}, ${item.type}`} titleText={item.type} value={item} key={item.id} />))
                                        }

                                    </Picker>
                                </View>

                        }
                    </View>
                   
                    <View style={styles.bgCont}>
                        <Text style={{ color: COLORS.black, fontWeight: 'bold', paddingVertical: 4, fontSize: 16 }}>Order Summary</Text>
                        <View style={styles.seperator} />

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                            <View style={{ width: '70%', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                <Text style={[styles.text, { fontWeight: '200', paddingLeft: 10 }]}>Cart Total</Text>
                            </View>

                            <View style={{ width: '30%', alignItems: 'center', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                <Text style={[styles.text, { fontWeight: '200', textAlign: 'right' }]}>
                                    Rs. {catData.totalprices || 0}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                            <View style={{ width: '70%', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                <Text style={[styles.text, { fontWeight: '200', paddingLeft: 10 }]}>Delivary Charges</Text>
                            </View>

                            <View style={{ width: '30%', alignItems: 'center', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                <Text style={[styles.text, { fontWeight: '200', textAlign: 'right' }]}>
                                    Rs. {catData.charge || 0}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                            <View style={{ width: '70%', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                <Text style={[styles.text, { fontWeight: '200', paddingLeft: 10 }]}>Coupon Discount</Text>
                            </View>

                            <View style={{ width: '30%', alignItems: 'center', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                <Text style={[styles.text, { fontWeight: '200', textAlign: 'right' }]}>
                                    Rs. {catData.applycoupon || 0}</Text>
                            </View>
                        </View>
                        <View style={styles.seperator} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                            <View style={{ width: '70%', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                <Text style={[styles.text, { fontWeight: '200', paddingLeft: 10, color: COLORS.primary }]}>Total Pay</Text>
                            </View>

                            <View style={{ width: '30%', alignItems: 'center', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                <Text style={[styles.text, { fontWeight: '200', textAlign: 'right', color: COLORS.primary }]}>
                                    Rs. {catData.ordertotal}</Text>
                            </View>
                        </View>
                        <View>
                        </View>
                    </View>


                    <Text style={{ color: COLORS.black, fontSize: 16, paddingLeft: 10, fontWeight: 'bold', paddingVertical: 10 }}>Payment Option(s)</Text>
                    <View style={[styles.seperator, { marginBottom: 10, marginTop: -5, marginHorizontal: 10 }]} />
                    <TouchableOpacity style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, borderWidth: 1, borderRadius: 2, borderColor: COLORS.lgray, marginHorizontal: 10 }}
                        onPress={() => { setUsesShow(!usesShow); setPayShow(false) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name='money' size={30} color={COLORS.bgcolor} />
                            <Text style={{ fontSize: 15, color: COLORS.gray, marginLeft: 15 }}>Cash On Delivery</Text>
                        </View>
                        {usesShow ? <FontAwesome name='check-circle' size={20} color={COLORS.bgcolor} /> : <FontAwesome name='circle-o' size={20} color={COLORS.bgcolor} />}
                    </TouchableOpacity>
                    {usesShow ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderWidth: 1, borderRadius: 2, borderColor: COLORS.lgray, marginHorizontal: 10 }}>
                            <TouchableOpacity style={{
                                flex: 1, height: 35, borderRadius: 5, backgroundColor: COLORS.white, elevation: 10,
                                justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lgray, marginHorizontal: 15, paddingHorizontal: 15, marginVertical: 15
                            }} onPress={() => placeOrder('Cash On Delivery')}>
                                <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Place Order </Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                    <TouchableOpacity style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, borderWidth: 1, borderRadius: 2, borderColor: COLORS.lgray, marginHorizontal: 10, marginTop: 15 }}
                        onPress={() => { setPayShow(!payShow); setUsesShow(false) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Image
                                source={{ uri: 'https://cdn.iconscout.com/icon/free/png-512/paytm-226448.png' }}
                                resizeMode='contain'
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 10
                                }}
                            />

                            <Text style={{ fontSize: 15, color: COLORS.gray, marginLeft: 15 }}>Paytm UPI</Text>
                        </View>
                        {payShow ? <FontAwesome name='check-circle' size={20} color={COLORS.bgcolor} /> : <FontAwesome name='circle-o' size={20} color={COLORS.bgcolor} />}
                    </TouchableOpacity>
                    {payShow ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderWidth: 1, borderRadius: 2, borderColor: COLORS.lgray, marginHorizontal: 10 }}>
                            <TouchableOpacity style={{
                                flex: 1, height: 35, borderRadius: 5, backgroundColor: COLORS.white, elevation: 10,
                                justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lgray, marginHorizontal: 15, paddingHorizontal: 15, marginVertical: 15
                            }} onPress={() => placeOrder('Online')}
                            //onPress={()=>navigation.navigate('Paytmstat')}
                            >
                                <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Place Order and Pay</Text>
                            </TouchableOpacity>
                            <Text>{resu ? JSON.stringify(resu) : ''}</Text>
                        </View>
                    ) : null}
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                {renderBody()}
            </ScrollView>
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
        backgroundColor: COLORS.white
    },
    perDetail: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 10
    },
    bgCont: {
        backgroundColor: COLORS.white, flex: 1, margin: 5,
        padding: 10, borderRadius: 10, elevation: 1,
        shadowColor:COLORS.gray,
        shadowOffset:{
            width:0,height:4
        },
        shadowOpacity:0.34,
        shadowRadius:3.84
    },
    titleConatiner: {
        flex: 1,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: SIZES.radius,
        paddingLeft: SIZES.padding,
        marginVertical: 10
    },
    text: {
        paddingVertical: 10,
        fontWeight: 'bold',
        color: COLORS.gray
    },
    seperator: {
        backgroundColor: COLORS.lgray,
        height: 1
    },
});

//make this component available to the app
export default Invoice;
