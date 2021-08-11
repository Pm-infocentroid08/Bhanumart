//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from './../../constants/theme';

const PlacedOrder = ({  navigation }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.fBox,styles.shadow]}>
                <Image
                    source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTszlCtFNIssoRYZgJTpLH1eHKkNGN2scIsAO-J8EQ39aLophtURhtmFlA6v83PhpgzoGk&usqp=CAU'}}
                    resizeMode='contain'
                    style={styles.img}
                />
                <Text style={{fontSize:22,color:'green',fontWeight:'900',paddingVertical:15}}>Order Placed Successfully</Text>
                <Text style={{fontSize:18,color:COLORS.gray,fontWeight:'600',paddingVertical:15}}>Thank you for visiting us.</Text>
                <TouchableOpacity style={[styles.btn,styles.shadow]}
                onPress={()=>navigation.navigate('Orders')}>
                    <Text style={{color:COLORS.white,fontWeight:'bold'}}>Manage Your Order</Text>
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
    fBox:{
        flex:1,
        maxHeight:SIZES.height*0.7,
        width:SIZES.width*0.9,
        backgroundColor:COLORS.white,
        borderRadius:30,
        alignItems:'center'
    },
    img:{
        width:150,
        height:150,
        marginTop:10
    },
    btn:{
        flex:1,
        maxHeight:40,
        width:150,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.gray,
        borderRadius:8,
        marginHorizontal:20
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
export default PlacedOrder;
