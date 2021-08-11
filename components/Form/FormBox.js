//import liraries
import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {AntDesign} from 'react-native-vector-icons'
import {FONTS,COLORS,SIZES} from '../../constants/index'
// create a component
const FormBox = ({labelValue,placeholderText,iconType,ncol,...rest}) => {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign name={iconType} size={25} color='#666'/>
            </View>
            <TextInput
                value={labelValue}
                style={styles.input}
                numberOfLines={4}
                placeholder={placeholderText}
                placeholderTextColor='#666'
                {...rest}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    inputContainer:{
        marginTop:5,
        marginBottom:10,
        width:'100%',
        height:SIZES.height/15,
        borderColor:COLORS.gray,
        borderWidth:1,
        borderRadius:SIZES.padding,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    iconStyle:{
        padding:10,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRightColor:COLORS.gray,
        borderRightWidth:1,
        width:60
    },
    input:{
        padding:10,
        flex:1,
        fontSize:16,
        color:COLORS.black,
        justifyContent:'center',
        alignItems:'center'
    },
    inputField:{
        padding:10,
        marginTop:5,
        marginBottom:10,
        width:SIZES.height/1.5,
        height:SIZES.height/15,
        fontSize:16,
        borderRadius:8,
        borderWidth:1
    }
});

//make this component available to the app
export default FormBox;
