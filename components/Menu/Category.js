//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image} from 'react-native';
import {FONTS,SIZES,COLORS,icons} from '../../constants/index'
import {useNavigation} from '@react-navigation/native'
// create a component
const CategoryList = (props) => {
    const {item} = props;
    const navigation =useNavigation();
    return (
       
            <TouchableOpacity style={styles.container} key={item.id} onPress={()=>navigation.navigate('SubCat',{item})}>
                <View style={[styles.imageContainer,styles.shades,{backgroundColor:item.bgColor}]}>
                    <Image
                    resizeMode='contain'
                        source={{uri:item.icon}}
                        style={[styles.image,styles.shades,{backgroundColor:item.bgColor}]}
                    />
                </View>
                <Text style={{...FONTS.body4,marginVertical:10}}>{item.category}</Text>
            </TouchableOpacity>
        
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:10,
        borderRadius:SIZES.padding,
        backgroundColor:COLORS.white,
        padding:10,
        alignItems:'center'
    },
    imageContainer:{
        width:120,
        height:120,
        borderRadius:SIZES.padding,
        backgroundColor:COLORS.white,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:'60%',
        height:'60%',
        borderRadius:SIZES.padding*2,
        padding:5
    },
    shades:{
        shadowColor:COLORS.black,
        shadowOffset:{
            width:0,
            height:6
        },
        shadowOpacity:0.34,
        shadowRadius:4.56,
        elevation:15
    }
});

//make this component available to the app
export default CategoryList;
