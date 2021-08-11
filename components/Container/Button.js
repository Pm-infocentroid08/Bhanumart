//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {FONTS,SIZES,COLORS} from '../../constants/index' 
// create a component
const Button = ({bText,...rest}) => {
    return (
        <View style={styles.butBox}>
                <TouchableOpacity style={styles.chechButton} {...rest}>
                    <Text style={{...FONTS.h3,color:COLORS.white}}>{bText}</Text>
                </TouchableOpacity>
        </View>      
    );
};

// define your styles
const styles = StyleSheet.create({
    butBox:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        width:'100%',
        paddingVertical:20
    },
    chechButton:{
        width:'95%',
        height:40,
        borderRadius:SIZES.radius,
        backgroundColor:COLORS.black,
        justifyContent:'center',
        alignItems:'center'
    }
});

//make this component available to the app
export default Button;
