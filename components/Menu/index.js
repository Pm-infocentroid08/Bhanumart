//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image} from 'react-native';
import {FONTS,SIZES,COLORS,icons} from '../../constants/index'
import {useNavigation} from '@react-navigation/native'
// create a component
const CategoryCard = (props) => {
    const {item} = props;
    const navigation =useNavigation();
    return (
       
            <TouchableOpacity style={[styles.container,styles.shades]} key={item.id} onPress={()=>navigation.navigate('SubCategory',{item})}>
                <View style={[styles.imageContainer]}>
                    <Image
                    resizeMode='cover'
                        source={{uri:item.image || item.icon}}
                        style={styles.image}
                    />
                </View>
                <Text style={{...FONTS.body4,marginVertical:8,textAlign:'center'}}>{item.category}</Text>
            </TouchableOpacity>
        
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:1,
        maxWidth:SIZES.width*0.32,
        backgroundColor:COLORS.white,
        padding:5
    },
    imageContainer:{
        width:'100%',
        height:SIZES.height*0.12,
        borderRadius:5,
        backgroundColor:COLORS.white,
    },
    image:{
        width:'100%',
        height:'100%',
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
export default CategoryCard;
