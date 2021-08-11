//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import HeaderBar from '../../components/HeaderBar/index'
import { COLORS, FONTS, SIZES } from '../../constants';
import {Ionicons} from 'react-native-vector-icons'
// create a component
const ListItem=({titleText,subTitle1,subTitle2})=>{
    const [show,setShow]=React.useState(null);
    return(
        <View style={{padding:10}}>
            <TouchableOpacity style={styles.hBox} onPress={()=>setShow(!show)}>
                <Text style={{...FONTS.h2}}>{titleText}</Text>
                <Ionicons name='ios-chevron-forward' size={SIZES.padding} color={COLORS.black}/>
            </TouchableOpacity>
            {
                show ? (
            <View style={styles.subContainer}>
                <Text style={{...FONTS.body3,paddingVertical:8}}>{subTitle1}</Text>
                <Text style={{...FONTS.body3,paddingVertical:8}}>{subTitle2}</Text>
            </View>
                ):null
            }
            
        </View>
    )
}
const Query = ({navigation}) => {
    return (
        <View style={styles.container}>
            <HeaderBar titleText='Query' onPress={()=>navigation.goBack()} />
            <Text style={{...FONTS.h1,paddingVertical:10,paddingLeft:15}}>Top Queries</Text>
            <ListItem titleText='Track Your Order' subTitle1='How do i create return Request ?' subTitle2='How do i cancel my order ?'/>
            <ListItem titleText='Order Cancellation' subTitle1='How do i create return Request ?' subTitle2='How do i cancel my order ?'/>
            <ListItem titleText='About Membership' subTitle1='How do i create return Request ?' subTitle2='How do i cancel my order ?'/>
            <ListItem titleText='Membership Cancellation' subTitle1='How do i create return Request ?' subTitle2='How do i cancel my order ?'/>
            <ListItem titleText='Refunds ' subTitle1='How do i create return Request ?' subTitle2='How do i cancel my order ?'/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:SIZES.padding*1.5,
        backgroundColor:COLORS.white,
        height:SIZES.height
    },
    hBox:{
        height:50,
        borderBottomWidth:1,
        borderBottomColor:COLORS.gray,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:SIZES.base
    },
    subContainer:{
        padding:10
    }
});

//make this component available to the app
export default Query;
