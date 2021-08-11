//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {FONTS,SIZES,COLORS} from '../../constants/index'
import {FontAwesome} from 'react-native-vector-icons'
// create a component
const TotalCard = ({titleText,itemText,price,bText,...rest}) => {
    return (
        <View style={styles.container}>
            <Text style={{...FONTS.h1}}>{titleText}</Text>
            <View style={styles.itemContainer}>
                <Text style={{...FONTS.body2}}> {itemText}</Text>
                <Text style={{...FONTS.h2}}> 
                    <FontAwesome name='rupee' size={SIZES.h2*0.85} color={COLORS.black}/>
                    {' '}
                    {price}
                </Text>
            </View>
            <View style={styles.butBox}>
                <TouchableOpacity style={styles.chechButton} {...rest}>
                    <Text style={{...FONTS.h2,color:COLORS.white}}>{bText}</Text>
                </TouchableOpacity>
            </View>            
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:SIZES.padding,
        backgroundColor:COLORS.white,
        borderTopLeftRadius:SIZES.padding*2,
        borderTopRightRadius:SIZES.padding*2,
        height:SIZES.height*0.2
    },
    itemContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:10
    },
    butBox:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
    },
    chechButton:{
        width:'80%',
        height:SIZES.padding*2.5,
        borderRadius:SIZES.radius,
        backgroundColor:COLORS.black,
        justifyContent:'center',
        alignItems:'center'
    }
});

//make this component available to the app
export default TotalCard;
