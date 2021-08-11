//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {images,COLORS,FONTS,SIZES} from '../../constants/index'
import {Ionicons,FontAwesome} from 'react-native-vector-icons'
// create a component
const SearchBox = ({iconType,titleText,...rest}) => {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <View style={styles.ibox}>
                <Ionicons name={iconType} size={18} color={COLORS.gray}/>
            </View>
            <View style={styles.tBox}>
                <Text style={{fontSize:14,color:COLORS.gray}}>{titleText}</Text>    
            </View>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        height:35,
        flex:1,
        backgroundColor:COLORS.white,
        borderRadius:SIZES.radius,
    },
    ibox:{
        width:40,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    tBox:{
        flex:1,
        height:'100%',
        justifyContent:'center',
        alignItems:'flex-start',
    }
});

//make this component available to the app
export default SearchBox;
