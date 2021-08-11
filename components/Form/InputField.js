//import liraries
import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {Entypo} from 'react-native-vector-icons'
import {FONTS,COLORS,SIZES} from '../../constants/index'
// create a component
const InputField = ({labelValue,placeholderText,ncol,...rest}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                value={labelValue}
                style={styles.input}
                numberOfLines={ncol}
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
        marginHorizontal:4,
        maxHeight:45,
        flex:1,
        borderColor:COLORS.gray,
        borderWidth:1,
        borderRadius:SIZES.base,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff'
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
export default InputField;
