//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {FONTS,SIZES,COLORS} from '../../constants/index'
import {Ionicons} from 'react-native-vector-icons'
// create a component
const HeaderBar = ({titleText,iconType,...rest}) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}> 
                <TouchableOpacity style={styles.buttonContainer} {...rest}>
                    <Ionicons name='chevron-back' color={COLORS.white} size={20}/>
                </TouchableOpacity>
                <Text style={{...FONTS.h3,marginHorizontal:20}}>{titleText}</Text>
            </View>
            <TouchableOpacity style={[styles.buttonContainer,{backgroundColor:'transparent'}]}>
                <Ionicons name={iconType} color='tomato' size={SIZES.padding*1.2}/>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        
        flexDirection:'row',
        height:60,
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:10,
        width:'100%',
        paddingHorizontal:10
    },
    buttonContainer:{
        width:SIZES.padding*1.6,
        height:SIZES.padding*1.3,
        borderRadius:SIZES.radius,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.black,
        marginRight:10
    }
});

//make this component available to the app
export default HeaderBar;
