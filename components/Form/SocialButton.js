//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import {FontAwesome} from 'react-native-vector-icons'
// create a component
const SocialButton = ({iconType,color,...rest}) => {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
             <LinearGradient 
                style={styles.innerBox}
                colors={['#E8E8E8','#fff']}
                start={{x:0,y:0}}
                end={{x:1,y:1}}>
                <FontAwesome name={iconType} color={color} size={SIZES.padding*1.2} style={styles.foBtn}/>
            </LinearGradient>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width:70,height:70,
        borderRadius:35,
        backgroundColor: '#E8E8E8',
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center'
    },
    innerBox:{
        width:56,height:56,
        borderRadius:28,
        justifyContent:'center',
        alignItems:'center'
    },
    foBtn:{
        fontWeight:'bold',
    }
});

//make this component available to the app
export default SocialButton;
