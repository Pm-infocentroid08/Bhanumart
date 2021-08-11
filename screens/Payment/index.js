//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView ,TouchableOpacity,Image, Alert} from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import { COLORS, FONTS, SIZES } from '../../constants';
import {Ionicons,FontAwesome} from 'react-native-vector-icons'
import InputField from '../../components/Form/InputField';
import Button from './../../components/Container/Button';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import axios from 'axios'
// create a component
const Payment = ({route,navigation}) => {
    const [amount,setAmount]=useState(null);
    const [show,setShow]=useState(null);
    const [showup,setShowUp]=useState(null);
    const [showne,setShowNe]=useState(null);
    const [token,setToken]=useState(null);
    const [loading,setLoading]=useState(false);

    React.useEffect(()=>{
        let{amount} = route.params;
        setAmount(amount);
        Stripe.setOptionsAsync({
            publishableKey: 'pk_test_51ItsK4SItlXBImGogwxXUnG3O2184vdnuYIR7bJCHN0x0UgzgYvxyx6QiIlbqKsdOJHf9ZiTeI7WQuKV1eyxDeaV00UthLZ59j', // Your key
            androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
             });
    })
    const handleCardDetails = async () => {
        try {
          setLoading(true)
          const cardOptions = { 
            requiredBillingAddressFields: 'full',
               prefilledInformation: {
                 billingAddress: {
                   name: 'Test Name',
                   line1: 'Test Line 1',
                   line2: '4',
                   city: 'Test City',
                   state: 'Test State',
                   country: 'Test Country',
                   postalCode: '31217'
                 }
              }
          };
          // GETS YOUR TOKEN FROM STRIPE FOR PAYMENT PROCESS
          const token = await Stripe.paymentRequestWithCardFormAsync(cardOptions);
          setToken(token)
        } catch(error) {setLoading(false)};
      }

      const makePayment = async () => {
        setLoading(true)
        axios({
          method: "POST",
          url: `http://192.0.0.1:19002/api/payments/mobile/create?total=${amount}&token=${token.tokenId}}`        
        }).then(response => {
            // YEY! PAYMENT DONE
            // CHECKOUT YOUR STRIPE DASHBOARD FOR PAYMENTS MADE
            console.log(response);
            Alert.alert('Payment Success')
        }).catch(error => {setLoading(false), setToken(null)});
     }
    return (
        <ScrollView style={styles.container}>
            <HeaderBar titleText='Payment' onPress={()=>navigation.goBack()}/>
            <Text style={{...FONTS.h1,fontWeight:'bold',color:COLORS.black,paddingVertical:8,paddingLeft:15,backgroundColor:COLORS.lightGray,textAlign:'center',margin:SIZES.base,marginBottom:15}}>Recharge your Wallet</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                                <View style={{ width: '70%', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                    <Text style={[styles.text, { fontWeight: '200', paddingLeft: 10 }]}>Amount</Text>
                                </View>
                                
                                <View style={{ width: '30%',  alignItems: 'center', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                    <Text style={[styles.text, { fontWeight: '200',textAlign:'right'}]}>
                                    Rs. {amount}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical:8 }}>
                                <View style={{ width: '70%', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                    <Text style={[styles.text, { fontWeight: '200', paddingLeft: 10 }]}>Extra Charges</Text>
                                </View>
                                
                                <View style={{ width: '30%',  alignItems: 'center', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                    <Text style={[styles.text, { fontWeight: '200',textAlign:'right'}]}>
                                    Rs. 0</Text>
                                </View>
                            </View>
            <View style={styles.seperator}/>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                <View style={{ width: '70%', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                    <Text style={[styles.text, { fontWeight: '200', paddingLeft: 10 }]}>Total Amount</Text>
                                </View>
                                
                                <View style={{ width: '30%',  alignItems: 'center', borderRadius: 5, borderColor: COLORS.bgcolor }}>
                                    <Text style={[styles.text, { fontWeight: '200',textAlign:'right'}]}>
                                    Rs. {amount}</Text>
                                </View>
                            </View>
            <View style={[styles.seperator,{marginTop:50}]}/>
            <TouchableOpacity style={styles.boxCon} onPress={()=>setShowUp(!showup)}>
            {showup ? <FontAwesome name='check-circle' size={20} color={COLORS.bgcolor} /> : <FontAwesome name='circle-o' size={20} color={COLORS.bgcolor} />}
                <View style={{paddingLeft:SIZES.radius,flex:1}}>
                    <Text style={{...FONTS.h2,fontWeight:'bold'}}>UPI Payment</Text>
                </View>
                <View style={{width:30}}>
                {showup ? <Ionicons name='chevron-up' color={COLORS.black} size={SIZES.padding}/>:<Ionicons name='chevron-down' color={COLORS.black} size={SIZES.padding}/>}
                </View>
            </TouchableOpacity>
            {
                showup ? ( 
                    <View>


                    <View style={{padding:10,borderRadius:5,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                        <TouchableOpacity style={styles.IBox} onPress={()=>{}}>
                            <Image
                            source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKEzkTyeVIBLV77hXNWBK5NVT7tKPyEMZMRMaHAtT8S4bfaLVHGMBH3j-m1VYdfB1nPCc&usqp=CAU'}}
                            resizeMode='cover'
                                style={{
                                    width:'100%',
                                    height:'100%',
                                    borderRadius:15,
                                }}
                            />
                        </TouchableOpacity>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>Recharge Via Paytm</Text>
                        </View>
                        
                        
                    </View>
                    <Button bText='Pay'/>
                    </View>
                ):null
            }
            <View style={styles.seperator}/>
           
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop:35
    },
    seperator:{
        height:1,
        backgroundColor:COLORS.gray,
        marginHorizontal:1
    },
    boxCon:{
        flexDirection:'row',
        paddingVertical:4,
        alignItems:'center',
        paddingHorizontal:SIZES.padding,
        paddingBottom:15
    },
    circle:{
        width:16,
        height:16,
        borderRadius:8,
        backgroundColor:COLORS.primary
    },
    IBox:{
        width:100,
        height:50,
        borderRadius:10,
        borderWidth:1
    }
});

//make this component available to the app
export default Payment;
