//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet ,TextInput} from 'react-native';
import { COLORS,FONTS } from '../../constants';
import HeaderBar from './../../components/HeaderBar/index';
import {FontAwesome} from 'react-native-vector-icons'
import Button from './../../components/Container/Button';
// create a component
const AddMonney = ({navigation}) => {
    const [amount,setAmount]=useState();
    return (
        <View style={styles.container}>
            <HeaderBar titleText='Add Money' onPress={()=>navigation.goBack()}/>
            <Text style={{...FONTS.h1,fontWeight:'bold',color:COLORS.black,paddingVertical:8,paddingLeft:15}}>Add Money to Walley</Text>
            <Text style={{...FONTS.h3,fontWeight:'bold',color:COLORS.black,paddingVertical:8,paddingLeft:15,backgroundColor:COLORS.lightGray,margin:10}}>Add min Rs. 500 to win Flat Cahsback.Rs.50 T&C</Text>
            <View style={{
                flexDirection:'row',
                margin:10,
                borderBottomColor:COLORS.primary,
                        borderBottomWidth:1,
                        height:60,
                        alignItems:'center',
            }}>
            <View style={{
                width:40,
                height:'100%',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <FontAwesome name='rupee' color={COLORS.primary} size={18}/>
            </View>
                <TextInput
                    labelValue={amount}
                    onChangeText={(userAmount)=>setAmount(userAmount)}
                    placeholder='Enter Amount'
                    placeholderTextColor={COLORS.primary}
                    numeric 
                    keyboardType={'numeric'}
                    style={{
                        fontSize:20,
                        fontWeight:'bold',
                        height:'100%'
                    }}
                />
              
            </View>
            <View style={{
                position:'absolute',
                bottom:20,
                flex:1,
                width:'100%'
            }}>
                <Button bText='Proceed' onPress={()=>navigation.navigate('Payment',{amount})}/>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop:35
    },
});

//make this component available to the app
export default AddMonney;
