//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {SIZES,COLORS,FONTS} from '../../constants/index'
import {Ionicons} from 'react-native-vector-icons'
// create a component
const ProfileList = ({iconType,hTitle,...rest}) => {
    return (
        <TouchableOpacity style={styles.container} {...rest}> 
            <Ionicons name={iconType} color={COLORS.black} size={20}/>           
            <View style={styles.textContainer}>
                <Text style={{...FONTS.h2}}>{hTitle} </Text>
            </View>
            <Ionicons name='chevron-forward' color={COLORS.black} size={18}/>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:6,
        backgroundColor:COLORS.white,
        flexDirection:'row',
        paddingVertical:6,
        justifyContent:'center',
        alignItems:'center'
    },
    textContainer:{
        flex:1,
        padding:6,
        justifyContent:'space-between',

    },
   
});

//make this component available to the app
export default ProfileList;
