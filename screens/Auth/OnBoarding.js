//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity, Touchable } from 'react-native';
import { COLORS, FONTS, SIZES } from './../../constants/theme';
import {Ionicons} from 'react-native-vector-icons'
// create a component
const OnBoarding = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/Logo.png')}
                resizeMode='contain'
                style={styles.image}
            />
            <Text style={{...FONTS.largeTitle,fontWeight:'bold',color:COLORS.bgcolor,marginVertical:SIZES.radius,textAlign:'center',textTransform:'uppercase'}}>BHANU MART</Text>
            <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.gray,marginVertical:SIZES.radius,textAlign:'center',textTransform:'capitalize'}}>Let's Start Shopping</Text>
            <TouchableOpacity style={[styles.btn,styles.shadow]} onPress={()=>navigation.navigate('login')}>
                <Ionicons name='arrow-forward' color={COLORS.white} size={SIZES.padding*2.5}/>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:COLORS.white,
        padding:20,
    },
    image:{
        width:SIZES.width*0.5,
        height:SIZES.height*0.25
    },
    shadow:{
        shadowColor:COLORS.bgcolor,
        shadowOffset:{
            width:0,
            height:8,
        },
        shadowOpacity:0.4,
        shadowRadius:3.84,
        elevation:25
    },
    btn:{
        marginTop:SIZES.padding,
        width:80,
        height:80,
        borderRadius:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.gray
    }
});

//make this component available to the app
export default OnBoarding;
