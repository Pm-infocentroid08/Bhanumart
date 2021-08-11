//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import {SIZES,FONTS,COLORS} from '../../constants/index'
import {FontAwesome,Ionicons} from 'react-native-vector-icons'
import {useNavigation} from '@react-navigation/native'
// create a component
const MostSeller = (props,{...rest}) => {
    const {item} = props;
    const navigation =useNavigation();
    return (
        <TouchableOpacity style={[styles.cardBoady]} onPress={()=>navigation.navigate('ProductDetail',{item})}>
            <Image
                resizeMode='cover'
                source={{uri:item.image}}
                style={styles.image}
            />
            <Text style={{...FONTS.h3,marginVertical:6}}>{item.name}</Text>
            <View style={styles.buttonContainer}>
                <Text style={{...FONTS.body3,marginVertical:4}}>
                    <FontAwesome name='rupee' size={14} color={COLORS.black}/>
                    {' '}
                    {item.price}
                </Text>
                <TouchableOpacity style={styles.heart}>
                    <Ionicons name='bookmark' size={18} color={COLORS.primary} style={{justifyContent:'center',alignItems:'center'}}/>
                </TouchableOpacity>
            </View>
            
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    cardBoady: {
        flex:1,
        maxWidth:SIZES.width/2.2,
        height:SIZES.height/4,
        margin:6,
        backgroundColor:COLORS.white,
        alignItems:'center',
        elevation:1,
        borderRadius:15,
        marginBottom:6
    },
    image:{
        width:'100%',
        height:'60%',
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
    buttonContainer:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10
    },
    heart:{
        width:30,
        height:30,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.lightGray
    }
});

//make this component available to the app
export default MostSeller;
