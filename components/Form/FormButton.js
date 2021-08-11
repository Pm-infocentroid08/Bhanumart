//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from './../../constants/theme';
import {Ionicons} from 'react-native-vector-icons'
// create a component
const FormButton = ({titleText,iconType,...rest}) => {
    return (
        <View style={styles.container}>
            <Text style={{...FONTS.h2,fontWeight:'bold',textTransform:'uppercase'}}>{titleText}</Text>
            <TouchableOpacity style={styles.buttonBox} {...rest}>
                <Ionicons name={iconType} color={COLORS.white} size={SIZES.padding}/>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.white,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:SIZES.padding*1.4,
        maxHeight:80
    },
    buttonBox:{
        height:60,
        width:60,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.bgcolor
    }
});

//make this component available to the app
export default FormButton;
