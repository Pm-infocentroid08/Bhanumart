//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,Image} from 'react-native';
import {FONTS,SIZES,COLORS} from '../../constants/index'
// create a component
const Legal = () => {
    return (
        <ScrollView style={styles.container}>
           <Text style={{...FONTS.h1,fontWeight:'bold',color:COLORS.black,paddingTop:15,paddingLeft:10}}>Terms & Condition</Text>
           <Image
               source={{uri:'https://i.pinimg.com/originals/75/fa/9b/75fa9b17f632646e5ae7fae3cf837761.jpg'}}
               style={{
                   width:SIZES.width,
                   height:SIZES.height*0.3
               }}
           />
           <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.black,paddingTop:5,paddingLeft:10}}>About Us</Text>
           <Text style={{...FONTS.body3,color:COLORS.gray,paddingTop:5,paddingHorizontal:10}}>
           Ecommerce, also known as electronic commerce or internet commerce, 
           refers to the buying and selling of goods or services using the internet, 
           and the transfer of money and data to execute these transactions. ... 
           Global retail ecommerce sales are projected to reach $27 trillion by 2020.
           </Text>
           <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.black,paddingTop:5,paddingLeft:10}}>Elgibility</Text>
           <Text style={{...FONTS.body3,color:COLORS.gray,paddingTop:5,paddingHorizontal:10}}>
           Ecommerce, also known as electronic commerce or internet commerce, 
           refers to the buying and selling of goods or services using the internet, 
           and the transfer of money and data to execute these transactions. ... 
           Global retail ecommerce sales are projected to reach $27 trillion by 2020.
           </Text>
           <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.black,paddingTop:5,paddingLeft:10}}>Licence & Site access</Text>
           <Text style={{...FONTS.body3,color:COLORS.gray,paddingTop:5,paddingHorizontal:10,paddingBottom:40}}>
           Ecommerce, also known as electronic commerce or internet commerce, 
           refers to the buying and selling of goods or services using the internet, 
           and the transfer of money and data to execute these transactions. ... 
           Global retail ecommerce sales are projected to reach $27 trillion by 2020.
           </Text>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
        backgroundColor:COLORS.white,
        paddingBottom:20
    },
    
});

//make this component available to the app
export default Legal;
