//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Entypo} from 'react-native-vector-icons'
import { COLORS } from './../../constants/theme';
// create a component
const PlaceRow = ({data}) => {
    return (
        <View style={styles.row}>
            <View style={styles.iconContainer}>
                {data.description ==='Home' ? 
                <Entypo name='home' color='#fff' size={15}/>
                :
                <Entypo name='location-pin' color='#fff' size={15}/>
                }
                
            </View>
            <Text style={styles.locationText}>{data.description || data.vicinity}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    row: {
       flexDirection:'row',
       alignItems:'center',
       marginVertical:6,
       backgroundColor:COLORS.white
    },
    iconContainer:{
      backgroundColor:'#a2a2a2',
      width:20,
      height:20,
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center',
      marginRight:11
    },
    locationText:{
        fontWeight:'bold',
        color:COLORS.black
    }
});

//make this component available to the app
export default PlaceRow;
