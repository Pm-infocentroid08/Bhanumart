//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import {SIZES,FONTS,COLORS} from '../../constants/index'
import {useNavigation} from '@react-navigation/native'
import {Ionicons} from 'react-native-vector-icons'
// create a component
const RecentSearch = (props,{...rest}) => {
    const {item} = props;
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={[styles.cardBoady]} onPress={()=>navigation.navigate('ProductDetail',{item})}>
            <Image
            resizeMode='cover'
                source={{uri:item.image}}
                style={styles.image}
            />
            <TouchableOpacity style={styles.heart}>
                    <Ionicons name='heart' size={25} color={COLORS.primary} style={{justifyContent:'center',alignItems:'center'}}/>
            </TouchableOpacity>
            <Text style={{...FONTS.h3,marginVertical:6}}>{item.name}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    cardBoady: {
        width:SIZES.width/2.5,
        height:SIZES.height/4.3,
        margin:6,
        backgroundColor:COLORS.white,
        alignItems:'center',
        elevation:1,
        borderRadius:15,
        marginBottom:6
    },
    image:{
        width:'100%',
        height:'80%',
        borderTopLeftRadius:15,
        borderTopRightRadius:15
    },
    
    shadow:{
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:5
        },
        shadowOpacity:0.4,
        shadowRadius:3.84,
        elevation:10
    },
    heart:{
        position:'absolute',
        right:10,
        top:10,
        width:40,
        height:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.lightGray
    }
});

//make this component available to the app
export default RecentSearch;
